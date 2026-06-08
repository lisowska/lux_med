import type { SxProps, Theme } from '@mui/material';

export const FOCUS_RING_COLOR = '#005AA9';

/** Widoczny obrys tylko przy nawigacji klawiaturą — bez zmiany wyglądu przy kliku myszką */
export const focusVisibleRing: SxProps<Theme> = {
  '&:focus': { outline: 'none' },
  '&:focus-visible': {
    outline: `2px solid ${FOCUS_RING_COLOR}`,
    outlineOffset: 2,
  },
};

export const focusVisibleRingOnDark: SxProps<Theme> = {
  '&:focus': { outline: 'none' },
  '&:focus-visible': {
    outline: '2px solid #FFFFFF',
    outlineOffset: 2,
  },
};
