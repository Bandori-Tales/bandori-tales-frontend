import { Edit, LogOut, Plus } from 'lucide-react';
import type { ReactNode } from 'react';

import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';

function ButtonCell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex w-fit flex-col items-center gap-2">
      {children}
      <Text type="btn" weight="semibold">
        {title}
      </Text>
    </div>
  );
}

export function ButtonContent() {
  return (
    <div className="flex w-full flex-col gap-8">
      <Text type="h3" weight="bold">
        Buttons
      </Text>

      <div className="flex w-full flex-row flex-wrap gap-5">
        <ButtonCell title="Loading">
          <Button variant={'default'} colors={'default'} isLoading>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="Disabled">
          <Button variant={'default'} colors={'default'} disabled>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="Left Icon">
          <Button variant={'default'} colors={'default'} leftIcon={<Edit />}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="Right Icon">
          <Button variant={'default'} colors={'default'} rightIcon={<Edit />}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="Left Right Icon">
          <Button variant={'default'} colors={'default'} leftIcon={<Edit />} rightIcon={<LogOut />}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="Size sm">
          <Button variant={'default'} colors={'default'} size={'sm'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="Size lg">
          <Button variant={'default'} colors={'default'} size={'lg'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="Size icon">
          <Button variant={'default'} colors={'default'} size={'icon'}>
            <Plus />
          </Button>
        </ButtonCell>
      </div>

      <div className="flex w-full flex-row flex-wrap gap-5">
        <ButtonCell title="var default col default">
          <Button variant={'default'} colors={'default'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var secondary col default">
          <Button variant={'secondary'} colors={'default'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var outline col default">
          <Button variant={'outline'} colors={'default'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var ghost col default">
          <Button variant={'ghost'} colors={'default'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var link col default">
          <Button variant={'link'} colors={'default'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>
      </div>

      <div className="flex w-full flex-row flex-wrap gap-5">
        <ButtonCell title="var default col destr">
          <Button variant={'default'} colors={'destructive'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var secondary col destr">
          <Button variant={'secondary'} colors={'destructive'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var outline col destr">
          <Button variant={'outline'} colors={'destructive'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var ghost col destr">
          <Button variant={'ghost'} colors={'destructive'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var link col destr">
          <Button variant={'link'} colors={'destructive'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>
      </div>

      <div className="flex w-full flex-row flex-wrap gap-5">
        <ButtonCell title="var default col cyan">
          <Button variant={'default'} colors={'cyan'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var secondary col cyan">
          <Button variant={'secondary'} colors={'cyan'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var outline col cyan">
          <Button variant={'outline'} colors={'cyan'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var ghost col cyan">
          <Button variant={'ghost'} colors={'cyan'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var link col cyan">
          <Button variant={'link'} colors={'cyan'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>
      </div>

      <div className="flex w-full flex-row flex-wrap gap-5">
        <ButtonCell title="var default col amber">
          <Button variant={'default'} colors={'amber'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var secondary col amber">
          <Button variant={'secondary'} colors={'amber'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var outline col amber">
          <Button variant={'outline'} colors={'amber'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var ghost col amber">
          <Button variant={'ghost'} colors={'amber'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>

        <ButtonCell title="var link col amber">
          <Button variant={'link'} colors={'amber'}>
            {' '}
            Click Me{' '}
          </Button>
        </ButtonCell>
      </div>
    </div>
  );
}
