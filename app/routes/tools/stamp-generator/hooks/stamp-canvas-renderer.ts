import { StampFonts, StampImages } from '@/constants';
import type { CanvasElement } from '@/schemas/models';

export interface ElementBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}

export const ROTATE_HANDLE_RADIUS = 8;
export const ROTATE_HANDLE_OFFSET = 20;
export const SCALE_HANDLE_HALF = 5;

const imageCache = new Map<string, HTMLImageElement>();

export function getCachedImage(url: string, onLoaded?: () => void): HTMLImageElement | null {
  let img = imageCache.get(url);
  if (!img) {
    img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    imageCache.set(url, img);
  }

  if (img.complete && img.naturalWidth > 0) {
    return img;
  }

  if (onLoaded) {
    img.addEventListener('load', onLoaded, { once: true });
  }

  return null;
}

export function ensureFontsLoaded(onLoaded?: () => void) {
  if (typeof document === 'undefined' || !document.fonts) return;

  const promises = StampFonts.map((f) => document.fonts.load(`bold 72px "${f.fontFamily}"`));

  Promise.all(promises)
    .then(() => onLoaded?.())
    .catch(() => onLoaded?.());
}

function drawHandles(
  ctx: CanvasRenderingContext2D,
  vMinX: number,
  vMinY: number,
  vMaxX: number,
  vMaxY: number
) {
  const midX = (vMinX + vMaxX) / 2;

  const rhX = midX;
  const rhY = vMinY - ROTATE_HANDLE_OFFSET;

  ctx.save();
  ctx.strokeStyle = 'rgba(0,184,219,0.8)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(midX, vMinY - 1);
  ctx.lineTo(rhX, rhY);
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#00b8db';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(rhX, rhY, ROTATE_HANDLE_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#00b8db';
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';
  const r = ROTATE_HANDLE_RADIUS * 0.5;
  ctx.beginPath();
  ctx.arc(rhX, rhY, r, -Math.PI * 1.1, Math.PI * 0.5);
  ctx.stroke();
  const ax = rhX + r * Math.cos(Math.PI * 0.75);
  const ay = rhY + r * Math.sin(Math.PI * 0.75);
  const arrowSize = r * 0.55;
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(ax - arrowSize, ay - arrowSize * 0.5);
  ctx.moveTo(ax, ay);
  ctx.lineTo(ax + arrowSize * 0.5, ay - arrowSize);
  ctx.stroke();
  ctx.restore();

  const corners: [number, number][] = [
    [vMinX, vMinY],
    [vMaxX, vMinY],
    [vMaxX, vMaxY],
    [vMinX, vMaxY],
  ];
  const hs = SCALE_HANDLE_HALF;
  for (const [hx, hy] of corners) {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#00b8db';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.strokeRect(hx - hs, hy - hs, hs * 2, hs * 2);
    ctx.fillRect(hx - hs, hy - hs, hs * 2, hs * 2);
    ctx.restore();
  }
}

function selectElement(
  ctx: CanvasRenderingContext2D,
  element: CanvasElement,
  bounds: ElementBounds,
  scaleX: number,
  scaleY: number,
  w?: number,
  h?: number
) {
  ctx.save();
  const absScale = Math.max(Math.abs(element.scale), 0.1);
  ctx.strokeStyle = '#00b8db';
  ctx.lineWidth = 2 / absScale;
  ctx.setLineDash([6 / absScale, 4 / absScale]);

  if (element.type === 'IMAGE' && w !== undefined && h !== undefined)
    ctx.strokeRect(-w / 2 - 2, -h / 2 - 2, w + 4, h + 4);
  else ctx.strokeRect(bounds.minX, bounds.minY, bounds.width, bounds.height);

  ctx.restore();

  ctx.save();
  ctx.scale(1 / scaleX, 1 / scaleY);
  const vMinX = Math.min(bounds.minX * scaleX, bounds.maxX * scaleX);
  const vMinY = Math.min(bounds.minY * scaleY, bounds.maxY * scaleY);
  const vMaxX = Math.max(bounds.minX * scaleX, bounds.maxX * scaleX);
  const vMaxY = Math.max(bounds.minY * scaleY, bounds.maxY * scaleY);
  drawHandles(ctx, vMinX, vMinY, vMaxX, vMaxY);
  ctx.restore();
}

