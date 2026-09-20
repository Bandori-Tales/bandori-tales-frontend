import { STAMP_GENERATOR_CONST } from '@/constants';
import type { CanvasElement } from '@/schemas/models';

import { CanvasElementItem } from '../components/canvas-element';

// This is not HTML canvas, idk any better name to use..
export function StampGeneratorCanvas({
  canvasScale,
  elements,
  selectedElementId,
}: {
  canvasScale: number;
  elements: CanvasElement[];
  selectedElementId: string | null;
}) {
  return (
    <div
      id="canvas-export"
      className="absolute top-0 left-0 origin-top-left bg-transparent"
      style={{
        width: `${STAMP_GENERATOR_CONST.LOGICAL_CANVAS_SIZE}px`,
        height: `${STAMP_GENERATOR_CONST.LOGICAL_CANVAS_SIZE}px`,
        transform: `scale(${canvasScale})`,
      }}
    >
      {elements.map((element, index) => {
        const isSelected = element.id === selectedElementId;

        return (
          <CanvasElementItem key={element.id} isSelected={isSelected} zIndex={index} {...element} />
        );
      })}
    </div>
  );
}
