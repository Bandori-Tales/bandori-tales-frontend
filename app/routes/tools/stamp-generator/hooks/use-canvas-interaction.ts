import { type RefObject, useEffect, useRef } from 'react';

import type { CanvasElement } from '@/schemas/models';

import {
  type ElementBounds,
  ROTATE_HANDLE_OFFSET,
  ROTATE_HANDLE_RADIUS,
  SCALE_HANDLE_HALF,
} from './stamp-canvas-renderer';

export type HandleType = 'rotate' | 'scale-tl' | 'scale-tr' | 'scale-br' | 'scale-bl' | 'move';

interface HandleHit {
  type: HandleType;
  element: CanvasElement;
}

export interface CanvasInteractionOptions {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  elements: CanvasElement[];
  selectedElementId: string | null;
  canvasSize: number;
  boundsMapRef: RefObject<Map<string, ElementBounds>>;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, patch: Partial<CanvasElement>) => void;
}

function clientToCanvas(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  canvasSize: number
): { x: number; y: number } {
  return {
    x: (clientX - rect.left) * (canvasSize / rect.width),
    y: (clientY - rect.top) * (canvasSize / rect.height),
  };
}

function normalizeAngle(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function hitTestHandles(
  cx: number,
  cy: number,
  element: CanvasElement,
  bounds: ElementBounds
): HandleType | null {
  const dx = cx - element.x;
  const dy = cy - element.y;
  const rad = (-element.rotation * Math.PI) / 180;
  const lx = dx * Math.cos(rad) - dy * Math.sin(rad);
  const ly = dx * Math.sin(rad) + dy * Math.cos(rad);

  const absScaleX = element.scale * (element.flipX ? -1 : 1);
  const absScaleY = element.scale * (element.flipY ? -1 : 1);
  const sx = lx / (absScaleX || 1);
  const sy = ly / (absScaleY || 1);

  const { minX, minY, maxX, maxY } = bounds;
  const midX = (minX + maxX) / 2;

  const rhX = midX;
  const rhY = minY - ROTATE_HANDLE_OFFSET;
  const distR = Math.hypot(sx - rhX, sy - rhY);
  if (distR <= ROTATE_HANDLE_RADIUS + 6) return 'rotate';

  const corners: [HandleType, number, number][] = [
    ['scale-tl', minX, minY],
    ['scale-tr', maxX, minY],
    ['scale-br', maxX, maxY],
    ['scale-bl', minX, maxY],
  ];
  for (const [type, hx, hy] of corners) {
    if (Math.abs(sx - hx) <= SCALE_HANDLE_HALF + 6 && Math.abs(sy - hy) <= SCALE_HANDLE_HALF + 6) {
      return type;
    }
  }

  if (sx >= minX && sx <= maxX && sy >= minY && sy <= maxY) {
    return 'move';
  }

  return null;
}

export function useCanvasInteraction({
  canvasRef,
  elements,
  selectedElementId,
  canvasSize,
  boundsMapRef,
  onSelectElement,
  onUpdateElement,
}: CanvasInteractionOptions) {
  const stateRef = useRef({
    elements,
    selectedElementId,
    canvasSize,
    boundsMapRef,
    onSelectElement,
    onUpdateElement,
  });
  useEffect(() => {
    stateRef.current = {
      elements,
      selectedElementId,
      canvasSize,
      boundsMapRef,
      onSelectElement,
      onUpdateElement,
    };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let dragging = false;
    let dragHandle: HandleType | null = null;
    let dragElementId: string | null = null;

    let _startRotation = 0;
    let startCanvasX = 0;
    let startCanvasY = 0;
    let startElX = 0;
    let startElY = 0;
    let startScale = 1;
    let startElCx = 0;
    let startElCy = 0;

    function getCanvasPoint(canvas: HTMLCanvasElement, clientX: number, clientY: number) {
      const rect = canvas.getBoundingClientRect();
      return clientToCanvas(clientX, clientY, rect, stateRef.current.canvasSize);
    }

    function findHitHandle(cx: number, cy: number): HandleHit | null {
      const { elements: els, selectedElementId: selId, boundsMapRef: bRef } = stateRef.current;
      if (!selId) return null;
      const el = els.find((e) => e.id === selId);
      if (!el) return null;
      const bounds = bRef.current.get(selId);
      if (!bounds) return null;
      const handleType = hitTestHandles(cx, cy, el, bounds);
      if (handleType) return { type: handleType, element: el };
      return null;
    }

    function findHitElement(cx: number, cy: number): CanvasElement | null {
      const { elements: els, boundsMapRef: bRef } = stateRef.current;
      for (let i = els.length - 1; i >= 0; i--) {
        const el = els[i];
        const dx = cx - el.x;
        const dy = cy - el.y;
        const rad = (-el.rotation * Math.PI) / 180;
        const lx = dx * Math.cos(rad) - dy * Math.sin(rad);
        const ly = dx * Math.sin(rad) + dy * Math.cos(rad);
        const sx = lx / (el.scale * (el.flipX ? -1 : 1) || 1);
        const sy = ly / (el.scale * (el.flipY ? -1 : 1) || 1);
        const bounds = bRef.current.get(el.id);
        if (bounds) {
          if (sx >= bounds.minX && sx <= bounds.maxX && sy >= bounds.minY && sy <= bounds.maxY)
            return el;
        } else {
          if (Math.abs(sx) <= 60 && Math.abs(sy) <= 60) return el;
        }
      }
      return null;
    }

    function updateCursor(canvas: HTMLCanvasElement, cx: number, cy: number) {
      const handle = findHitHandle(cx, cy);
      if (handle) {
        if (handle.type === 'rotate') canvas.style.cursor = 'grab';
        else if (handle.type === 'move') canvas.style.cursor = 'move';
        else canvas.style.cursor = 'nwse-resize';
        return;
      }
      const el = findHitElement(cx, cy);
      canvas.style.cursor = el ? 'move' : 'default';
    }

    function onPointerDown(canvas: HTMLCanvasElement, e: PointerEvent) {
      if (e.button !== 0) return;
      canvas.setPointerCapture(e.pointerId);

      const { x, y } = getCanvasPoint(canvas, e.clientX, e.clientY);

      const hit = findHitHandle(x, y);
      if (hit) {
        dragging = true;
        dragHandle = hit.type;
        dragElementId = hit.element.id;
        startCanvasX = x;
        startCanvasY = y;
        startElX = hit.element.x;
        startElY = hit.element.y;
        _startRotation = hit.element.rotation;
        startScale = hit.element.scale;
        startElCx = hit.element.x;
        startElCy = hit.element.y;
        e.preventDefault();
        return;
      }

      const el = findHitElement(x, y);
      if (el) {
        if (el.id !== stateRef.current.selectedElementId) {
          stateRef.current.onSelectElement(el.id);
        }
        dragging = true;
        dragHandle = 'move';
        dragElementId = el.id;
        startCanvasX = x;
        startCanvasY = y;
        startElX = el.x;
        startElY = el.y;
        _startRotation = el.rotation;
        startScale = el.scale;
        startElCx = el.x;
        startElCy = el.y;
        e.preventDefault();
        return;
      }

      stateRef.current.onSelectElement(null);
    }

    function onPointerMove(canvas: HTMLCanvasElement, e: PointerEvent) {
      if (!dragging || !dragElementId) {
        const { x, y } = getCanvasPoint(canvas, e.clientX, e.clientY);
        updateCursor(canvas, x, y);
        return;
      }

      const { x, y } = getCanvasPoint(canvas, e.clientX, e.clientY);
      const dx = x - startCanvasX;
      const dy = y - startCanvasY;

      const { onUpdateElement: update, canvasSize: cs } = stateRef.current;

      if (dragHandle === 'move') {
        update(dragElementId, {
          x: clamp(Math.round(startElX + dx), 0, cs),
          y: clamp(Math.round(startElY + dy), 0, cs),
        });
      } else if (dragHandle === 'rotate') {
        const angle = Math.atan2(y - startElCy, x - startElCx) * (180 / Math.PI) + 90;
        let newRot = normalizeAngle(Math.round(angle));
        if (e.shiftKey) newRot = Math.round(newRot / 15) * 15;
        update(dragElementId, { rotation: newRot });
      } else if (
        dragHandle === 'scale-tl' ||
        dragHandle === 'scale-tr' ||
        dragHandle === 'scale-br' ||
        dragHandle === 'scale-bl'
      ) {
        const distNow = Math.hypot(x - startElCx, y - startElCy);
        const distStart = Math.hypot(startCanvasX - startElCx, startCanvasY - startElCy);
        if (distStart > 0) {
          const newScale = clamp(startScale * (distNow / distStart), 0.1, 5);
          update(dragElementId, { scale: Math.round(newScale * 100) / 100 });
        }
      }
    }

    function onPointerUp(canvas: HTMLCanvasElement, e: PointerEvent) {
      if (!dragging) return;
      dragging = false;
      dragHandle = null;
      dragElementId = null;
      canvas.releasePointerCapture(e.pointerId);
    }

    let lastPinchDist = 0;
    let pinchElementId: string | null = null;
    let pinchStartScale = 1;

    function onTouchStart(e: TouchEvent) {
      if (e.touches.length === 2) {
        const { selectedElementId: selId, elements: els } = stateRef.current;
        if (!selId) return;
        const el = els.find((el) => el.id === selId);
        if (!el) return;
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        lastPinchDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        pinchElementId = selId;
        pinchStartScale = el.scale;
        e.preventDefault();
      }
    }

    function onTouchMove(e: TouchEvent) {
      if (e.touches.length === 2 && pinchElementId) {
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        if (lastPinchDist > 0) {
          const newScale = clamp(
            Math.round(pinchStartScale * (dist / lastPinchDist) * 100) / 100,
            0.1,
            5
          );
          stateRef.current.onUpdateElement(pinchElementId, { scale: newScale });
        }
        e.preventDefault();
      }
    }

    function onTouchEnd() {
      pinchElementId = null;
      lastPinchDist = 0;
    }

    canvas.addEventListener('pointerdown', (ev) => onPointerDown(canvas, ev));
    canvas.addEventListener('pointermove', (ev) => onPointerMove(canvas, ev));
    canvas.addEventListener('pointerup', (ev) => onPointerUp(canvas, ev));
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);

    return () => {
      canvas.removeEventListener('pointerdown', (ev) => onPointerDown(canvas, ev));
      canvas.removeEventListener('pointermove', (ev) => onPointerMove(canvas, ev));
      canvas.removeEventListener('pointerup', (ev) => onPointerUp(canvas, ev));
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, [canvasRef]);
}
