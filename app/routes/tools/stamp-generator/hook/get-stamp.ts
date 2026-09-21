import { safeParse } from 'valibot';

import { itemStorage } from '@/lib/storage';

import { LOCAL_STORAGE_KEY } from '@/constants';
import { type CanvasElement, CanvasElementArraySchema } from '@/schemas/models';

export const getStampElements = () => {
  const stampElements = itemStorage.local.get<CanvasElement[]>(
    LOCAL_STORAGE_KEY.STAMP_GENERATOR.DATA
  );

  const parsed = safeParse(CanvasElementArraySchema, stampElements);
  if (!parsed.success) {
    itemStorage.local.set(LOCAL_STORAGE_KEY.STAMP_GENERATOR.DATA, []);
    return [] as CanvasElement[];
  }

  return parsed.output;
};
