import { Home } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

import Image from '../helper/image';
import { Text } from '../helper/text';
import { Button } from '../ui/button';

type ErrorPageProps = {
  descTitle: string | ReactNode;
  descSub?: string | ReactNode;
  statusCode: number;
};

export function BackToHomeButton() {
  return (
    <Button
      asChild
      leftIcon={<Home className="mb-0.5" />}
      className="flex w-fit rounded-md"
      variant="default"
      colors="cyan"
    >
      <Link to="/" replace>
        Back to Home
      </Link>
    </Button>
  );
}

export default function ErrorPage({ descTitle, descSub, statusCode }: ErrorPageProps) {
  return (
    <main className="relative h-screen w-full overflow-hidden px-8 py-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <Text type="h2" weight="extrabold" className="text-destructive">
          Error {statusCode}
        </Text>

        <Image alt="Dummy Coming Soon" src="images/coming_soon.webp" className="w-64" />

        <div className="flex flex-col items-center justify-center gap-5">
          <Text type="h3" className="font-semibold text-primary">
            {descTitle}
          </Text>

          {descSub && (
            <Text type="p" className="font-medium text-foregorund/80">
              {descSub}
            </Text>
          )}
        </div>

        {BackToHomeButton()}
      </div>
    </main>
  );
}
