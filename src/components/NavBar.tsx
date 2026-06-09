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
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import LogoLuxMed from '../assets/LX_logo.90x26.svg';
import LogoLuxMedMobile from '../assets/luxmedLogoMobile.32x32.svg';
import Notification from '../assets/inbox.blue.24x24.svg';
import IconStart from '../assets/start.grey.24x24.svg';
import IconCalendar from '../assets/calendar24x24.svg';
import IconVisit from '../assets/visit.green.24x24.svg';
import IconDrugs from '../assets/drugs.grey.24x24.svg';
import IconHealth from '../assets/health.grey.24x24.svg';

const BRAND_BLUE = '#005aa9';
const BRAND_GREEN = '#00ac35';
const NAV_GREY = '#6B7280';

const NAV_ITEMS: { label: string; to: string }[] = [
  { label: 'Start', to: '/appointments' },
  { label: 'Leczenie', to: '/' },
  { label: 'Leki', to: '/' },
  { label: 'Zdrowie', to: '/' },
];

type BottomNavKey = 'Start' | 'Leczenie' | 'Umów' | 'Leki' | 'Zdrowie';

const BOTTOM_NAV: { key: BottomNavKey; label: string; to: string; center?: boolean }[] = [
  { key: 'Start', label: 'Start', to: '/appointments' },
  { key: 'Leczenie', label: 'Leczenie', to: '/' },
  { key: 'Umów', label: 'Umów', to: '/', center: true },
  { key: 'Leki', label: 'Leki', to: '/' },
  { key: 'Zdrowie', label: 'Zdrowie', to: '/' },
];

const BOTTOM_NAV_ICONS: Record<BottomNavKey, string> = {
  Start: IconStart,
  Leczenie: IconCalendar,
  Umów: IconVisit,
  Leki: IconDrugs,
  Zdrowie: IconHealth,
};

export const MOBILE_BOTTOM_NAV_HEIGHT = 72;

const DESKTOP_LOGO_HEIGHT = 26;

const LuxMedLogo = ({ mobile = false }: { mobile?: boolean }) => (
  <Box
    component="img"
    alt="Lux Med"
    src={mobile ? LogoLuxMedMobile : LogoLuxMed}
    sx={{
      width: mobile ? 32 : 'auto',
      height: mobile ? 32 : DESKTOP_LOGO_HEIGHT,
      display: 'block',
      flexShrink: 0,
      mb: mobile ? 0 : '9px',
    }}
  />
);

const NotificationsButton = () => (
  <IconButton sx={{ color: '#555' }} aria-label="powiadomienia">
    <Badge
      badgeContent={16}
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: BRAND_GREEN,
          color: '#fff',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: '0.65rem',
          minWidth: '18px',
          height: '18px',
        },
      }}
    >
      <Box component="img" alt="" src={Notification} />
    </Badge>
  </IconButton>
);

function bottomNavActiveKey(pathname: string): BottomNavKey {
  if (pathname.startsWith('/appointments')) return 'Start';
  return 'Leczenie';
}

const BottomNavIcon = ({ itemKey }: { itemKey: BottomNavKey }) => (
  <Box
    component="img"
    src={BOTTOM_NAV_ICONS[itemKey]}
    alt=""
    sx={{ width: 24, height: 24, display: 'block' }}
  />
);

