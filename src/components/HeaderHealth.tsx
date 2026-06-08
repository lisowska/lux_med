import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

import LuxMed from '../assets/historia.png';

const HeaderHealth = () => {
  return (
    <Box
      sx={{
        maxWidth: { md: 920 },
        position: 'relative',
        color: 'black',
        background: 'white',
        mt: '20px',
        mx: 'auto',
        width: '100%',
        px: { xs: 2, md: 2 },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={{ md: 3 }}
          sx={{
            mb: { xs: 1, md: 2 },
            mt: { xs: 3, md: 2 },
            py: { md: 2 },
          }}
        >
          <Box
            component="img"
            src={LuxMed}
            alt="Ilustracja historii leczenia"
            sx={{
              display: { xs: 'none', md: 'block' },
              width: { md: 300 },
              height: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              flexShrink: 0,
              imageRendering: 'auto',
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0, pl: { md: 2 } }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 1.5,
                fontSize: { xs: '0.9rem', md: '1.5rem' },
              }}
            >
              Historia leczenia
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{
                color: 'grey',
                lineHeight: 1.6,
                fontSize: { xs: '0.75rem', md: '0.95rem' },
                maxWidth: 340,
              }}
            >
              Przeszukuj i filtruj swoje wizyty, badania, teleporady w jednym
              miejscu
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeaderHealth;
