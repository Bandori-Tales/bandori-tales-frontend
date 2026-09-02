import { Badge, type BadgeProps } from '@/components/ui/badge';

import {
  type IStoryTag,
  type ITranslationType,
  storyTagMap,
  translationTypeMap,
} from '@/schemas/models';

export const StoryBadgeColorMaps: Record<string, BadgeProps> = {
  EXPLORATION: {
    textColor: 'text-cyan-100',
    background: 'bg-cyan-700',
    border: 'border-cyan-900',
  },
  FILLER: {
    textColor: 'text-yellow-800',
    background: 'bg-yellow-300',
    border: 'border-yellow-900',
  },
  RELEVANT: {
    textColor: 'text-teal-100',
    background: 'bg-teal-700',
    border: 'border-teal-900',
  },
  MAJOR: {
    textColor: 'text-red-100',
    background: 'bg-red-600',
    border: 'border-red-900',
  },
  COLLAB: {
    textColor: 'text-violet-100',
    background: 'bg-violet-700',
    border: 'border-violet-900',
  },
  NOTCANON: {
    textColor: 'text-slate-100',
    background: 'bg-slate-700',
    border: 'border-slate-900',
  },
  OFFICIAL: {
    textColor: 'text-white',
    background: 'bg-emerald-600',
    border: 'border-emerald-800',
  },
  FAN: {
    textColor: 'text-white',
    background: 'bg-sky-600',
    border: 'border-sky-800',
  },
  NONE: {
    textColor: 'text-white',
    background: 'bg-slate-600',
    border: 'border-slate-800',
  },
};

export function StoryBadge({
  badge,
  type,
}: {
  badge: IStoryTag | ITranslationType;
  type: 'story' | 'translation';
}) {
  return (
    <Badge
      title={
        type === 'story'
          ? storyTagMap[badge as IStoryTag]
          : translationTypeMap[badge as ITranslationType]
      }
      textColor={StoryBadgeColorMaps[badge].textColor}
      background={StoryBadgeColorMaps[badge].background}
      border={StoryBadgeColorMaps[badge].border}
    />
  );
}
