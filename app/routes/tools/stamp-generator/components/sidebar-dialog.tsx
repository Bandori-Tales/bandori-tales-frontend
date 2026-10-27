import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import Image from '@/components/helper/image';
import { Text } from '@/components/helper/text';
import GeneralDialog from '@/components/shared/general-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { type StampFontItem, StampFonts, type StampImageItem, StampImages } from '@/constants';
import type { ICanvasElementType } from '@/schemas/models';

import { TextElement } from './canvas-element';

export function SidebarImageDialog({
  dialogKey,
  title = 'Add Image',
  confirmText = 'Add',
  defaultImageId = null,
  onSubmit,
}: {
  dialogKey: string;
  title?: string;
  confirmText?: string;
  defaultImageId?: string | null;
  onSubmit: (type: ICanvasElementType, name: string, content: string) => void;
}) {
  const [search, setSearch] = useState('');
  const [selectedImageId, setSelectedImageId] = useState<null | string>(defaultImageId);
  const [imageList, setImageList] = useState<StampImageItem[]>(StampImages);

  useEffect(() => {
    setSelectedImageId(defaultImageId);
  }, [defaultImageId]);

  useEffect(() => {
    const trimmedSearch = search.trim();

    if (trimmedSearch !== '') {
      setImageList(
        StampImages.filter((item) => item.label.toLowerCase().includes(trimmedSearch.toLowerCase()))
      );
    } else {
      setImageList(StampImages);
    }
  }, [search]);

  function handleConfirm() {
    const selectedImage = StampImages.find((image) => image.id === selectedImageId);

    if (selectedImage) {
      onSubmit(
        'IMAGE',
        `${selectedImage.label.slice(0, 12)}${selectedImage.label.length > 12 ? '...' : ''}`,
        selectedImage.id
      );
    }

    setSearch('');
    setSelectedImageId(defaultImageId);
  }

  function handleCancel() {
    setSearch('');
    setSelectedImageId(defaultImageId);
  }

  return (
    <GeneralDialog
      dialogKey={dialogKey}
      title={title}
      description="Select image for your stamp"
      confirmText={confirmText}
      useCancel
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    >
      <div className="flex h-100 w-full flex-col gap-3">
        <Input
          type="text"
          placeholder="Search"
          className="w-full"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid h-full w-full grid-cols-3 gap-1 overflow-y-scroll pr-3 sm:grid-cols-4 lg:grid-cols-5">
          {imageList.map((item) => {
            const isSelected = item.id === selectedImageId;

            return (
              <Button
                key={item.id}
                type="button"
                variant="ghost"
                className={cn(
                  'group col-span-1 flex h-fit w-full flex-col items-center justify-center gap-3 rounded-md py-2 transition-colors hover:bg-black/10 dark:hover:bg-white/10',
                  isSelected ? 'bg-black/10 dark:bg-white/10' : 'bg-transparent'
                )}
                onClick={() => setSelectedImageId(item.id)}
              >
                <Image
                  alt={item.label}
                  src={item.url}
                  className="h-20 w-auto overflow-visible object-cover"
                />
                <Text
                  type="c"
                  weight="medium"
                  className={cn(
                    'text-wrap transition-colors group-hover:text-secondary',
                    isSelected ? 'text-secondary' : 'text-foreground-lighter'
                  )}
                >
                  {item.label}
                </Text>
              </Button>
            );
          })}
        </div>
      </div>
    </GeneralDialog>
  );
}

export function SidebarTextDialog({
  dialogKey,
  title = 'Add Text',
  confirmText = 'Add',
  defaultText = 'Lorem Ipsum',
  defaultFontId,
  onSubmit,
}: {
  dialogKey: string;
  title?: string;
  confirmText?: string;
  defaultText?: string;
  defaultFontId?: string;
  onSubmit: (
    type: ICanvasElementType,
    name: string,
    content: string,
    fontFamilyId?: string
  ) => void;
}) {
  const [previewText, setPreviewText] = useState(defaultText);
  const [selectedFont, setSelectedFont] = useState<StampFontItem>(
    StampFonts.find((f) => f.id === defaultFontId) || StampFonts[0]
  );

  useEffect(() => {
    setPreviewText(defaultText);
    setSelectedFont(StampFonts.find((f) => f.id === defaultFontId) || StampFonts[0]);
  }, [defaultText, defaultFontId]);

  function handleConfirm() {
    onSubmit(
      'TEXT',
      `${previewText.slice(0, 12)}${previewText.length > 12 ? '...' : ''}`,
      previewText,
      selectedFont.id
    );
    setPreviewText(defaultText);
  }

  function handleCancel() {
    setPreviewText(defaultText);
    setSelectedFont(StampFonts.find((f) => f.id === defaultFontId) || StampFonts[0]);
  }

  return (
    <GeneralDialog
      dialogKey={dialogKey}
      title={title}
      description="Set text for your stamp"
      confirmText={confirmText}
      useCancel
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    >
      <div className="flex h-100 w-full flex-col gap-y-5">
        <div className="flex h-24 w-full items-center justify-center overflow-hidden rounded-md bg-slate-600">
          <TextElement
            id="add-text-preview"
            name="text preview"
            content={previewText}
            arcBend={0}
            fontFamilyId={selectedFont.id}
            width="100%"
            height="100%"
          />
        </div>

        <div className="flex h-full w-full flex-col gap-y-5 overflow-y-scroll">
          <div className="flex w-full flex-row items-center gap-x-3">
            <Text weight="semibold">Font: </Text>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-45 flex-row items-center justify-between gap-3 rounded-md border px-3 py-2">
                <Text
                  type="p"
                  weight="semibold"
                  className="text-nowrap text-foreground-lighter"
                  style={{ fontFamily: selectedFont.fontFamily }}
                >
                  {selectedFont.label}
                </Text>
                <ChevronDown className="text-foreground-lighter" />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {StampFonts.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    className="bg-transparent transition-colors hover:bg-secondary"
                    onClick={() => setSelectedFont(item)}
                  >
                    <Text
                      type="p"
                      weight="semibold"
                      className="text-foreground-lighter"
                      lineHeight={6}
                      style={{ fontFamily: item.fontFamily }}
                    >
                      {item.label}
                    </Text>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex w-full flex-col gap-y-3">
            <Text weight="semibold">Text Content (Multiline)</Text>
            <Textarea value={previewText} onChange={(v) => setPreviewText(v.target.value)} />
          </div>
        </div>
      </div>
    </GeneralDialog>
  );
}
