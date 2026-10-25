import { itemStorage } from '@/lib/storage';
import { validateDataBySchema } from '@/lib/utils';

import { LOCAL_STORAGE_KEY } from '@/constants';
import {
  type CanvasElement,
  CanvasElementArraySchema,
  type GeneratorSettings,
  GeneratorSettingsSchema,
} from '@/schemas/models';

export const getGeneratorSettings = () => {
  const settings = validateDataBySchema(
    itemStorage.local.get<GeneratorSettings>(LOCAL_STORAGE_KEY.STAMP_GENERATOR.SETTINGS),
    GeneratorSettingsSchema,
    { defaultValue: { canvas_size: 350, crop_result: true } }
  );

  return settings;
};

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
