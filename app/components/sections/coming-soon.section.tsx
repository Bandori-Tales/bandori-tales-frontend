import { cn } from '@/lib/utils';

import { BackToHomeButton } from '../error/error-page';
import Image from '../helper/image';
import { Text } from '../helper/text';

export default function ComingSoon() {
  return (
    <section className="relative overflow-hidden">
      <main
        className={cn(
          'flex flex-col items-center justify-center bg-linear-to-t from-rose-100 to-mauve-300',
          'relative h-screen'
        )}
      >
        <div className="flex flex-col items-center justify-center pb-12">
          <Text type="h2" className="mb-10 w-87.5 text-center md:w-full" weight="bold">
            Coming Soon
          </Text>

          <Image alt="Dummy Coming Soon" src="images/coming_soon.webp" className="w-64" />

          <Text
            className="my-6 w-87.5 text-center text-primary text-sm sm:w-125 sm:text-base md:w-full"
            weight="medium"
          >
            The page is still being cooked in the kitchen, please wait patiently...
          </Text>
          <BackToHomeButton />
        </div>
      </main>
    </section>
  );
}
