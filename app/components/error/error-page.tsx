import { Home } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

import SuspenseImage from '../helper/suspense-image';
import { Text } from '../helper/text';
import { Button } from '../ui/button';

type ErrorPageProps = {
  descTitle: string | ReactNode;
  descSub?: string | ReactNode;
  statusCode: number;
};

export function BackToHomeButton() {
  return (
    <Button
      asChild
      leftIcon={<Home className="mb-0.5" />}
      className="flex w-fit rounded-md"
      variant="secondary"
      colors="default"
    >
      <Link to="/" replace>
        Back to Home
      </Link>
    </Button>
  );
}

export default function ErrorPage({ descTitle, descSub, statusCode }: ErrorPageProps) {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-rose-100 px-8 py-8">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Text type="h2" weight="extrabold" className="animate-pulse text-center text-destructive">
          ERROR {statusCode}
        </Text>

        <SuspenseImage alt="Dummy Coming Soon" src="/images/error.webp" className="w-48" />

        <div className="flex flex-col items-center justify-center gap-5">
          <Text type="h4" className="text-center font-bold text-primary">
            {descTitle}
          </Text>

          {descSub && (
            <Text type="p" className="text-center font-medium text-foregorund/50">
              {descSub}
            </Text>
          )}
        </div>

        {BackToHomeButton()}
      </div>
    </main>
  );
}
