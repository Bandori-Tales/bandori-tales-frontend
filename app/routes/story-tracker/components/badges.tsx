import { Badge } from '@/components/ui/badge';

import { StoryBadgeColorMap } from '@/constants';
import {
  type IStoryTag,
  type ITranslationType,
  storyTagMap,
  translationTypeMap,
} from '@/schemas/models';

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
      textColor={StoryBadgeColorMap[badge].textColor}
      background={StoryBadgeColorMap[badge].background}
      border={StoryBadgeColorMap[badge].border}
    />
  );
}
