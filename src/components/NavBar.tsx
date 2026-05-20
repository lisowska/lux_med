import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Badge,
  Avatar,
  Box,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import LogoLuxMed from '../assets/LX_logo.90x26.svg';
import Notification from '../assets/inbox.blue.24x24.svg';
import smallLogo from '../assets/faviconLuxMed.ico';

const NAV_ITEMS = ['Start', 'Leczenie', 'Leki', 'Zdrowie'];

const LuxMedLogo = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <Box
      component="img"
      // sx={
      //   {
      //     height: 350,
      //     width: 650,
      //     maxHeight: { xs: 233, md: 350 },
      //     maxWidth: { xs: 350, md: 650 },
      //   }
      // }
      // sx={{
      //   content: {
      //     xs: `url(${smallLogo})`,
      //     md: `url(${LogoLuxMed})`,
      //   },
      // }}
      alt="Przykładowy obrazek."
      src={LogoLuxMed}
      // src={{xs:smallLogo, md:LogoLuxMed}}
    />
  </Box>
);

export default function LuxMedNavbar() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #f0f0f0',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}
      >
        <Toolbar
          sx={{
            minHeight: '64px !important',
            px: { xs: 2, md: 3 },
            gap: 1,
          }}
        >
          {/* Hamburger */}
          <IconButton
            edge="start"
            sx={{ color: '#005aa9', mr: 1 }}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <LuxMedLogo />

          {/* Separator */}
          <Box sx={{ width: '1px', height: 28, bgcolor: '#e0e0e0', mx: 2 }} />

          {/* Nav tabs */}
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            sx={{
              flexGrow: 1,
              minHeight: '64px',
              '& .MuiTabs-indicator': {
                backgroundColor: '#005aa9',
                height: '2px',
                borderRadius: '3px 3px 0 0',
                width: '57,5px',
              },
              '& .MuiTab-root': {
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: '1.0rem',
                textTransform: 'none',
                color: '#555',
                minHeight: '64px',
                px: 2,
                '&.Mui-selected': {
                  color: '#005aa9',
                },
              },
            }}
          >
            {NAV_ITEMS.map((label) => (
              <Tab key={label} label={label} disableRipple />
            ))}
          </Tabs>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ fontSize: '1rem !important' }} />}
              sx={{
                backgroundColor: '#00ac35',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: '1.0rem',
                textTransform: 'none',
                borderRadius: '999px',
                px: 2.5,
                py: 1,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#00ac35',
                  boxShadow: 'none',
                },
              }}
            >
              Umów
            </Button>

            <IconButton sx={{ color: '#555' }} aria-label="powiadomienia">
              <Badge
                badgeContent={16}
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#00ac35',
                    color: '#fff',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.65rem',
                    minWidth: '18px',
                    height: '18px',
                  },
                }}
              >
                <Box
                  component="img"
                  alt="Przykładowy obrazek."
                  src={Notification}
                />
              </Badge>
            </IconButton>

            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: '#fff',
                color: 'black',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: '0.7rem',
                cursor: 'pointer',
                border: '.8px solid #E0E0E0',
              }}
            >
              AL
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
