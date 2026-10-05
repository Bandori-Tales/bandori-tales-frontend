import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

import { YUNO_CHAT_THEMES_ARRAY, type YunoChatThemes, YunoThemeMap } from '@/constants';

export function ChatThemeSelector({
  selectedTheme,
  setUserTheme,
}: {
  selectedTheme: YunoChatThemes;
  setUserTheme: (theme: YunoChatThemes) => void;
}) {
  return (
    <div className="grid h-fit w-full grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-4">
      {(YUNO_CHAT_THEMES_ARRAY as readonly string[]).map((themeColor) => {
        const isThemeSelected = themeColor === selectedTheme;

        return (
          <Button
            key={`theme_${themeColor}_selector`}
            variant="ghost"
            size="icon"
            className="col-span-1 [&_svg]:size-6"
            onClick={() => setUserTheme(themeColor as YunoChatThemes)}
            disabled={isThemeSelected}
          >
            <div
              className={cn(
                YunoThemeMap[themeColor as YunoChatThemes].background_primary,
                YunoThemeMap[themeColor as YunoChatThemes].outline,
                'block aspect-square w-9 rounded-full outline-2'
              )}
            >
              <div
                className={cn(
                  'flex h-full w-full items-center justify-center rounded-full bg-none',
                  isThemeSelected ? 'bg-black/20' : 'hover:bg-black/25'
                )}
              >
                <Check
                  className={cn('stroke-3 text-white', isThemeSelected ? 'block' : 'hidden')}
                />
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
