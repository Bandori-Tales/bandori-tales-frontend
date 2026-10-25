import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { StampFonts, StampImages } from '@/constants';
import type { CanvasElement } from '@/schemas/models';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

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
  width,
  height,
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

  const textGroupRef = useRef<SVGGElement>(null);
  const [bbox, setBBox] = useState<{ x: number; y: number; width: number; height: number } | null>(
    null
  );

  useIsomorphicLayoutEffect(() => {
    const updateBBox = () => {
      if (!textGroupRef.current) return;

      try {
        let minX = Number.POSITIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxX = -Number.POSITIVE_INFINITY;
        let maxY = -Number.POSITIVE_INFINITY;

        const textEls = textGroupRef.current.querySelectorAll('text');
        for (let i = 0; i < textEls.length; i++) {
          const t = textEls[i];
          let tb: DOMRect | SVGRect | null = null;
          try {
            tb = t.getBBox();
          } catch {
            tb = null;
          }

          if (tb && tb.width > 0 && tb.height > 0) {
            minX = Math.min(minX, tb.x);
            minY = Math.min(minY, tb.y);
            maxX = Math.max(maxX, tb.x + tb.width);
            maxY = Math.max(maxY, tb.y + tb.height);
          } else {
            try {
              const len = t.getComputedTextLength();
              if (len > 0) {
                minX = Math.min(minX, 200 - len / 2);
                maxX = Math.max(maxX, 200 + len / 2);
                const lineOffset = (i - (textEls.length - 1) / 2) * lineHeight;
                minY = Math.min(minY, 100 + lineOffset - fontSize / 2);
                maxY = Math.max(maxY, 100 + lineOffset + fontSize / 2);
              }
            } catch {
              // ignore
            }
          }
        }

        if (
          Number.isFinite(minX) &&
          Number.isFinite(maxX) &&
          Number.isFinite(minY) &&
          Number.isFinite(maxY)
        ) {
          const b = {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
          };

          if (b.width > 0 && b.height > 0) {
            setBBox((prev) => {
              if (
                prev &&
                Math.abs(prev.x - b.x) < 0.5 &&
                Math.abs(prev.y - b.y) < 0.5 &&
                Math.abs(prev.width - b.width) < 0.5 &&
                Math.abs(prev.height - b.height) < 0.5
              ) {
                return prev;
              }
              return b;
            });
          }
        }
      } catch {
        // ignore when getBBox is not available
      }
    };

    updateBBox();

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(updateBBox);
      document.fonts.addEventListener?.('loadingdone', updateBBox);
      return () => {
        document.fonts.removeEventListener?.('loadingdone', updateBBox);
      };
    }
  }, [content, fontFamilyId, arcBend, spacing, outlineWidth, lineHeight, fontSize]);

  const pad = Math.ceil((outlineWidth || 0) / 2) + 4;
  const totalW = bbox ? bbox.width + pad * 2 : 400;
  const totalH = bbox ? bbox.height + pad * 2 : 200;
  const minX = bbox ? bbox.x - pad : 0;
  const minY = bbox ? bbox.y - pad : 0;

  const svgWidth = width ?? (bbox ? Math.ceil(totalW * 0.5) : 200);
  const svgHeight = height ?? (bbox ? Math.ceil(totalH * 0.5) : 100);
  const viewBox = bbox ? `${minX} ${minY} ${totalW} ${totalH}` : '0 0 400 200';

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox={viewBox}
      className={cn('scrollbar-none pointer-events-none block overflow-visible', className)}
    >
      <title>{name}</title>
      <defs>
        {lines.map((_, index) => {
          const offset = (index - (lines.length - 1) / 2) * lineHeight;
          const currentPathId = `curve-${id}-${index}`;

          return (
            <path
              key={currentPathId}
              id={currentPathId}
              d={`M -800,${y1 + offset} Q 200,${cy + offset} 1200,${y1 + offset}`}
            />
          );
        })}
      </defs>
      <g ref={textGroupRef}>
        {lines.map((line, index) => {
          const currentPathId = `curve-${id}-${index}`;

          return (
            <text
              key={index}
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
          );
        })}
      </g>
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
        isSelected && 'ring-2 ring-accent'
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
