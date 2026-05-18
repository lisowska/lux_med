import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import MainPage from './components/MainPage';
import type { Agency, MissionStatus, MissionType } from './types/mission';

export interface FilterState {
  search: string;
  agencies: Agency[];
  statuses: MissionStatus[];
  missionTypes: MissionType[];
  favoritesOnly: boolean;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#0074E4',
      light: '#17A2E8',
      dark: '#162B47',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8B5CF6',
      light: '#A78BFA',
      dark: '#7C3AED',
      contrastText: '#FFFFFF',
    },

    // === STATUS COLORS ===
    success: {
      main: '#16A34A',
      light: '#10B981',
      dark: '#15803D',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#DC2626',
      light: '#EF4444', // Lighter red
      dark: '#B91C1C',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F59E0B', // Amber (Planned status)
      light: '#FBBF24',
      dark: '#D97706',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#06B6D4', // Cyan (Ongoing / Space Station)
      light: '#22D3EE',
      dark: '#0891B2',
      contrastText: '#FFFFFF',
    },

    // === BACKGROUND & SURFACES ===
    background: {
      default: '#F7F9FB', // Light blue-grey (210 50% 98%)
      paper: '#FFFFFF', // Cards, popovers
    },
    // === TEXT COLORS ===
    text: {
      primary: '#0F1C2E', // Foreground (215 60% 16%)
      secondary: '#36537D', // Muted-foreground (215 40% 35%)
      disabled: '#94A3B8',
    },

    // === NEUTRAL / BORDERS ===
    divider: '#C7D2DD', // Border/Muted (210 30% 85%)
    // === MISSION TYPE COLORS (custom) ===
    missionTypes: {
      orbital: '#0EA5E9', // Sky Blue
      lunar: '#A78BFA', // Purple
      mars: '#F97316', // Orange
      deepSpace: '#8B5CF6', // Violet
      spaceStation: '#06B6D4', // Cyan
      satellite: '#10B981', // Emerald
    },
    // === GRADIENTS (custom) ===
    gradients: {
      header: 'linear-gradient(135deg, #16294A 0%, #17A2E8 100%)',
      card: 'linear-gradient(135deg, #0059B3 0%, #17A2E8 100%)',
      navy: 'linear-gradient(135deg, #1E3A5F 0%, #152238 100%)',
    },

    grey: {
      50: '#F7F9FB',
      100: '#E8EDF2',
      200: '#C7D2DD',
      300: '#9FB3C7',
      400: '#6B8299',
      500: '#4B6478',
      600: '#354B60',
      700: '#1E3A5F',
      800: '#162B47',
      900: '#0F1C2E',
    },
  },

  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
