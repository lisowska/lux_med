import React from 'react';
import { Box, Typography } from '@mui/material';

export type ServiceTab = 'zaplanowane' | 'zrealizowane';

interface ServiceToggleProps {
  value: ServiceTab;
  onChange: (value: ServiceTab) => void;
}

const ServiceToggle: React.FC<ServiceToggleProps> = ({ value, onChange }) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        backgroundColor: '#F1F5F9',
        borderRadius: 999,
        p: 0.5,
      }}
    >
      <Box
        onClick={() => onChange('zaplanowane')}
        sx={{
          px: { xs: 2.5, sm: 4 },
          py: 1.25,
          borderRadius: 999,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backgroundColor: value === 'zaplanowane' ? '#002677' : 'transparent',
          '&:hover': {
            backgroundColor: value === 'zaplanowane' ? '#002677' : '#E2E8F0',
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: 13, sm: 14 },
            color: value === 'zaplanowane' ? '#FFFFFF' : '#64748B',
            whiteSpace: 'nowrap',
          }}
        >
          Zaplanowane uslugi
        </Typography>
      </Box>
      <Box
        onClick={() => onChange('zrealizowane')}
        sx={{
          px: { xs: 2.5, sm: 4 },
          py: 1.25,
          borderRadius: 999,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backgroundColor: value === 'zrealizowane' ? '#002677' : 'transparent',
          '&:hover': {
            backgroundColor: value === 'zrealizowane' ? '#002677' : '#E2E8F0',
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: 13, sm: 14 },
            color: value === 'zrealizowane' ? '#FFFFFF' : '#64748B',
            whiteSpace: 'nowrap',
          }}
        >
          Zrealizowane uslugi
        </Typography>
      </Box>
    </Box>
  );
};

export default ServiceToggle;
