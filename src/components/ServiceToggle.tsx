import React from 'react';
import { Box, Typography, SxProps, Theme } from '@mui/material';
import { focusVisibleRing, focusVisibleRingOnDark } from '../styles/focus';

export type ServiceTab = 'zaplanowane' | 'zrealizowane';

interface ServiceToggleProps {
  value: ServiceTab;
  onChange: (value: ServiceTab) => void;
}

const TAB_ACTIVE_BG = '#005AA9';
const TAB_ACTIVE_BORDER = '#005AA9';
const TAB_INACTIVE_COLOR = '#004078';
const TAB_HOVER_BG = '#004C8E';
const TAB_HOVER_BORDER = '#004C8E';
const TAB_PRESSED_BG = '#004078';
const TAB_PRESSED_BORDER = '#004078';

const tabSx = (isActive: boolean): SxProps<Theme> => ({
  flex: 1,
  px: { xs: 2.5, md: 5 },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  py: 1.25,
  borderRadius: 999,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
  border: 'none',
  backgroundColor: isActive ? TAB_ACTIVE_BG : 'transparent',
  color: isActive ? '#FFFFFF' : TAB_INACTIVE_COLOR,
  '&:hover': {
    backgroundColor: isActive ? TAB_HOVER_BG : '#F8FAFC',
    color: isActive ? '#FFFFFF' : TAB_INACTIVE_COLOR,
  },
  '&:active': {
    backgroundColor: isActive ? TAB_PRESSED_BG : '#F1F5F9',
    color: isActive ? '#FFFFFF' : TAB_INACTIVE_COLOR,
  },
  ...(isActive ? focusVisibleRingOnDark : focusVisibleRing),
});

const labelSx: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: { xs: 13, sm: 14 },
  whiteSpace: 'nowrap',
  color: 'inherit',
  textAlign: 'center',
};

const ServiceToggle: React.FC<ServiceToggleProps> = ({ value, onChange }) => {
  const handleTabKeyDown = (tab: ServiceTab, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(tab);
      return;
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      onChange(tab === 'zaplanowane' ? 'zrealizowane' : 'zaplanowane');
    }
  };

  return (
    <Box
      role="tablist"
      aria-label="Filtruj wizyty według statusu"
      sx={{
        width: { xs: '100%', md: 520 },
        display: 'inline-flex',
        backgroundColor: '#fff',
        borderRadius: 999,
        border: '1px solid #E2E8F0',
      }}
    >
      <Box
        role="tab"
        id="service-tab-zaplanowane"
        aria-selected={value === 'zaplanowane'}
        tabIndex={value === 'zaplanowane' ? 0 : -1}
        onClick={() => onChange('zaplanowane')}
        onKeyDown={(e) => handleTabKeyDown('zaplanowane', e)}
        sx={tabSx(value === 'zaplanowane')}
      >
        <Typography sx={labelSx}>Zaplanowane</Typography>
      </Box>
      <Box
        role="tab"
        id="service-tab-zrealizowane"
        aria-selected={value === 'zrealizowane'}
        tabIndex={value === 'zrealizowane' ? 0 : -1}
        onClick={() => onChange('zrealizowane')}
        onKeyDown={(e) => handleTabKeyDown('zrealizowane', e)}
        sx={tabSx(value === 'zrealizowane')}
      >
        <Typography sx={labelSx}>Zrealizowane</Typography>
      </Box>
    </Box>
  );
};

export default ServiceToggle;
