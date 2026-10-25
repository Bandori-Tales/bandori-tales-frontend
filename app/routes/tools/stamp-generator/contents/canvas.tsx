import { useEffect, useRef } from 'react';

import { STAMP_GENERATOR_CONST } from '@/constants';
import type { CanvasElement } from '@/schemas/models';

import {
  ensureFontsLoaded,
  hitTestElements,
  renderAllElements,
} from '../hooks/stamp-canvas-renderer';

export function StampGeneratorCanvas({
  elements,
  selectedElementId,
  canvasSize = STAMP_GENERATOR_CONST.LOGICAL_CANVAS_SIZE,
  onSelectElement,
}: {
  canvasScale?: number;
  elements: CanvasElement[];
  selectedElementId: string | null;
  canvasSize?: number;
  onSelectElement?: (id: string | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const render = () => {
      renderAllElements(ctx, elements, canvasSize, selectedElementId, () => {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(render);
      });
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

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onSelectElement) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const clickX = (event.clientX - rect.left) * (canvasSize / rect.width);
    const clickY = (event.clientY - rect.top) * (canvasSize / rect.height);

    const hitId = hitTestElements(elements, clickX, clickY);
    onSelectElement(hitId);
  };

  return (
    <canvas
      ref={canvasRef}
      id="canvas-export"
      width={canvasSize}
      height={canvasSize}
      onClick={handleCanvasClick}
      className="block h-full w-full cursor-pointer bg-transparent"
    />
  );
}
