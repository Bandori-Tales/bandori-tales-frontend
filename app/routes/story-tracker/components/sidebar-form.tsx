import { itemStorage } from '@/lib/storage';

import CheckboxForm from '@/components/form/checkbox';
import { SelectImage } from '@/components/form/select-image';
import { SelectOrderButton } from '@/components/form/select-order';
import GeneralDialog from '@/components/shared/general-dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import {
  Bands,
  Characters,
  LOCAL_STORAGE_KEY,
  StoryTrackerTagDescription,
  StoryTrackerTranslationDescription,
} from '@/constants';
import { StoryTag, storyTagMap, TranslationType, translationTypeMap } from '@/schemas/models';

import { StoryBadgeColorMaps } from './badges';

export function FilterSettingsSection({
  splitList,
  setSplitList,
}: {
  splitList: boolean;
  setSplitList: (split: boolean) => void;
}) {
  const handleSplitList = (split: boolean) => {
    itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.SETTING_SPLIT_LIST, String(split));
    setSplitList(split);
  };

  return (
    <div className="flex w-full flex-row items-center justify-start gap-1">
      <Switch checked={splitList} onClick={() => handleSplitList(!splitList)} />
      <Label>Split Reading Status</Label>
    </div>
  );
}

export function FilterSort() {
  return (
    <SelectOrderButton
      name="order_by"
      orderDirectionName="order_type"
      items={[
        {
          value: 'chronology',
          label: 'Chronology',
        },
        {
          value: 'release_date',
          label: 'Release Date',
        },
      ]}
    />
  );
}

export function FilterCheckboxes({ items }: { items: { name: string; label: string }[] }) {
  return (
    <>
      {items.map((item) => (
        <CheckboxForm key={`${item.name}_checkbox`} name={item.name} label={item.label} />
      ))}
    </>
  );
}

export function FilterStoryTag() {
  return (
    <SelectImage
      title="Story Tag"
      desciption="Select the tag of the story"
      name="tag"
      items={Object.values(StoryTag).map((tag) => {
        return {
          value: tag,
          label: storyTagMap[tag],
          badge: StoryBadgeColorMaps[tag],
          description: StoryTrackerTagDescription[tag],
        };
      })}
      isBadge
      arrayMode
    />
  );
}

export function FilterTranslationType() {
  return (
    <SelectImage
      title="Translation"
      desciption="Select the available translation of the story"
      name="translation"
      items={Object.values(TranslationType).map((translation) => {
        return {
          value: translation,
          label: translationTypeMap[translation],
          badge: StoryBadgeColorMaps[translation],
          description: StoryTrackerTranslationDescription[translation],
        };
      })}
      isBadge
      arrayMode
      withOperationSwitch
      operationFieldName="translation_operation"
    />
  );
}

export function FilterMainBand() {
  return (
    <SelectImage
      title="Main Band"
      desciption="Select the primary band of the story"
      name="main_band"
      items={Bands.filter((band) => band.displayInTracker === true).map((band) => {
        return {
          label: band.name,
          value: band.id,
          image: band.icon,
        };
      })}
      roundedImage={false}
      arrayMode
    />
  );
}

export function FilterSideBand() {
  return (
    <SelectImage
      title="Side Bands"
      desciption="Select other band that appear in the story"
      name="side_band"
      items={Bands.filter((band) => band.displayInTracker === true && !band.isMixed).map((band) => {
        return {
          label: band.name,
          value: band.id,
          image: band.icon,
        };
      })}
      roundedImage={false}
      arrayMode
      withOperationSwitch
      operationFieldName="side_band_operation"
    />
  );
}

export function FilterMainCharacter() {
  return (
    <SelectImage
      title="Main Characters"
      desciption="Select the primary characters of the story"
      name="side_character"
      items={Characters.map((character) => {
        const name = Array.isArray(character.nickname) ? character.nickname[0] : character.nickname;
        const image = Array.isArray(character.profile_picture)
          ? character.profile_picture[0]
          : character.profile_picture;

        return {
          label: name,
          value: character.id,
          image: image,
        };
      })}
      arrayMode
      withOperationSwitch
      operationFieldName="side_character_operation"
    />
  );
}

export function FilterSideCharacter() {
  return (
    <SelectImage
      title="Side Characters"
      desciption="Select other characters that appear in the story. Even a brief appearance will count"
      name="main_character"
      items={Characters.map((character) => {
        const name = Array.isArray(character.nickname) ? character.nickname[0] : character.nickname;
        const image = Array.isArray(character.profile_picture)
          ? character.profile_picture[0]
          : character.profile_picture;

        return {
          label: name,
          value: character.id,
          image: image,
        };
      })}
      arrayMode
      withOperationSwitch
      operationFieldName="main_character_operation"
    />
  );
}

export function ClearFilterDialog({ reset }: { reset: () => void }) {
  return (
    <GeneralDialog
      dialogKey="clear-tracker-filter"
      title="Clear Filter?"
      description="This action will set filter and sort to the default state"
      onConfirm={reset}
      confirmText="Confirm"
    />
  );
}
