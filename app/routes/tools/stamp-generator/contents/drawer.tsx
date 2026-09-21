import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

import { STAMP_GENERATOR_CONST } from '@/constants';
import type { CanvasElement } from '@/schemas/models';

import { DrawerColorPicker, DrawerSlider, DrawerSwitch } from '../components/drawer-component';

export function StampGeneratorDrawer({
  selectedElement,
  handleUpdateComponent,
}: {
  selectedElement?: CanvasElement;
  handleUpdateComponent: (updatedElement: Partial<CanvasElement>) => void;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Drawer direction="bottom" open={isDrawerOpen} onOpenChange={(open) => setIsDrawerOpen(open)}>
      <DrawerTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className={cn(
            'fixed bottom-0 w-30 rounded-b-none drop-shadow-none transition-opacity duration-300',
            isDrawerOpen ? 'opacity-0' : 'opacity-100'
          )}
        >
          <ChevronUp className="stroke-3 text-primary" />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        modal={false}
        onInteractOutside={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('[data-slot="popover-content"]')) {
            e.preventDefault();
          }
        }}
        className="w-full bg-white data-[vaul-drawer-direction=bottom]:max-h-[50vh]"
      >
        <div className="scrollbar-none flex h-full w-full flex-col items-center justify-start gap-3 overflow-y-scroll px-5 pt-4 pb-8">
          <Text className="pb-3">{selectedElement ? 'Edit Layer' : 'Select a layer first'}</Text>
          {selectedElement && (
            <div className="grid w-full grid-cols-1 gap-4 px-1 sm:grid-cols-2 sm:px-5 lg:grid-cols-3 lg:px-10">
              {selectedElement.type === 'TEXT' && (
                <>
                  <div className="col-span-1 flex w-full flex-col items-center justify-center gap-3">
                    <DrawerSlider
                      label="Outline"
                      step={1}
                      minValue={0}
                      maxValue={20}
                      value={selectedElement.outlineWidth || 0}
                      handleValueChange={(value: number) =>
                        handleUpdateComponent({ outlineWidth: value })
                      }
                    />
                    <DrawerSlider
                      label="Arc Bend"
                      step={1}
                      minValue={-200}
                      maxValue={200}
                      value={selectedElement.arcBend || 0}
                      handleValueChange={(value: number) =>
                        handleUpdateComponent({ arcBend: value })
                      }
                    />
                  </div>
                  <div className="col-span-1 flex w-full flex-col gap-3">
                    <DrawerSlider
                      label="Spacing"
                      step={0.05}
                      minValue={0}
                      maxValue={20}
                      value={selectedElement.spacing || 0}
                      handleValueChange={(value: number) =>
                        handleUpdateComponent({ spacing: value })
                      }
                    />
                  </div>
                  <div className="col-span-1 flex h-full w-full flex-col justify-center gap-3 lg:justify-start">
                    <DrawerColorPicker
                      label="Text Color"
                      value={selectedElement.color || '#000000'}
                      handleValueChange={(value) => handleUpdateComponent({ color: value })}
                    />
                    <DrawerColorPicker
                      label="Outline Color"
                      value={selectedElement.outlineColor || '#FFFFFF'}
                      handleValueChange={(value) => handleUpdateComponent({ outlineColor: value })}
                    />
                  </div>
                  <div className="col-span-1 hidden sm:block lg:hidden" />
                </>
              )}
              <div className="col-span-1 flex w-full flex-col gap-3">
                <DrawerSlider
                  label="X"
                  step={1}
                  minValue={0}
                  maxValue={STAMP_GENERATOR_CONST.LOGICAL_CANVAS_SIZE}
                  value={selectedElement.x}
                  handleValueChange={(value: number) => handleUpdateComponent({ x: value })}
                />
                <DrawerSlider
                  label="Y"
                  step={1}
                  minValue={0}
                  maxValue={STAMP_GENERATOR_CONST.LOGICAL_CANVAS_SIZE}
                  value={selectedElement.y}
                  handleValueChange={(value: number) => handleUpdateComponent({ y: value })}
                />
              </div>
              <div className="col-span-1 flex w-full flex-col gap-3">
                <DrawerSlider
                  label="Rotation"
                  step={1}
                  minValue={0}
                  maxValue={360}
                  value={selectedElement.rotation}
                  handleValueChange={(value: number) => handleUpdateComponent({ rotation: value })}
                />
                <DrawerSlider
                  label="Scale"
                  step={0.05}
                  minValue={0.1}
                  maxValue={3}
                  value={selectedElement.scale}
                  handleValueChange={(value: number) => handleUpdateComponent({ scale: value })}
                />
              </div>
              <div className="col-span-1 flex h-full w-full flex-col justify-center gap-3 lg:justify-start">
                <DrawerSwitch
                  label="Flip Horizontal"
                  value={selectedElement.flipX}
                  handleValueChange={(value) => handleUpdateComponent({ flipX: value })}
                />
                <DrawerSwitch
                  label="Flip Vertical"
                  value={selectedElement.flipY}
                  handleValueChange={(value) => handleUpdateComponent({ flipY: value })}
                />
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
