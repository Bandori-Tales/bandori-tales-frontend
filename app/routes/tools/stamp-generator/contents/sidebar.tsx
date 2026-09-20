import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Download, Image, Layers, LoaderCircle, Save, Trash2, Type, X } from 'lucide-react';
import { useState } from 'react';

import useDialogStore from '@/hooks/store/use-dialog';
import { itemStorage } from '@/lib/storage';
import { cn } from '@/lib/utils';

import { Text } from '@/components/helper/text';
import GeneralDialog from '@/components/shared/general-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';

import { DIALOG_KEY, LOCAL_STORAGE_KEY, STAMP_GENERATOR_CONST } from '@/constants';
import type { CanvasElement, ICanvasElementType } from '@/schemas/models';

import { SidebarImageDialog, SidebarTextDialog } from '../components/sidebar-dialog';
import { SidebarSortableItem } from '../components/sidebar-sortable-item';

export function StampGeneratorSidebar({
  elements,
  setElements,
  handleAddElement,
  handleDragEnd,
  selectedId,
  setSelectedId,
  handleDownload,
}: {
  elements: CanvasElement[];
  setElements: (items: CanvasElement[]) => void;
  handleAddElement: (type: ICanvasElementType, name: string, content: string) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  handleDownload: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [elementToEdit, setElementToEdit] = useState<CanvasElement | null>(null);
  const { open: openDialog } = useDialogStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleSaveProgress() {
    itemStorage.local.set(LOCAL_STORAGE_KEY.STAMP_GENERATOR.DATA, elements);
    toast.success('Progress saved!');
  }

  function handleClearProgress() {
    itemStorage.local.set(LOCAL_STORAGE_KEY.STAMP_GENERATOR.DATA, []);
    setElements([]);
    toast.success('Canvas cleared');
  }

  function handleHideSidebar() {
    setIsExpand(false);
    document.body.style.overflow = 'unset';
  }

  function handleShowSidebar() {
    setIsExpand(true);

    if (window?.document) {
      document.body.style.overflow = 'hidden';
    }
  }

  async function handleStampDownload() {
    setIsLoading(true);
    await handleDownload();
    setIsLoading(false);
  }

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className={cn(
          'fixed top-3 right-3 z-20 rounded-full border-2 border-primary bg-white drop-shadow-black/20 drop-shadow-sm [&_svg]:size-6 lg:[&_svg]:size-5'
        )}
        onClick={handleShowSidebar}
      >
        <Layers className="stroke-2 text-primary" />
      </Button>

      <SidebarImageDialog
        dialogKey={DIALOG_KEY.STAMP_GENERATOR.ADD_IMAGE}
        onSubmit={handleAddElement}
      />
      <SidebarTextDialog
        dialogKey={DIALOG_KEY.STAMP_GENERATOR.ADD_TEXT}
        onSubmit={handleAddElement}
      />
      <SidebarImageDialog
        dialogKey={DIALOG_KEY.STAMP_GENERATOR.EDIT_IMAGE}
        title="Edit Image"
        confirmText="Update"
        defaultImageId={elementToEdit?.type === 'IMAGE' ? elementToEdit.content : null}
        onSubmit={(_, name, content) => {
          if (elementToEdit) {
            setElements(
              elements.map((el) => (el.id === elementToEdit.id ? { ...el, name, content } : el))
            );
          }
        }}
      />
      <SidebarTextDialog
        dialogKey={DIALOG_KEY.STAMP_GENERATOR.EDIT_TEXT}
        title="Edit Text"
        confirmText="Update"
        defaultText={elementToEdit?.type === 'TEXT' ? elementToEdit.content : ''}
        defaultFontId={elementToEdit?.type === 'TEXT' ? elementToEdit.fontFamilyId : undefined}
        onSubmit={(_, name, content, fontFamilyId) => {
          if (elementToEdit) {
            setElements(
              elements.map((el) =>
                el.id === elementToEdit.id ? { ...el, name, content, fontFamilyId } : el
              )
            );
          }
        }}
      />

      <GeneralDialog
        dialogKey={DIALOG_KEY.STAMP_GENERATOR.CLEAR_DATA}
        title="Clear Canvas"
        description="This action will clear all layer in current canvas"
        useCancel
        onConfirm={handleClearProgress}
        confirmText="Clear"
      />

      <aside
        className={cn(
          'fixed top-0 flex h-full w-75 flex-col items-center justify-start border-l border-l-primary bg-white pt-5 pb-2 transition-all duration-300',
          isExpand ? 'right-0 z-50 opacity-100 lg:z-25' : '-right-80 z-0 opacity-0'
        )}
      >
        <div className="relative flex h-full w-full flex-col justify-between gap-3">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute -top-2 -left-5 rounded-full border-2 border-primary drop-shadow-black/20 transition-colors duration-300 hover:bg-slate-100 [&_svg]:size-6 lg:[&_svg]:size-5"
            onClick={handleHideSidebar}
          >
            <X className="stroke-3 text-primary" />
          </Button>

          <Text
            type="st1"
            weight="bold"
            className="w-full border-b border-b-primary px-1 pb-4 text-center text-primary"
          >
            Stamp Layers
          </Text>

          <div className="flex h-full w-full flex-col justify-start gap-5 px-3">
            <div className="grid w-full grid-cols-2 gap-1">
              <Button
                type="button"
                variant="default"
                size="sm"
                leftIcon={<Image />}
                onClick={() => openDialog(DIALOG_KEY.STAMP_GENERATOR.ADD_IMAGE)}
                disabled={elements.length >= STAMP_GENERATOR_CONST.MAX_ELEMENTS}
              >
                Add Image
              </Button>
              <Button
                type="button"
                variant="default"
                size="sm"
                leftIcon={<Type />}
                onClick={() => openDialog(DIALOG_KEY.STAMP_GENERATOR.ADD_TEXT)}
                disabled={elements.length >= STAMP_GENERATOR_CONST.MAX_ELEMENTS}
              >
                Add Text
              </Button>
            </div>

            <div className="h-full w-full">
              <div
                className={cn(
                  'flex flex-row items-center',
                  elements.length > 0 ? 'justify-between' : 'justify-start'
                )}
              >
                <Text type="p" weight="semibold" lineHeight={8}>
                  Layers ({elements.length} / {STAMP_GENERATOR_CONST.MAX_ELEMENTS})
                </Text>
                {elements.length > 0 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="hover:bg-black/5"
                    onClick={() => setSelectedId(null)}
                  >
                    Deselect All
                  </Button>
                )}
              </div>

              <div className="flex h-full w-full flex-col gap-2 overflow-scroll pt-3">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={elements.map((element) => element.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {[...elements].reverse().map((element) => (
                      <SidebarSortableItem
                        key={element.id}
                        canvasElement={element}
                        isSelected={selectedId === element.id}
                        onSelect={() => setSelectedId(element.id)}
                        onEdit={() => {
                          setElementToEdit(element);
                          if (element.type === 'IMAGE') {
                            openDialog(DIALOG_KEY.STAMP_GENERATOR.EDIT_IMAGE);
                          } else {
                            openDialog(DIALOG_KEY.STAMP_GENERATOR.EDIT_TEXT);
                          }
                        }}
                        onDelete={() => {
                          setElements(elements.filter((item) => item.id !== element.id));
                          if (selectedId === element.id) setSelectedId(null);
                        }}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          </div>

          <div className="flex h-fit w-full shrink-0 flex-col items-center justify-center gap-2 px-2">
            <Button
              type="button"
              variant="default"
              size="sm"
              className="w-full bg-emerald-600 hover:bg-emerald-600/90"
              leftIcon={<Save />}
              onClick={handleSaveProgress}
            >
              Save Progress
            </Button>

            <Button
              type="button"
              variant="default"
              size="sm"
              className="w-full"
              leftIcon={isLoading ? <LoaderCircle className="animate-spin" /> : <Download />}
              onClick={handleStampDownload}
              disabled={isLoading}
            >
              Download Stamp
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full hover:bg-black/10"
              leftIcon={<Trash2 />}
              onClick={() => openDialog(DIALOG_KEY.STAMP_GENERATOR.CLEAR_DATA)}
            >
              Clear Canvas
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
