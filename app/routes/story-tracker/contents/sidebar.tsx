import { valibotResolver } from '@hookform/resolvers/valibot';
import { ChevronDown, Funnel, Trash2, X } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { Form, useRevalidator, useSubmit } from 'react-router';
import { RemixFormProvider, useRemixForm } from 'remix-hook-form';

import useDialogStore from '@/hooks/store/use-dialog';
import { cn } from '@/lib/utils';

import InputForm from '@/components/form/input';
import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import { StoryTrackerCheckboxList, StoryTrackerDefaultValue } from '@/constants';
import { type BandoriStoryForm, BandoriStoryFormSchema } from '@/schemas/models';

import {
  ClearFilterDialog,
  FilterCheckboxes,
  FilterMainBand,
  FilterMainCharacter,
  FilterSettingsSection,
  FilterSideBand,
  FilterSideCharacter,
  FilterSort,
  FilterStoryTag,
  FilterTranslationType,
} from '../components/sidebar-form';

interface StoryTrackerSidebarProps {
  isMobile: boolean;
  splitList: boolean;
  setSplitList: (split: boolean) => void;
  filterData?: BandoriStoryForm | null;
}

interface SidebarFilterSectionProps {
  title: string;
  fullWidth?: boolean;
  isCollapsible?: boolean;
  children: ReactNode;
}

function SidebarFilterSection({
  title,
  fullWidth,
  isCollapsible,
  children,
}: SidebarFilterSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group flex w-full flex-col gap-1 rounded-md p-1 transition-all duration-300 hover:cursor-pointer"
    >
      {isCollapsible ? (
        <CollapsibleTrigger className="flex w-full flex-row items-center justify-between">
          <Text
            type="btn"
            weight="semibold"
            lineHeight={5}
            className="text-nowrap text-primary transition-all duration-300 group-hover:text-amber-500"
          >
            {title}
          </Text>

          <ChevronDown
            className={cn(
              'size-5 stroke-2 text-primary transition-all duration-300 group-hover:text-amber-500',
              isOpen ? 'rotate-0' : 'rotate-180',
              isCollapsible ? undefined : 'hidden'
            )}
          />
        </CollapsibleTrigger>
      ) : (
        <div className="flex w-full flex-row items-center justify-between">
          <Text type="btn" weight="semibold" lineHeight={5} className="text-nowrap text-primary">
            {title}
          </Text>
        </div>
      )}
      <CollapsibleContent
        className={cn(
          fullWidth ? 'px-0' : 'pl-3',
          'data-[state=closed]:slide-out-to-top-10 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-top-10 data-[state=open]:fade-in-0 pt-1 data-[state=closed]:animate-out data-[state=open]:animate-in'
        )}
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function StoryTrackerSidebar({
  splitList,
  setSplitList,
  filterData,
}: StoryTrackerSidebarProps) {
  const [isExpand, setIsExpand] = useState(false);
  const { open: openDialog } = useDialogStore();
  const revalidator = useRevalidator();

  const submit = useSubmit();
  const methods = useRemixForm<BandoriStoryForm>({
    mode: 'onBlur',
    defaultValues: filterData || StoryTrackerDefaultValue,
    submitHandlers: {
      onValid: (data) => {
        submit(data, { method: 'POST', encType: 'application/json' });
      },
    },
    resolver: valibotResolver(BandoriStoryFormSchema),
  });

  const { reset, handleSubmit } = methods;

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

  function handleReset() {
    reset(StoryTrackerDefaultValue);
    submit(StoryTrackerDefaultValue, { method: 'POST', encType: 'application/json' });
    revalidator.revalidate();
  }

  return (
    <>
      <ClearFilterDialog reset={handleReset} />
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className={cn(
          'fixed top-28 right-3 z-20 rounded-full border-2 border-primary bg-white drop-shadow-black/20 drop-shadow-sm lg:top-16 [&_svg]:size-6 lg:[&_svg]:size-5'
        )}
        onClick={handleShowSidebar}
      >
        <Funnel className="stroke-2 text-primary" />
      </Button>

      <aside
        className={cn(
          'justify-baseline fixed top-0 flex h-full w-64 flex-col items-center border-l border-l-primary bg-white pt-3 pb-2 transition-all duration-300 lg:pt-16',
          isExpand ? 'right-0 z-50 opacity-100 lg:z-25' : '-right-80 z-0 opacity-0'
        )}
      >
        <RemixFormProvider {...methods}>
          <Form
            method="GET"
            onSubmit={handleSubmit}
            className="relative flex h-full w-full flex-col items-center justify-between gap-3"
          >
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute -top-2 -left-6 rounded-full border-2 border-primary drop-shadow-black/20 transition-colors duration-300 hover:bg-slate-100 [&_svg]:size-6 lg:[&_svg]:size-5"
              onClick={handleHideSidebar}
            >
              <X className="stroke-3 text-primary" />
            </Button>
            <div className="justify-baseline flex h-full w-full flex-col items-center gap-2 overflow-y-scroll border-b border-b-primary px-2 pb-3">
              <Text
                type="st1"
                weight="bold"
                className="w-full border-b border-b-primary px-1 pb-4 text-center text-primary"
              >
                Story Tracker
              </Text>

              <div className="justify-baseline flex h-full w-full flex-col items-center gap-3 overflow-scroll px-1">
                <SidebarFilterSection title="Search" fullWidth>
                  <InputForm type="text" name="search" placeholder="search" />
                </SidebarFilterSection>

                <SidebarFilterSection title="Sort" isCollapsible>
                  <FilterSort />
                </SidebarFilterSection>

                <SidebarFilterSection title="Settings" isCollapsible>
                  <FilterSettingsSection splitList={splitList} setSplitList={setSplitList} />
                </SidebarFilterSection>

                <SidebarFilterSection title="Category" isCollapsible>
                  <FilterCheckboxes items={StoryTrackerCheckboxList.category} />
                </SidebarFilterSection>

                <SidebarFilterSection title="Type" isCollapsible>
                  <FilterCheckboxes items={StoryTrackerCheckboxList.type} />
                </SidebarFilterSection>

                <SidebarFilterSection title="Tag" isCollapsible>
                  <FilterStoryTag />
                </SidebarFilterSection>

                <SidebarFilterSection title="Translation" isCollapsible>
                  <FilterTranslationType />
                </SidebarFilterSection>

                <SidebarFilterSection title="Main Band" isCollapsible>
                  <FilterMainBand />
                </SidebarFilterSection>

                <SidebarFilterSection title="Side Bands" isCollapsible>
                  <FilterSideBand />
                </SidebarFilterSection>

                <SidebarFilterSection title="Main Characters" isCollapsible>
                  <FilterMainCharacter />
                </SidebarFilterSection>

                <SidebarFilterSection title="Side Characters" isCollapsible>
                  <FilterSideCharacter />
                </SidebarFilterSection>
              </div>
            </div>

            <div className="flex h-fit w-full shrink-0 flex-col items-center justify-center gap-2 px-2">
              <Button
                type="submit"
                variant="default"
                size="sm"
                className="w-full"
                leftIcon={<Funnel />}
              >
                Apply Filter
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full hover:bg-black/10"
                leftIcon={<Trash2 />}
                onClick={() => openDialog('clear-tracker-filter')}
              >
                Clear Filters
              </Button>
            </div>
          </Form>
        </RemixFormProvider>
      </aside>
    </>
  );
}
