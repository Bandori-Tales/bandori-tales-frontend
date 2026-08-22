import type { ReactNode } from 'react';

import { Text } from '@/components/helper/text';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

function InputCell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex w-fit flex-col items-center gap-2">
      {children}
      <Text type="btn" weight="semibold">
        {title}
      </Text>
    </div>
  );
}

export function InputContent() {
  return (
    <div className="my-12 flex w-full flex-col gap-8">
      <Text type="h3" weight="bold">
        Inputs
      </Text>

      <div className="flex w-full flex-row flex-wrap gap-5">
        <InputCell title="default">
          <Input type="text" placeholder="placeholder" name="username" />
        </InputCell>

        <InputCell title="password">
          <Input type="password" placeholder="placeholder" name="password1" />
        </InputCell>

        <InputCell title="password with eye">
          <PasswordInput type="password" placeholder="placeholder" name="password" />
        </InputCell>
      </div>
    </div>
  );
}
