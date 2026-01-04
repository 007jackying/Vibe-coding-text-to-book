import { Theme } from './types';

export const THEMES: Record<Theme, { bg: string; text: string; accent: string; uiBg: string; uiBorder: string }> = {
  [Theme.Light]: {
    bg: 'bg-white',
    text: 'text-gray-900',
    accent: 'text-blue-600',
    uiBg: 'bg-white',
    uiBorder: 'border-gray-200',
  },
  [Theme.Sepia]: {
    bg: 'bg-[#f4ecd8]',
    text: 'text-[#5b4636]',
    accent: 'text-[#8b5e3c]',
    uiBg: 'bg-[#ebdcb2]',
    uiBorder: 'border-[#dcc692]',
  },
  [Theme.Dark]: {
    bg: 'bg-gray-900',
    text: 'text-gray-300',
    accent: 'text-blue-400',
    uiBg: 'bg-gray-800',
    uiBorder: 'border-gray-700',
  },
  [Theme.Midnight]: {
    bg: 'bg-black',
    text: 'text-gray-400',
    accent: 'text-indigo-400',
    uiBg: 'bg-gray-900',
    uiBorder: 'border-gray-800',
  },
};

export const MIN_FONT_SIZE = 14;
export const MAX_FONT_SIZE = 32;
export const DEFAULT_CONTENT = `Paste your book text here to get started, or ask AI to generate a story for you!

Welcome to ZenReader. This application uses modern web technologies to simulate a physical book reading experience.

You can adjust the font size, change the theme, and navigate using your keyboard arrows.`;
