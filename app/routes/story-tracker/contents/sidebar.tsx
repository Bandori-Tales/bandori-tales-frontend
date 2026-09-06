import { valibotResolver } from '@hookform/resolvers/valibot';
import { ChevronDown, Funnel, Trash2, X } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { Form, useLoaderData, useRevalidator, useSubmit } from 'react-router';
import { RemixFormProvider, useRemixForm } from 'remix-hook-form';

import useDialogStore from '@/hooks/store/use-dialog';
import { cn } from '@/lib/utils';

import CheckboxForm from '@/components/form/checkbox';
import InputForm from '@/components/form/input';
import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import { DIALOG_KEY, StoryTrackerCheckboxList, StoryTrackerDefaultValue } from '@/constants';
import {
  type BandoriStoryForm,
  BandoriStoryFormSchema,
  type TrackerSetting,
} from '@/schemas/models';

import type { clientLoader } from '..';
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
  settings: TrackerSetting;
  handleSettingsUpdate: (
    data: boolean,
    type: 'split-list' | 'show-unread' | 'show-skipped' | 'show-finished'
  ) => void;
}

interface SidebarFilterSectionProps {
  title: string;
  fullWidth?: boolean;
  isCollapsible?: boolean;
  withEnableCheckbox?: boolean;
  sectionCheckboxFieldName?: string;
  children: ReactNode;
}

function SidebarFilterSection({
  title,
  fullWidth,
  isCollapsible,
  withEnableCheckbox = false,
  sectionCheckboxFieldName,
  children,
}: SidebarFilterSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        'group flex w-full flex-col gap-1 rounded-md p-1 transition-all duration-300',
        isCollapsible ? 'hover:cursor-pointer' : 'hover:cursor-default'
      )}
    >
      {isCollapsible ? (
        <div className="flex w-full flex-row items-center justify-start gap-1.5 p-0">
          {withEnableCheckbox && sectionCheckboxFieldName && (
            <CheckboxForm name={sectionCheckboxFieldName} />
          )}
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
        </div>
      ) : (
        <div className="flex w-full flex-row items-center justify-start">
          {withEnableCheckbox && sectionCheckboxFieldName && (
            <CheckboxForm name={sectionCheckboxFieldName} />
          )}
          <Text type="btn" weight="semibold" lineHeight={5} className="text-nowrap text-primary">
            {title}
          </Text>
        </div>
      )}
      <CollapsibleContent
        className={cn(
          fullWidth ? 'px-0' : 'pl-6',
          'data-[state=closed]:slide-out-to-top-10 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-top-10 data-[state=open]:fade-in-0 pt-1 data-[state=closed]:animate-out data-[state=open]:animate-in'
        )}
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function StoryTrackerSidebar({ settings, handleSettingsUpdate }: StoryTrackerSidebarProps) {
  const { userTrackFilter } = useLoaderData<typeof clientLoader>();

  const [isExpand, setIsExpand] = useState(false);
  const { open: openDialog } = useDialogStore();
  const revalidator = useRevalidator();

  const submit = useSubmit();
  const methods = useRemixForm<BandoriStoryForm>({
    mode: 'onBlur',
    defaultValues: userTrackFilter || StoryTrackerDefaultValue,
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
          'fixed top-36 right-3 z-20 rounded-full border-2 border-primary bg-white drop-shadow-black/20 drop-shadow-sm lg:top-16 [&_svg]:size-6 lg:[&_svg]:size-5'
        )}
        onClick={handleShowSidebar}
      >
        <Funnel className="stroke-2 text-primary" />
      </Button>

      <aside
        className={cn(
          'fixed top-0 flex h-full w-75 flex-col items-center justify-start border-l border-l-primary bg-white pt-3 pb-2 transition-all duration-300 lg:pt-16',
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
            <div className="flex h-full w-full flex-col items-center justify-start gap-2 overflow-y-scroll border-b border-b-primary px-2 pb-3">
              <Text
                type="st1"
                weight="bold"
                className="w-full border-b border-b-primary px-1 pb-4 text-center text-primary"
              >
                Story Tracker
              </Text>

              <div className="flex h-full w-full flex-col items-center justify-start gap-3 overflow-scroll px-1">
                <SidebarFilterSection title="Search" fullWidth>
                  <InputForm type="text" name="search" placeholder="search" />
                </SidebarFilterSection>

                <SidebarFilterSection title="Settings" isCollapsible>
                  <FilterSettingsSection settings={settings} handleUpdate={handleSettingsUpdate} />
                </SidebarFilterSection>

                <SidebarFilterSection
                  title="Category"
                  isCollapsible
                  withEnableCheckbox
                  sectionCheckboxFieldName="enable_category"
                >
                  <FilterCheckboxes items={StoryTrackerCheckboxList.category} />
                </SidebarFilterSection>

                <SidebarFilterSection
                  title="Type"
                  isCollapsible
                  withEnableCheckbox
                  sectionCheckboxFieldName="enable_type"
                >
                  <FilterCheckboxes items={StoryTrackerCheckboxList.type} />
                </SidebarFilterSection>

                <SidebarFilterSection
                  title="Tag"
                  isCollapsible
                  withEnableCheckbox
                  sectionCheckboxFieldName="enable_tag"
                >
                  <FilterStoryTag />
                </SidebarFilterSection>

                <SidebarFilterSection
                  title="Translation"
                  isCollapsible
                  withEnableCheckbox
                  sectionCheckboxFieldName="enable_translation"
                >
                  <FilterTranslationType />
                </SidebarFilterSection>

                <SidebarFilterSection
                  title="Main Band"
                  isCollapsible
                  withEnableCheckbox
                  sectionCheckboxFieldName="enable_main_band"
                >
                  <FilterMainBand />
                </SidebarFilterSection>

                <SidebarFilterSection
                  title="Side Bands"
                  isCollapsible
                  withEnableCheckbox
                  sectionCheckboxFieldName="enable_side_band"
                >
                  <FilterSideBand />
                </SidebarFilterSection>

                <SidebarFilterSection
                  title="Main Characters"
                  isCollapsible
                  withEnableCheckbox
                  sectionCheckboxFieldName="enable_main_character"
                >
                  <FilterMainCharacter />
                </SidebarFilterSection>

                <SidebarFilterSection
                  title="Side Characters"
                  isCollapsible
                  withEnableCheckbox
                  sectionCheckboxFieldName="enable_side_character"
                >
                  <FilterSideCharacter />
                </SidebarFilterSection>

                <SidebarFilterSection title="Sort" isCollapsible fullWidth>
                  <FilterSort />
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
                onClick={() => openDialog(DIALOG_KEY.STORY_TRACKER.CLEAR_FILTER)}
              >
                Clear Filter
              </Button>
            </div>
          </Form>
        </RemixFormProvider>
      </aside>
    </>
  );
}
