import { ExternalLink } from 'lucide-react';
import { FaInstagram, FaReddit, FaTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';

import { generateMeta } from '@/lib/generate-meta';

import Image from '@/components/helper/image';
import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';

export function meta() {
  return generateMeta({
    title: 'About',
  });
}

export default function AboutOutlet() {
  return (
    <>
      <Text type="h6" weight="bold" className="w-full pb-3 text-center text-foreground">
        About Bandori-Tales
      </Text>
      <div className="flex w-full items-center justify-center">
        <Image
          alt="Bandori-Tales Logo"
          src="/android-chrome-512x512.png"
          className="mb-3 size-25 drop-shadow-[0px_0px_8px_rgba(253,154,0,0.8)]"
        />
      </div>

      <div className="flex w-full items-start justify-center">
        <Text
          type="p"
          weight="medium"
          lineHeight={6}
          className="w-full text-center text-writing-dark sm:w-[90%] dark:text-writing-light"
        >
          Bandori-Tales is a website designed as gateway to information, tools and fan games about
          BanG Dream! from multiple sources. This website also hosted various features such as Story
          Tracker and Stamp Generator with (hopefully) more will be added in the future.
        </Text>
      </div>

      <div className="flex w-full flex-col gap-3 pt-8">
        <Text type="st1" weight="semibold" lineHeight={6} className="text-left">
          Developer Contact
        </Text>

        <Button
          asChild
          variant="default"
          size="sm"
          leftIcon={<FaReddit />}
          rightIcon={<ExternalLink />}
          className="w-fit"
        >
          <Link
            to="https://www.reddit.com/user/Tezlaivj/"
            target="_blank"
            rel="noopener noreferrer"
          >
            u/Tezlaivj
          </Link>
        </Button>
        <Button
          asChild
          variant="default"
          size="sm"
          leftIcon={<FaInstagram />}
          rightIcon={<ExternalLink />}
          className="w-fit"
        >
          <Link
            to="https://www.instagram.com/bandori.fancam"
            target="_blank"
            rel="noopener noreferrer"
          >
            @bandori.fancam
          </Link>
        </Button>
        <Button
          asChild
          variant="default"
          size="sm"
          leftIcon={<FaTwitter />}
          rightIcon={<ExternalLink />}
          className="w-fit"
        >
          <Link to="https://x.com/BFancam84827" target="_blank" rel="noopener noreferrer">
            @Bandori.Fancam
          </Link>
        </Button>
      </div>
    </>
  );
}
