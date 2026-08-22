import { type ReactNode, useMemo } from 'react';
import { isRouteErrorResponse } from 'react-router';

import type { Route } from '../../+types/root';
import SEO from '../helper/seo';
import ErrorPage from './error-page';

type ERROR_DESC_MAP_PROPS = {
  [key: number]: {
    title: string;
    sub: string | ReactNode;
  };
};

const ERROR_DESC_MAP: ERROR_DESC_MAP_PROPS = {
  403: {
    title: 'Forbidden Access!',
    sub: 'You have no permission to access this page!',
  },
  404: {
    title: 'Page Not Found!',
    sub: 'Seems like you are trying to reach the unknown..',
  },
  500: {
    title: 'Server Error.',
    sub: (
      <>
        Something is wrong with the server
        <br />
        Sorry for the inconvenience
      </>
    ),
  },
};

function extractStatusCode(error: number) {
  if (isRouteErrorResponse(error) && typeof error.status === 'number') {
    return error.status;
  }
  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    typeof (error as Record<string, unknown>).status === 'number'
  ) {
    return (error as Record<string, unknown>).status;
  }
  return 500;
}

export default function ErrorBoundaryComponent(props: Route.ErrorBoundaryProps) {
  const { error } = props;
  const { descTitle, descSub, statusCode } = useMemo(() => {
    const statusCode = extractStatusCode(error as number);
    const desc = ERROR_DESC_MAP[statusCode as keyof typeof ERROR_DESC_MAP] || {
      title:
        (isRouteErrorResponse(error) && error.statusText) ||
        (error instanceof Error && error.message) ||
        'Whoa, an error.',
      sub:
        (isRouteErrorResponse(error) && error.data) ||
        (typeof error === 'object' && error !== null && 'message' in error
          ? (error as Record<string, unknown>).message
          : '') ||
        '',
    };
    return {
      descTitle: desc.title,
      descSub: desc.sub,
      statusCode,
    };
  }, [error]);
  return (
    <>
      <SEO
        title={descTitle}
        description={
          descTitle === 'Server Error.'
            ? 'Internal server error'
            : typeof descSub === 'string'
              ? descSub
              : ''
        }
      />
      <ErrorPage descTitle={descTitle} descSub={descSub} statusCode={statusCode as number} />
    </>
  );
}
