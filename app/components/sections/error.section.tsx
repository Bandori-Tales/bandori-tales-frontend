import { Text } from '../helper/text';

export default function ErrorSection() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4 rounded-md border border-border bg-background p-4 sm:px-8 sm:py-6">
      <Text type="t" weight="bold" className="text-destructive">
        Something went wrong
      </Text>
    </div>
  );
}
