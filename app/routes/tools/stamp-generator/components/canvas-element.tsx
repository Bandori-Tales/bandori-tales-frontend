import { cn } from '@/lib/utils';

import { StampFonts, StampImages } from '@/constants';
import type { CanvasElement } from '@/schemas/models';

export function TextElement({
  id,
  name,
  arcBend = 0,
  color,
  fontFamilyId,
  outlineColor,
  spacing = 1.5,
  outlineWidth = 12,
  content,
  width = 200,
  height = 100,
  className,
}: Pick<
  CanvasElement,
  | 'id'
  | 'name'
  | 'arcBend'
  | 'color'
  | 'fontFamilyId'
  | 'outlineColor'
  | 'outlineWidth'
  | 'spacing'
  | 'content'
> & { width?: number | string; height?: number | string; className?: string }) {
  const y1 = 100 - arcBend * 32.5833;
  const cy = 100 + arcBend * 34.0833;

  const fontFamily = StampFonts.find((font) => font.id === fontFamilyId)?.fontFamily || 'angella';

  const lines = content.split('\n');
  const fontSize = 72;
  const lineHeight = fontSize * spacing;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 200"
      className={cn('scrollbar-none pointer-events-none overflow-visible', className)}
    >
      <title>{name}</title>
      {lines.map((line, index) => {
        const offset = (index - (lines.length - 1) / 2) * lineHeight;
        const currentPathId = `curve-${id}-${index}`;

        return (
          <g key={index}>
            <path
              id={currentPathId}
              d={`M -800,${y1 + offset} Q 200,${cy + offset} 1200,${y1 + offset}`}
              fill="transparent"
              stroke="none"
            />
            <text
              fill={color || '#000000'}
              fontFamily={fontFamily}
              fontSize={fontSize}
              fontWeight="bold"
              style={{ paintOrder: 'stroke fill' }}
            >
              <textPath
                href={`#${currentPathId}`}
                startOffset="50%"
                textAnchor="middle"
                stroke={outlineWidth > 0 ? outlineColor || '#FFFFFF' : 'none'}
                strokeWidth={outlineWidth}
              >
                {line}
              </textPath>
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function CanvasElementItem({
  isSelected,
  zIndex,
  ...ce
}: CanvasElement & { isSelected: boolean; zIndex: number }) {
  const scaleX = ce.scale * (ce.flipX ? -1 : 1);
  const scaleY = ce.scale * (ce.flipY ? -1 : 1);

  const imageSource =
    ce.type === 'IMAGE'
      ? StampImages.find((image) => image.id === ce.content)?.url || ''
      : undefined;

  return (
    <div
      className={cn(
        'pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 transform',
        isSelected && 'ring-1 ring-accent'
      )}
      style={{
        left: `${ce.x}px`,
        top: `${ce.y}px`,
        transform: `scale(${scaleX}, ${scaleY}) rotate(${ce.rotation}deg)`,
        zIndex,
      }}
    >
      {imageSource ? (
        <img src={imageSource} alt={ce.name} draggable={false} className="max-w-none" />
      ) : (
        <TextElement {...ce} />
      )}
    </div>
  );
}
