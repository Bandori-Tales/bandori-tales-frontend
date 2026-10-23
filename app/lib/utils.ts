import { type ClassValue, clsx } from 'clsx';
import type { ShouldRevalidateFunctionArgs } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { type BaseIssue, type BaseSchema, type InferOutput, safeParse } from 'valibot';

import { toast } from '@/components/ui/toast';

import { Characters } from '@/constants';

import { BASE_URL } from './axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleImageUrl(url?: string | null) {
  if (!url) return '';

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  if (url.includes('uploads') || url.startsWith('/')) {
    return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  }

  return url;
}

export function handleApiResponseError(
  // biome-ignore lint/suspicious/noExplicitAny: error format is varied
  error: any,
  { withToast = true, returnMessage = false }: { withToast?: boolean; returnMessage?: boolean } = {}
) {
  let errorMessage = 'Something has gone wrong! Please try again.';

  if (error?.response?.data?.message) {
    errorMessage = JSON.stringify(error.response.data.message);
  } else if (error?.data?.message) {
    errorMessage = JSON.stringify(error.data.message);
  } else if (error?.message) {
    errorMessage = JSON.stringify(error.message);
  }

  if (withToast) {
    toast.error(errorMessage);
  }

  if (returnMessage) {
    return errorMessage;
  }
}

export function revalidatePathChanges({
  currentUrl,
  nextUrl,
  actionResult,
  defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
  if (actionResult !== undefined) {
    if (actionResult.update_profile_success === true) {
      return true;
    }
  }
  return currentUrl.pathname !== nextUrl.pathname && defaultShouldRevalidate;
}

export function createSlug(text: string): string {
  return text
    .trim()
    .replaceAll(/\s+/g, '')
    .toLowerCase()
    .replaceAll('-', '_')
    .replaceAll(/\W/g, '');
}

export function formatDateTime(date: Date, locale?: string): string {
  const localeDate = date.toLocaleDateString(locale);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${localeDate} ${hours}:${minutes}:${seconds}`;
}

export function handleCharacterPick(
  type: 'nickname' | 'profile_picture_url',
  character_id: number,
  character_array_index?: number
) {
  let character = Characters.find((char) => char.id === character_id);
  if (!character) character = Characters[0];

  switch (type) {
    case 'nickname': {
      return Array.isArray(character.nickname)
        ? character.nickname[character_array_index || 0]
        : character.nickname;
    }
    case 'profile_picture_url': {
      return Array.isArray(character.profile_picture)
        ? character.profile_picture[character_array_index || 0]
        : character.profile_picture;
    }
  }
}

export function validateDataBySchema<
  const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(
  data: unknown,
  schema: TSchema,
  config: (
    | {
        useDefaultValue: true;
        defaultValue: InferOutput<TSchema>;
      }
    | {
        useDefaultValue: false;
        defaultValue: null;
      }
  ) & {
    showErrorToast?: boolean;
    errorText?: string;
  } = {
    useDefaultValue: false,
    defaultValue: null,
    showErrorToast: false,
    errorText: 'Invalid data format.',
  }
) {
  if (!data)
    return config.useDefaultValue
      ? (config.defaultValue as InferOutput<TSchema>)
      : (config.defaultValue as null);

  const parseResult = safeParse(schema, data);

  if (!parseResult.success) {
    if (config.showErrorToast) {
      toast.error(config.errorText);
    }
    return config.useDefaultValue
      ? (config.defaultValue as InferOutput<TSchema>)
      : (config.defaultValue as null);
  }

  return parseResult.output;
}
