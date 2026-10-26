import { useEffect, useRef } from 'react';

import { STAMP_GENERATOR_CONST } from '@/constants';
import type { CanvasElement } from '@/schemas/models';

import type { ElementBounds } from '../hooks/stamp-canvas-renderer';
import { ensureFontsLoaded, renderAllElements } from '../hooks/stamp-canvas-renderer';
import { useCanvasInteraction } from '../hooks/use-canvas-interaction';

const DISPLAY_SIZE = STAMP_GENERATOR_CONST.DEFAULT_CANVAS_SIZE;

export function StampGeneratorCanvas({
  elements,
  selectedElementId,
  canvasSize = STAMP_GENERATOR_CONST.DEFAULT_CANVAS_SIZE,
  onSelectElement,
  onUpdateElement,
}: {
  canvasScale?: number;
  elements: CanvasElement[];
  selectedElementId: string | null;
  canvasSize?: number;
  onSelectElement?: (id: string | null) => void;
  onUpdateElement?: (id: string, patch: Partial<CanvasElement>) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const boundsMapRef = useRef<Map<string, ElementBounds>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const render = () => {
      boundsMapRef.current.clear();
      renderAllElements(
        ctx,
        elements,
        canvasSize,
        selectedElementId,
        () => {
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(render);
        },
        DISPLAY_SIZE,
        boundsMapRef.current
      );
    };

    render();
    ensureFontsLoaded(render);

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(render);
      document.fonts.addEventListener?.('loadingdone', render);
      return () => {
        cancelAnimationFrame(animId);
        document.fonts.removeEventListener?.('loadingdone', render);
      };
    }

    return () => cancelAnimationFrame(animId);
  }, [elements, canvasSize, selectedElementId]);

  useCanvasInteraction({
    canvasRef,
    elements,
    selectedElementId,
    canvasSize,
    boundsMapRef,
    onSelectElement: onSelectElement ?? (() => {}),
    onUpdateElement: onUpdateElement ?? (() => {}),
  });

  return (
    <canvas
      ref={canvasRef}
      id="canvas-export"
      width={DISPLAY_SIZE}
      height={DISPLAY_SIZE}
      className="block h-full w-full cursor-pointer touch-none bg-transparent"
    />
  );
}
