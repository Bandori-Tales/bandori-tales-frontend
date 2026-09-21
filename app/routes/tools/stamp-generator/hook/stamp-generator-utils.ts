import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { toBlob } from 'html-to-image';
import type { Dispatch, SetStateAction } from 'react';

import { toast } from '@/components/ui/toast';

import { STAMP_GENERATOR_CONST, StampFonts } from '@/constants';
import type { CanvasElement, ICanvasElementType } from '@/schemas/models';

export const addElement =
  (
    elements: CanvasElement[],
    setElements: (element: CanvasElement[]) => void,
    setSelectedElementId: (id: string) => void
  ) =>
  (type: ICanvasElementType, name: string, content: string, fontFamilyId?: string) => {
    if (elements.length >= STAMP_GENERATOR_CONST.MAX_ELEMENTS) return;

    const newElement: CanvasElement = {
      id: crypto.randomUUID(),
      type,
      name,
      content,
      x: STAMP_GENERATOR_CONST.LOGICAL_CANVAS_SIZE / 2,
      y: STAMP_GENERATOR_CONST.LOGICAL_CANVAS_SIZE / 2,
      scale: 1,
      flipX: false,
      flipY: false,
      rotation: 0,
      ...(type === 'TEXT' && {
        fontFamilyId: fontFamilyId,
        spacing: 1.5,
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

export const downloadStamp = (elements: CanvasElement[]) => async () => {
  return new Promise<void>((resolve) => {
    setTimeout(async () => {
      const canvasNode = document.getElementById('canvas-export');
      if (!canvasNode) {
        resolve();
        return;
      }

      try {
        // Manually fetch fonts to guarantee they are embedded since html-to-image sometimes fails
        let fontEmbedCSS = '';
        for (const font of StampFonts.filter((fontItem) =>
          elements.find(
            (element) => element.type === 'TEXT' && element.fontFamilyId === fontItem.id
          )
        )) {
          try {
            const res = await fetch(font.url);
            const blob = await res.blob();
            const base64 = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
            fontEmbedCSS += `@font-face { font-family: "${font.fontFamily}"; src: url(${base64}) format("${font.format}"); font-weight: ${font.weight}; font-style: normal; }\n`;
          } catch (e) {
            console.error(`Failed to load font ${font.fontFamily}`, e);
          }
        }

        // Use blob instead png base64 string since Safari can't handle the massive string
        const blob = await toBlob(canvasNode, {
          quality: 1,
          pixelRatio: 1,
          fontEmbedCSS,
        });

        if (!blob) throw new Error('Failed to create image blob');

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
      } finally {
        resolve();
      }
    });
  });
};

export const copyStamp = (elements: CanvasElement[]) => async () => {
  const canvasNode = document.getElementById('canvas-export');
  if (!canvasNode) return;

  try {
    const makeBlob = async () => {
      let fontEmbedCSS = '';
      for (const font of StampFonts.filter((fontItem) =>
        elements.find((element) => element.type === 'TEXT' && element.fontFamilyId === fontItem.id)
      )) {
        try {
          const res = await fetch(font.url);
          const blob = await res.blob();
          const base64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
          fontEmbedCSS += `@font-face { font-family: "${font.fontFamily}"; src: url(${base64}) format("${font.format}"); font-weight: ${font.weight}; font-style: normal; }\n`;
        } catch (e) {
          console.error(`Failed to load font ${font.fontFamily}`, e);
        }
      }

      const blob = await toBlob(canvasNode, {
        quality: 1,
        pixelRatio: 1,
        fontEmbedCSS,
      });

      if (!blob) throw new Error('Failed to create image blob');
      return blob;
    };

    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': makeBlob(),
      }),
    ]);

    toast.success('Stamp copied to clipboard');
  } catch (error) {
    console.error(error);
    toast.error('Stamp copy failed');
  }
};
