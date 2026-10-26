import { ArrowLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

import { generateMeta } from '@/lib/generate-meta';
import { itemStorage } from '@/lib/storage';
import { cn } from '@/lib/utils';

import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';

import { LOCAL_STORAGE_KEY } from '@/constants';
import type { CanvasElement } from '@/schemas/models';

import type { Route } from './+types';
import { StampGeneratorCanvas } from './contents/canvas';
import { StampGeneratorDrawer } from './contents/drawer';
import { StampGeneratorSidebar } from './contents/sidebar';
import { getGeneratorSettings, getStampElements } from './hooks/get-stamp';
import {
  addElement,
  copyStamp,
  DndDragEnd,
  downloadStamp,
  updateSelected,
} from './hooks/stamp-generator-utils';

export function meta() {
  return generateMeta({ title: 'Stamp Generator' });
}

export function clientLoader() {
  const savedElements = getStampElements();
  const generatorSettings = getGeneratorSettings();

  return {
    generatorSettings,
    savedElements,
  };
}

export default function StampGeneratorPage({ loaderData }: Route.ComponentProps) {
  const [elements, setElements] = useState<CanvasElement[]>(loaderData.savedElements);
  const [cropResult, setCropResult] = useState(loaderData.generatorSettings.crop_result);
  const [canvasSize, setCanvasSize] = useState(loaderData.generatorSettings.canvas_size);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const isInitialMount = useRef(true);

  const selectedElement = elements.find((element) => element.id === selectedElementId);

  const handleDndDragEnd = DndDragEnd(setElements);
  const handleAddElement = addElement(elements, setElements, setSelectedElementId, canvasSize);
  const handleUpdateSelectedElement = updateSelected(elements, setElements, selectedElementId);

  const handleUpdateElementById = (id: string, patch: Partial<(typeof elements)[0]>) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, ...patch } : el)));
  };

  const handleStampDownload = async () => {
    setSelectedElementId(null);
    await downloadStamp(elements, canvasSize, cropResult);
  };

  const handleStampCopy = async () => {
    setSelectedElementId(null);
    await copyStamp(elements, canvasSize, cropResult);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    itemStorage.local.set(LOCAL_STORAGE_KEY.STAMP_GENERATOR.DATA, elements);
  }, [elements]);

  useEffect(() => {
    itemStorage.local.set(LOCAL_STORAGE_KEY.STAMP_GENERATOR.SETTINGS, {
      canvas_size: canvasSize,
      crop_result: cropResult,
    });
  }, [canvasSize, cropResult]);

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
            Canvas Size: {canvasSize}px × {canvasSize}px
          </Text>
          <Text type="c" weight="regular">
            Save Result: .png
          </Text>
        </div>

        <Text type="c" weight="regular" className="text-center italic">
          Progress is saved automatically
        </Text>
      </div>

      <div className="relative aspect-square w-full max-w-87.5 overflow-hidden rounded-sm bg-slate-600 shadow-md">
        <StampGeneratorCanvas
          canvasSize={canvasSize}
          elements={elements}
          selectedElementId={selectedElementId}
          onSelectElement={setSelectedElementId}
          onUpdateElement={handleUpdateElementById}
        />
      </div>

      <StampGeneratorDrawer
        selectedElement={selectedElement}
        handleUpdateComponent={handleUpdateSelectedElement}
        canvasSize={canvasSize}
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
        cropResult={cropResult}
        setCropResult={setCropResult}
        canvasSize={canvasSize}
        setCanvasSize={setCanvasSize}
      />
    </main>
  );
}