export function renderCanvasElement(
  ctx: CanvasRenderingContext2D,
  element: CanvasElement,
  isSelected: boolean,
  onAssetLoaded?: () => void
): ElementBounds | null {
  const scaleX = element.scale * (element.flipX ? -1 : 1);
  const scaleY = element.scale * (element.flipY ? -1 : 1);

  ctx.save();
  ctx.translate(element.x, element.y);
  ctx.rotate((element.rotation * Math.PI) / 180);
  ctx.scale(scaleX, scaleY);

  let bounds: ElementBounds | null = null;

  if (element.type === 'IMAGE') {
    const imageItem = StampImages.find((img) => img.id === element.content);
    if (imageItem) {
      const img = getCachedImage(imageItem.url, onAssetLoaded);
      if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        ctx.drawImage(img, -w / 2, -h / 2, w, h);

        bounds = {
          minX: -w / 2,
          minY: -h / 2,
          maxX: w / 2,
          maxY: h / 2,
          width: w,
          height: h,
        };

        if (isSelected) selectElement(ctx, element, bounds, scaleX, scaleY, w, h);
      }
    }
  } else if (element.type === 'TEXT') {
    const fontItem = StampFonts.find((f) => f.id === element.fontFamilyId);
    const fontFamily = fontItem?.fontFamily || 'angella';
    const fontSize = 72;
    const spacing = element.spacing ?? 1.5;
    const letterSpacing = element.letterSpacing ?? 0;
    const lineHeight = fontSize * spacing;
    const outlineWidth = element.outlineWidth ?? 12;
    const arcBend = element.arcBend || 0;
    const color = element.color || '#000000';
    const outlineColor = element.outlineColor || '#FFFFFF';

    const lines = (element.content || '').split('\n');

    ctx.font = `bold ${fontSize}px "${fontFamily}", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const deltaY = arcBend * (200 / 3);

    let minX = Number.POSITIVE_INFINITY;
    let maxX = -Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxY = -Number.POSITIVE_INFINITY;

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const line = lines[lineIdx];
      const lineOffset = (lineIdx - (lines.length - 1) / 2) * lineHeight;
      const chars = Array.from(line);

      const charWidths = chars.map((char) => ctx.measureText(char).width);
      const totalExtraLetterSpacing = Math.max(0, chars.length - 1) * letterSpacing;
      const totalLineWidth = charWidths.reduce((acc, w) => acc + w, 0) + totalExtraLetterSpacing;

      let currentX = -totalLineWidth / 2;

      for (let charIdx = 0; charIdx < chars.length; charIdx++) {
        const char = chars[charIdx];
        const charWidth = charWidths[charIdx];
        const xc = currentX + charWidth / 2;
        currentX += charWidth + letterSpacing;

        const yc = -2 * deltaY * (xc / 2000) ** 2 + lineOffset;
        const angle = Math.atan2(-(xc / 500) * deltaY, 2000);

        minX = Math.min(minX, xc - charWidth / 2);
        maxX = Math.max(maxX, xc + charWidth / 2);
        minY = Math.min(minY, yc - fontSize / 2);
        maxY = Math.max(maxY, yc + fontSize / 2);

        ctx.save();
        ctx.translate(xc, yc);
        ctx.rotate(angle);

        if (outlineWidth > 0) {
          ctx.lineWidth = outlineWidth * 2;
          ctx.strokeStyle = outlineColor;
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';
          ctx.miterLimit = 2;
          ctx.strokeText(char, 0, 0);
        }

        ctx.fillStyle = color;
        ctx.fillText(char, 0, 0);

        ctx.restore();
      }
    }

    if (Number.isFinite(minX) && Number.isFinite(maxX)) {
      const pad = outlineWidth / 2 + 4;
      bounds = {
        minX: minX - pad,
        minY: minY - pad,
        maxX: maxX + pad,
        maxY: maxY + pad,
        width: maxX - minX + pad * 2,
        height: maxY - minY + pad * 2,
      };

      if (isSelected) selectElement(ctx, element, bounds, scaleX, scaleY);
    }
  }

  ctx.restore();
  return bounds;
}

export function renderAllElements(
  ctx: CanvasRenderingContext2D,
  elements: CanvasElement[],
  canvasSize: number,
  selectedElementId: string | null = null,
  onAssetLoaded?: () => void,
  displaySize?: number,
  boundsMap?: Map<string, ElementBounds>
) {
  const renderSize = displaySize ?? canvasSize;
  ctx.clearRect(0, 0, renderSize, renderSize);

  const scale = displaySize != null ? displaySize / canvasSize : 1;

  ctx.save();
  if (scale !== 1) {
    ctx.scale(scale, scale);
  }

  for (const element of elements) {
    const isSelected = element.id === selectedElementId;
    const bounds = renderCanvasElement(ctx, element, isSelected, onAssetLoaded);
    if (bounds && boundsMap) {
      boundsMap.set(element.id, bounds);
    }
  }

  ctx.restore();
}

export function hitTestElements(
  elements: CanvasElement[],
  clickX: number,
  clickY: number
): string | null {
  for (let i = elements.length - 1; i >= 0; i--) {
    const el = elements[i];
    const dx = clickX - el.x;
    const dy = clickY - el.y;

    const rad = (-el.rotation * Math.PI) / 180;
    const unrotatedX = dx * Math.cos(rad) - dy * Math.sin(rad);
    const unrotatedY = dx * Math.sin(rad) + dy * Math.cos(rad);

    const scaleX = el.scale * (el.flipX ? -1 : 1);
    const scaleY = el.scale * (el.flipY ? -1 : 1);
    const localX = unrotatedX / (scaleX || 1);
    const localY = unrotatedY / (scaleY || 1);

    const hitThreshold = 60;
    if (Math.abs(localX) <= hitThreshold && Math.abs(localY) <= hitThreshold) {
      return el.id;
    }
  }

  return null;
}
