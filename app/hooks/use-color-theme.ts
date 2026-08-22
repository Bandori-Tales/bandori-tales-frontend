import { useLocation } from 'react-router';

import { type ButtonColorMap, type ColorMap, THEME_CONFIG, type ThemeType } from '@/constants';

export default function useColorTheme(type: 'button'): ButtonColorMap;

export default function useColorTheme(
  type?: 'layout' | 'gradient' | 'page' | 'text' | 'image'
): string;

export default function useColorTheme(type?: ThemeType): ButtonColorMap | string {
  const { pathname } = useLocation();
  const themeType = type ?? 'page';

  const activeMap = THEME_CONFIG[themeType];

  const matchingKey = Object.keys(activeMap).find(
    (key) => key !== 'default' && pathname.includes(key)
  ) as ColorMap | undefined;

  return activeMap[matchingKey ?? 'default'];
}
