import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import type { Dispatch, SetStateAction } from 'react';

import { toast } from '@/components/ui/toast';

import { STAMP_GENERATOR_CONST } from '@/constants';
import type { CanvasElement, ICanvasElementType } from '@/schemas/models';

import { renderAllElements } from './stamp-canvas-renderer';

export const addElement =
  (
    elements: CanvasElement[],
    setElements: (element: CanvasElement[]) => void,
    setSelectedElementId: (id: string) => void,
    canvasSize: number = STAMP_GENERATOR_CONST.LOGICAL_CANVAS_SIZE
  ) =>
  (type: ICanvasElementType, name: string, content: string, fontFamilyId?: string) => {
    if (elements.length >= STAMP_GENERATOR_CONST.MAX_ELEMENTS) return;

    const newElement: CanvasElement = {
      id: crypto.randomUUID(),
      type,
      name,
      content,
      x: Math.round(canvasSize / 2),
      y: Math.round(canvasSize / 2),
      scale: 1,
      flipX: false,
      flipY: false,
      rotation: 0,
      ...(type === 'TEXT' && {
        fontFamilyId: fontFamilyId,
        spacing: 1.5,
        letterSpacing: 0,
        color: '#000000',
        outlineColor: '#FFFFFF',
        outlineWidth: 12,
        arcBend: 0,
      }),
    };

    setElements([...elements, newElement]);
    setSelectedElementId(newElement.id);
  };

export const updateSelected =
  (
    elements: CanvasElement[],
    setElements: (element: CanvasElement[]) => void,
    selectedElementId?: string | null
  ) =>
  (updatedElement: Partial<CanvasElement>) => {
    setElements(
      elements.map((element) =>
        element.id === selectedElementId ? { ...element, ...updatedElement } : element
      )
    );
  };

export const DndDragEnd =
  (setElements: Dispatch<SetStateAction<CanvasElement[]>>) => (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id)
      setElements((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);

        return arrayMove(prev, oldIndex, newIndex);
      });
  };

export const cropCanvas = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
  try {
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 0) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (maxX < minX || maxY < minY) {
      return canvas;
    }

    const croppedWidth = maxX - minX + 1;
    const croppedHeight = maxY - minY + 1;

    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = croppedWidth;
    croppedCanvas.height = croppedHeight;

    const croppedCtx = croppedCanvas.getContext('2d');
    if (!croppedCtx) return canvas;

    croppedCtx.drawImage(
      canvas,
      minX,
      minY,
      croppedWidth,
      croppedHeight,
      0,
      0,
      croppedWidth,
      croppedHeight
    );

    return croppedCanvas;
  } catch (error) {
    console.error('Failed to crop canvas, falling back to original', error);
    return canvas;
  }
};

export const createStampCanvas = (
  elements: CanvasElement[],
  canvasSize: number = STAMP_GENERATOR_CONST.LOGICAL_CANVAS_SIZE,
  cropResult = false
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = canvasSize;
  canvas.height = canvasSize;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    renderAllElements(ctx, elements, canvasSize, null);
  }

  return cropResult ? cropCanvas(canvas) : canvas;
};

export const generateStampBlob = async (
  elements: CanvasElement[],
  canvasSize: number = STAMP_GENERATOR_CONST.LOGICAL_CANVAS_SIZE,
  cropResult = false
): Promise<Blob> => {
  const finalCanvas = createStampCanvas(elements, canvasSize, cropResult);

  const blob = await new Promise<Blob | null>((resolve) => {
    finalCanvas.toBlob((b) => resolve(b), 'image/png');
  });

  if (!blob) throw new Error('Failed to create image blob');
  return blob;
};

export const downloadStamp = async (
  elements: CanvasElement[],
  canvasSize: number = STAMP_GENERATOR_CONST.LOGICAL_CANVAS_SIZE,
  cropResult = false
) => {
  try {
    const blob = await generateStampBlob(elements, canvasSize, cropResult);

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'stamp.png';
    link.href = url;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 100);

    toast.success('Stamp downloaded');
  } catch (error) {
    console.error(error);
    toast.error('Stamp download failed');
  }
};

export const copyStamp = async (
  elements: CanvasElement[],
  canvasSize: number = STAMP_GENERATOR_CONST.LOGICAL_CANVAS_SIZE,
  cropResult = false
) => {
  try {
    const blob = await generateStampBlob(elements, canvasSize, cropResult);

    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      }),
    ]);

    toast.success('Stamp copied to clipboard');
  } catch (error) {
    console.error(error);
    toast.error('Stamp copy failed');
  }
};
