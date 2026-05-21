import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Econsultation from '../assets/e-consultations.24x24.svg';
import Files from '../assets/files.16x16.svg';
import Inbox from '../assets/inbox.blue.24x24.svg';
import Packet from '../assets/packet.svg';
import Referrar from '../assets/referral.24x24.svg';
import Stomatolgia from '../assets/stomatology.24x24.svg';
import Wykres from '../assets/wykres.16x16.svg';
import Arrow from '../assets/arrow-up-right.grey.16x16.svg';
import Header from './Header';

const TILES = [
  {
    id: 'wizyty',
    label: 'Wizyty',
    icon: Econsultation,
  },
  {
    id: 'konsultacje',
    label: 'Konsultacje\nonline',
    icon: Econsultation,
  },
  {
    id: 'skierowania',
    label: 'Skierowania',
    icon: Referrar,
  },
  {
    id: 'stomatologia',
    label: 'Stomatologia',
    icon: Stomatolgia,
  },
  {
    id: 'badania',
    label: 'Badania',
    icon: Wykres,
  },
  {
    id: 'pakiet',
    label: 'Pakiet\nmedyczny',
    icon: Packet,
  },
  {
    id: 'pliki',
    label: 'Twoje pliki',
    icon: Files,
  },
];

const TABLE_COLUMNS = [
  'Data i godzina',
  'Placówka',
  'Specjalność',
  'Lekarz',
  'Typ',
  'Forma wizyty',
  'Status',
  'Akcje',
];

export default function AppointmentsSection() {
  const [activeId, setActiveId] = useState('wizyty');

  return (
    <Box
      sx={{
        // bgcolor: '#f0f4f8',
        // bgcolor: 'whihte',
        bgcolor: '#F7F9FB',
        // minHeight: '100vh',
        // px: { xs: 2, md: 4 },
        py: 4,
        fontFamily: "'Montserrat', sans-serif",
        maxWidth: { xs: '64rem', lg: '70rem', xl: '80rem' },
        mx: 'auto',
        width: '100%',
        px: { xs: 2, md: 3 },
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Header />
      {/* Tiles row */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          mb: 4,
        }}
      >
        {TILES.map((tile) => {
          const isActive = tile.id === activeId;
          return (
            <Paper
              key={tile.id}
              onClick={() => setActiveId(tile.id)}
              elevation={0}
              sx={{
                position: 'relative',
                width: 80,
                height: 80,
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                cursor: 'pointer',
                bgcolor: '#fff',
                // bgcolor: isActive ? '#1a56a0' : '#fff',
                border: isActive
                  ? '2px solid #1a56a0'
                  : '2px solid transparent',
                transition: 'all 0.18s ease',
                '&:hover': {
                  border: '2px solid #1a56a0',
                  boxShadow: '0 4px 16px rgba(26,86,160,0.12)',
                },
              }}
            >
              {/* Arrow icon top-right */}
              <img
                src={Arrow}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  fontSize: 14,
                  color: isActive ? 'rgba(255,255,255,0.7)' : '#b0bec5',
                }}
              />

              {/* Main icon */}
              <img
                src={tile.icon}
                alt={tile.label}
                style={{
                  width: 24,
                  height: 24,
                  //   filter: isActive ? 'brightness(0) invert(1)' : 'none',
                }}
              />
              {/* Label */}
              <Typography
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.65rem',
                  //   color: isActive ? '#fff' : '#1a56a0',
                  color: '#1a56a0',
                  textAlign: 'center',
                  lineHeight: 1.2,
                  whiteSpace: 'pre-line',
                  px: 1,
                  height: 32,
                }}
              >
                {tile.label}
              </Typography>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}
