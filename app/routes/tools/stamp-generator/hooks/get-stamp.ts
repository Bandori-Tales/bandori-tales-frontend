import { itemStorage } from '@/lib/storage';
import { validateDataBySchema } from '@/lib/utils';

import { LOCAL_STORAGE_KEY } from '@/constants';
import { type CanvasElement, CanvasElementArraySchema } from '@/schemas/models';

export const getStampElements = () => {
  const stampElements = validateDataBySchema(
    itemStorage.local.get<CanvasElement[]>(LOCAL_STORAGE_KEY.STAMP_GENERATOR.DATA),
    CanvasElementArraySchema
  );

  if (!stampElements) {
    itemStorage.local.set(LOCAL_STORAGE_KEY.STAMP_GENERATOR.DATA, []);
    return [] as CanvasElement[];
  }

  return stampElements;
};
