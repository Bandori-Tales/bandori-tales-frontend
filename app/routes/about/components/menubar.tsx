import { NavLink } from 'react-router';

import { cn } from '@/lib/utils';

import { Text } from '@/components/helper/text';

import { AboutMenuItems } from '@/constants';

export function AboutMenubar() {
  return (
    <div className="flex max-w-full flex-row overflow-x-auto rounded-sm rounded-b-none border border-border border-b-0 bg-white dark:bg-mauve-800">
      {AboutMenuItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.isEnd}
            className={({ isActive }) =>
              cn(
                isActive ? 'text-secondary' : 'text-foreground-lighter',
                'group px-3 pt-2 pb-3 transition-colors hover:bg-black/5 hover:text-secondary/90 sm:pb-2 dark:hover:bg-white/5'
              )
            }
          >
            <Text
              type="btn"
              weight="semibold"
              className="flex flex-row items-center justify-center gap-1 text-nowrap"
            >
              <Icon className="size-5 stroke-2 text-inherit" />
              {item.label}
            </Text>
          </NavLink>
        );
      })}
    </div>
  );
}
