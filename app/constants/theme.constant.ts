export type ColorMap = 'default' | 'light-mode' | 'dark-mode';
export type ButtonColorMap = 'logo-blue' | 'light-mode-green' | 'dark-mode-purple';
export type ThemeType = 'layout' | 'gradient' | 'page' | 'text' | 'image' | 'button';

export const THEME_CONFIG = {
  page: {
    default: 'bg-blue-50',
    'light-mode': 'bg-green-50',
    'dark-mode': 'bg-purple-50',
  } satisfies Record<ColorMap, string>,
  button: {
    default: 'logo-blue',
    'light-mode': 'light-mode-green',
    'dark-mode': 'dark-mode-purple',
  } satisfies Record<ColorMap, ButtonColorMap>,
  layout: {
    default: 'bg-logo-blue text-logo-blue',
    'light-mode': 'bg-light-mode-green text-light-mode-green',
    'dark-mode': 'bg-dark-mode-purple text-dark-mode-purple',
  } satisfies Record<ColorMap, string>,
  text: {
    default: 'text-logo-blue border-logo-blue',
    'light-mode': 'text-light-mode-green border-light-mode-green',
    'dark-mode': 'text-dark-mode-purple border-dark-mode-purple',
  } satisfies Record<ColorMap, string>,
  image: {
    default: 'before:bg-gradient-to-t before:from-logo-blue before:to-black/0',
    'light-mode': 'before:bg-gradient-to-t before:from-green-950 before:to-black/0',
    'dark-mode': 'before:bg-gradient-to-t before:from-purple-950 before:to-black/0',
  } satisfies Record<ColorMap, string>,
  gradient: {
    default: 'bg-gradient-to-b from-logo-light-blue to-logo-blue',
    'light-mode': 'bg-gradient-to-r from-gradient-green-start to-gradient-green-stop',
    'dark-mode': 'bg-gradient-to-b from-gradient-purple-start to-gradient-purple-stop',
  } satisfies Record<ColorMap, string>,
};