export default function LuxMedNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeBottomKey = bottomNavActiveKey(pathname);
  const desktopTabIndex = NAV_ITEMS.findIndex((item) =>
    item.to === '/' ? pathname === '/' : pathname.startsWith(item.to),
  );
  const activeTab = desktopTabIndex === -1 ? 0 : desktopTabIndex;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Top bar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}
      >
        <Toolbar
          sx={{
            position: 'relative',
            minHeight: { xs: '56px !important', md: '56px !important' },
            py: { xs: 0, md: 0 },
            px: { xs: 2, md: 3 },
            gap: 1,
            justifyContent: isMobile ? 'space-between' : 'flex-start',
            alignItems: { xs: 'center', md: 'stretch' },
          }}
        >
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                sx={{ color: BRAND_BLUE }}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>

              <Box
                sx={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none',
                }}
              >
                <LuxMedLogo mobile />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <NotificationsButton />
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
                  A
                </Avatar>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  flexShrink: 0,
                  alignSelf: 'center',
                }}
              >
                <IconButton
                  sx={{
                    color: BRAND_BLUE,
                    p: 0,
                    width: DESKTOP_LOGO_HEIGHT,
                    height: DESKTOP_LOGO_HEIGHT,
                  }}
                  aria-label="menu"
                >
                  <MenuIcon sx={{ fontSize: 24 }} />
                </IconButton>
                <LuxMedLogo />
              </Box>

              <Tabs
                value={activeTab}
                onChange={(_, v) => {
                  const item = NAV_ITEMS[v];
                  if (item) navigate(item.to);
                }}
                sx={{
                  flexGrow: 1,
                  minHeight: 56,
                  ml: 2,
                  alignSelf: 'stretch',
                  '& .MuiTabs-flexContainer': {
                    height: '100%',
                    alignItems: 'center',
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: BRAND_BLUE,
                    height: '2px',
                    bottom: 0,
                    borderRadius: '3px 3px 0 0',
                  },
                  '& .MuiTab-root': {
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.0rem',
                    textTransform: 'none',
                    color: '#555',
                    minHeight: 56,
                    py: 0,
                    px: 2,
                    '&.Mui-selected': { color: BRAND_BLUE },
                  },
                }}
              >
                {NAV_ITEMS.map((item) => (
                  <Tab key={item.label} label={item.label} disableRipple />
                ))}
              </Tabs>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  alignSelf: 'center',
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon sx={{ fontSize: '18px !important' }} />}
                  sx={{
                    backgroundColor: BRAND_GREEN,
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    textTransform: 'none',
                    borderRadius: '999px',
                    minHeight: 36,
                    height: 36,
                    px: 2,
                    py: 0.5,
                    lineHeight: 1.2,
                    boxShadow: 'none',
                    '& .MuiButton-startIcon': {
                      mr: 0.5,
                      ml: 0,
                    },
                    '&:hover': {
                      backgroundColor: BRAND_GREEN,
                      boxShadow: 'none',
                    },
                  }}
                >
                  Umów
                </Button>

                <NotificationsButton />

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
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Bottom navigation – mobile only */}
      {isMobile && (
        <Paper
          component="nav"
          elevation={0}
          sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: theme.zIndex.appBar,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            bgcolor: '#fff',
            borderTop: '1px solid #f0f0f0',
            boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
            pt: 0.75,
            pb: 'calc(8px + env(safe-area-inset-bottom))',
            minHeight: MOBILE_BOTTOM_NAV_HEIGHT,
          }}
        >
          {BOTTOM_NAV.map((item) => {
            const active = !item.center && activeBottomKey === item.key;

            if (item.center) {
              return (
                <Box
                  key={item.key}
                  component="button"
                  type="button"
                  onClick={() => navigate(item.to)}
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    border: 'none',
                    bgcolor: 'transparent',
                    cursor: 'pointer',
                    p: 0,
                    pb: 0.25,
                  }}
                >
                  <BottomNavIcon itemKey="Umów" />
                  <Typography
                    sx={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      color: NAV_GREY,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            }

            return (
              <Box
                key={item.key}
                component="button"
                type="button"
                onClick={() => navigate(item.to)}
                aria-current={active ? 'page' : undefined}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.25,
                  border: 'none',
                  bgcolor: 'transparent',
                  cursor: 'pointer',
                  p: 0,
                  pb: 0.25,
                  minWidth: 0,
                }}
              >
                <BottomNavIcon itemKey={item.key} />
                <Typography
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 11,
                    fontWeight: active ? 700 : 600,
                    color: active ? BRAND_BLUE : NAV_GREY,
                    lineHeight: 1.2,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Paper>
      )}
    </>
  );
}
