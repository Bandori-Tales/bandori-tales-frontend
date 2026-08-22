import type { ReactNode } from 'react';

import { Text } from '@/components/helper/text';
import { Textarea } from '@/components/ui/textarea';

function TextareaCell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex w-fit flex-col items-center gap-2">
      {children}
      <Text type="btn" weight="semibold">
        {title}
      </Text>
    </div>
  );
}

export function TextareaContent() {
  return (
    <div className="my-12 flex w-full flex-col gap-8">
      <Text type="h3" weight="bold">
        Text Area
      </Text>

      <div className="flex w-full flex-row flex-wrap gap-5">
        <TextareaCell title="default">
          <Textarea placeholder="placeholder" name="blog_content" />
        </TextareaCell>

        <TextareaCell title="static size">
          <Textarea placeholder="placeholder" name="blog_content" className="resize-none" />
        </TextareaCell>
      </div>
    </div>
  );
}
