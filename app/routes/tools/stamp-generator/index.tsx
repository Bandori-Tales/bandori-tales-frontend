import { ArrowLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

import { generateMeta } from '@/lib/generate-meta';
import { cn } from '@/lib/utils';

import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';

import { STAMP_GENERATOR_CONST } from '@/constants';
import type { CanvasElement } from '@/schemas/models';

import type { Route } from './+types';
import { StampGeneratorCanvas } from './contents/canvas';
import { StampGeneratorDrawer } from './contents/drawer';
import { StampGeneratorSidebar } from './contents/sidebar';
import { getStampElements } from './hook/get-stamp';
import {
  addElement,
  copyStamp,
  DndDragEnd,
  downloadStamp,
  updateSelected,
} from './hook/stamp-generator-utils';

export function meta() {
  return generateMeta({ title: 'Stamp Generator' });
}

export function clientLoader() {
  const savedElements = getStampElements();

  return {
    savedElements,
  };
}

export default function StampGeneratorPage({ loaderData }: Route.ComponentProps) {
  const [elements, setElements] = useState<CanvasElement[]>(loaderData.savedElements);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const [canvasScale, setCanvasScale] = useState(1);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const selectedElement = elements.find((element) => element.id === selectedElementId);

  const handleDndDragEnd = DndDragEnd(setElements);
  const handleAddElement = addElement(elements, setElements, setSelectedElementId);
  const handleUpdateSelectedElement = updateSelected(elements, setElements, selectedElementId);

  const handleStampDownload = async () => {
    setSelectedElementId(null);
    await downloadStamp(elements);
  };

  const handleStampCopy = async () => {
    setSelectedElementId(null);
    await copyStamp(elements);
  };

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;
        const scale = containerWidth / STAMP_GENERATOR_CONST.LOGICAL_CANVAS_SIZE;

        setCanvasScale(scale);
      }
    });

    if (canvasContainerRef.current) {
      observer.observe(canvasContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-mauve-300">
      <Button
        asChild
        type="button"
        variant="secondary"
        size="icon"
        className={cn(
          'absolute top-3 left-3 z-20 rounded-full border-2 border-primary bg-white drop-shadow-black/20 drop-shadow-sm [&_svg]:size-6 lg:[&_svg]:size-5'
        )}
      >
        <Link to="/tools">
          <ArrowLeft />
        </Link>
      </Button>

      <div className="fixed top-12 flex flex-col justify-center gap-2 pt-3 sm:top-1">
        <div className="flex flex-row justify-center gap-5">
          <Text type="c" weight="regular">
            Canvas Size: {STAMP_GENERATOR_CONST.LOGICAL_CANVAS_SIZE}px ×{' '}
            {STAMP_GENERATOR_CONST.LOGICAL_CANVAS_SIZE}px
          </Text>
          <Text type="c" weight="regular">
            Save Result: .png
          </Text>
        </div>

        <Text type="c" weight="regular" className="text-center italic">
          Note: Your progress aren't saved automatically
        </Text>
      </div>

      <div
        ref={canvasContainerRef}
        className="relative aspect-square w-full max-w-87.5 overflow-hidden rounded-sm bg-slate-600 shadow-md"
      >
        <StampGeneratorCanvas
          canvasScale={canvasScale}
          elements={elements}
          selectedElementId={selectedElementId}
        />
      </div>

      <StampGeneratorDrawer
        selectedElement={selectedElement}
        handleUpdateComponent={handleUpdateSelectedElement}
      />

      <StampGeneratorSidebar
        elements={elements}
        setElements={setElements}
        handleAddElement={handleAddElement}
        handleDragEnd={handleDndDragEnd}
        selectedId={selectedElementId}
        setSelectedId={setSelectedElementId}
        handleDownload={handleStampDownload}
        handleCopy={handleStampCopy}
      />
    </main>
  );
}
