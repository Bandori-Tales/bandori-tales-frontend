import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

import Image from './image';

export default function SuspenseImage(props: React.ComponentProps<typeof Image>) {
  return (
    <Suspense
      fallback={
        <div className={`${props.className ?? ''} flex items-center justify-center`}>
          <Loader2 className="h-12 w-12 animate-spin text-rose-900 opacity-60" />
        </div>
      }
    >
      <Image {...props} />
    </Suspense>
  );
}
