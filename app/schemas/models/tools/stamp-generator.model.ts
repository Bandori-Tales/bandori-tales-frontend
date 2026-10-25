import * as v from 'valibot';

export const CanvasElementType = {
  IMAGE: 'IMAGE',
  TEXT: 'TEXT',
} as const;

export const CanvasElementTypeSchema = v.enum(CanvasElementType);

export const GeneratorSettingsSchema = v.object({
  canvas_size: v.pipe(v.number(), v.integer(), v.minValue(128), v.maxValue(512)),
  crop_result: v.boolean(),
});

const CanvasElementSchema = v.object({
  id: v.pipe(v.string(), v.minLength(36), v.maxLength(36)),
  type: CanvasElementTypeSchema,
  name: v.string(),
  x: v.pipe(v.number(), v.minValue(0), v.maxValue(512), v.integer()),
  y: v.pipe(v.number(), v.minValue(0), v.maxValue(512), v.integer()),
  scale: v.pipe(v.number(), v.minValue(0.05), v.maxValue(10)),
  rotation: v.pipe(v.number(), v.minValue(0), v.maxValue(360), v.integer()),
  flipX: v.boolean(),
  flipY: v.boolean(),
  content: v.string(),
  fontFamilyId: v.optional(v.string()),
  color: v.optional(v.string()),
  spacing: v.optional(v.pipe(v.number(), v.minValue(0), v.maxValue(20))),
  letterSpacing: v.optional(v.pipe(v.number(), v.minValue(-20), v.maxValue(100))),
  outlineColor: v.optional(v.string()),
  outlineWidth: v.optional(v.pipe(v.number(), v.minValue(1), v.maxValue(20), v.integer())),
  arcBend: v.optional(v.pipe(v.number(), v.minValue(-200), v.maxValue(200), v.integer())),
});

export const CanvasElementArraySchema = v.array(CanvasElementSchema);

export type ICanvasElementType = v.InferInput<typeof CanvasElementTypeSchema>;
export type GeneratorSettings = v.InferInput<typeof GeneratorSettingsSchema>;
export type CanvasElement = v.InferInput<typeof CanvasElementSchema>;
