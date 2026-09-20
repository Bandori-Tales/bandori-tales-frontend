// biome-ignore-all lint/a11y/noStaticElementInteractions: Div Required to be clickable
// biome-ignore-all lint/a11y/useKeyWithClickEvents: Element will be iterated
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2, Type } from 'lucide-react';

import { cn } from '@/lib/utils';

import Image from '@/components/helper/image';
import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';

import { StampImages } from '@/constants';
import type { CanvasElement } from '@/schemas/models';

interface SidebarSortableItemProps {
  canvasElement: CanvasElement;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function SidebarSortableItem({
  canvasElement: ce,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: SidebarSortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: ce.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={cn(
        'flex cursor-pointer items-center gap-1 rounded-md border p-3',
        isSelected ? 'relative z-10 border-accent bg-accent/10' : 'hover:bg-accent/5'
      )}
    >
      <div {...attributes} {...listeners} className="cursor-grab p-1 active:cursor-grabbing">
        <GripVertical className="size-6 text-slate-400" />
      </div>

      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          {ce.type === 'IMAGE' ? (
            <Image
              src={StampImages.find((image) => image.id === ce.content)?.url || ''}
              alt={ce.name}
              className="size-6 object-cover"
            />
          ) : (
            <Type className="size-6 text-foreground" />
          )}
          <Text type="btn" weight="medium" lineHeight={4} className="truncate text-primary">
            {ce.name}
          </Text>
        </div>

        <div className="flex flex-row items-center gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="size-7 rounded-full hover:bg-black/5"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Pencil className="size-3" />
          </Button>

          <Button
            variant="default"
            colors="destructive"
            size="icon"
            className="size-7 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="size-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
