import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

import LuxMed from '../assets/LUXMED.svg';

const HeaderHealth = () => {
  return (
    <Box
      sx={{
        maxWidth: { xs: '64rem', lg: '70rem', xl: '80rem' },
        position: 'relative',
        color: 'black',
        // padding: { xs: '1rem 1rem', md: '1rem 1rem' },
        overflow: 'hidden',
        background: 'white',
        mt: '20px',
        mx: 'auto',
        width: '100%',
        px: { xs: 2, md: 3 },
        // maxHeight: '200px',
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          maxHeight="265px"
          sx={{
            mb: { xs: 1, md: 2 },
            ml: { xs: 1, md: 7 },
            mr: { xs: 1, md: 7 },
            mt: { xs: 3 },
            my: '50px',
          }}
        >
          <Box
            component="img"
            sx={{
              height: 350,
              width: 650,
              maxHeight: { xs: 150, md: 220 },
              maxWidth: { xs: 210, md: 650 },
            }}
            alt="Przykładowy obrazek."
            src={LuxMed}
          />
          <Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 1.5, // Margines dolny oddzielający od paragrafu
                fontSize: { xs: '0.9rem', md: 'rem' },
              }}
            >
              Historia leczenia
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{
                color: 'grey', // Szary kolor tekstu, jak na obrazku
                lineHeight: 1.6, // Odpowiednia interlinia
                fontSize: { xs: '0.75rem', md: '0.9rem' },
              }}
            >
              Przeszukuj i filtruj swoje wizyty, badania, teleporady w jednym
              miejscu
            </Typography>
            {/* 
            <Box display="flex" alignItems="center" justifyContent="flex-start"> */}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeaderHealth;
