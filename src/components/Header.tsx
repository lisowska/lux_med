import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PublicIcon from '@mui/icons-material/Public';
import { Avatar } from '@mui/material';
import logo from '../assets/nasa-logo.svg';

const Header = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        color: 'white',
        padding: { xs: '1rem 1rem', md: '2rem 2rem' },
        overflow: 'hidden',
        background:
          'linear-gradient(135deg, #16294A 0%, #0059B3 50%, #17A2E8 100%)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          sx={{
            mb: { xs: 1, md: 2 },
            ml: { xs: 3, md: 7 },
            mr: 7,
            mt: { xs: 3 },
          }}
        >
          <Box>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '1.7rem', md: '3rem' },
                fontWeight: 700,
                flex: 1,
                pb: { xs: 1 },
              }}
            >
              SPACE MISSIONS
            </Typography>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontSize: { xs: '1rem', md: '1.8rem' },
                fontWeight: 700,
                flex: 1,
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              Explore humanity's greatest journeys beyond Earth.
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Box display="flex" alignItems="center">
                <TravelExploreIcon
                  sx={{
                    fontSize: {
                      xs: '1rem',
                      md: '1.5rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                    },
                  }}
                  aria-hidden="true"
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.7rem', md: '0.9rem' },
                    ml: 3,
                    mr: 3,
                    opacity: 0.95,
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  EARTH
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  maxWidth: '150px',
                  height: '1px',
                  background: (theme) => `linear-gradient(to right, 
      transparent, ${theme.palette.text.disabled}66, transparent)`,
                }}
              />
              <p>→→→</p>
              <Box
                sx={{
                  flex: 1,
                  maxWidth: '150px',
                  height: '1px',
                  background: (theme) => `linear-gradient(to right, 
      transparent, 
      ${theme.palette.text.disabled}66, 
      transparent
    )`,
                }}
              />
              <Box display="flex" alignItems="center">
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.7rem', md: '0.9rem' },
                    ml: 3,
                    mr: 3,
                    opacity: 0.95,
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  BEYOND
                </Typography>
                <PublicIcon
                  sx={{
                    fontSize: {
                      xs: '1rem',
                      md: '1.5rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                    },
                  }}
                  aria-hidden="true"
                />
              </Box>
            </Box>
          </Box>

          <AutoAwesomeIcon
            sx={{ fontSize: { xs: '1rem', md: '2rem' } }}
            aria-hidden="true"
          />
          <Avatar
            alt="NASA logo"
            src={logo}
            sx={{ width: { xs: 65, md: 95 }, height: { xs: 65, md: 95 } }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Header;
