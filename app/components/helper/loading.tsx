import SuspenseImage from './suspense-image';
import { Text } from './text';

export default function Loading() {
  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-5 bg-linear-to-t from-rose-100 to-background">
      <SuspenseImage
        src="/images/spin_aya.webp"
        alt="Loading Spin"
        className="flex h-62 w-75 animate-spin-y items-center justify-center text-shadow-lg/25 md:h-93 md:w-112.5"
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <Text type="h4" weight="semibold" className="text-rose-600 text-shadow-lg/25">
          Loading...
        </Text>

        <Text type="t" weight="semibold" className="text-mauve-600 text-shadow-lg/25">
          Please Wait For a Moment
        </Text>
      </div>
    </main>
  );
}
