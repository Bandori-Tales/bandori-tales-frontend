import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';

export function ToastContent() {
  return (
    <div className="my-12 flex w-full flex-col gap-8">
      <Text type="h3" weight="bold">
        Toasts
      </Text>

      <div className="flex w-full flex-row flex-wrap gap-5">
        <Button variant="default" colors="cyan" onClick={() => toast.success('Success Text', 3000)}>
          {' '}
          Success{' '}
        </Button>
        <Button
          variant="default"
          colors="amber"
          onClick={() => toast.warning('Warning Text', 3000)}
        >
          {' '}
          Warning{' '}
        </Button>
        <Button
          variant="default"
          colors="destructive"
          onClick={() => toast.error('Destructive Text', 3000)}
        >
          {' '}
          Destructive{' '}
        </Button>
      </div>
    </div>
  );
}
