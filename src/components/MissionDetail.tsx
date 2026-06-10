import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Stack,
  Divider,
  Link,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Mission, SkierowanieStatus } from '../types/mission';
import { formatLaunchDate } from '../utils/formatDate';

const BRAND_BLUE = '#005aa9';

interface MissionDetailProps {
  mission: Mission | null;
  open: boolean;
  onClose: () => void;
  onBack?: () => void;
}

const formaMeta: Record<Mission['formaWizity'], { label: string; color: string }> = {
  telefoniczna: { label: 'Telemedycyna', color: '#016B65' },
  online: { label: 'Online', color: '#004078' },
  'w placówce': { label: 'Wizyta w placówce', color: '#8B0278' },
};

const statusTitle: Record<Mission['status'], string> = {
  Odbyta: 'Zrealizowana usługa',
  Planowana: 'Zaplanowana wizyta',
  Anulowana: 'Anulowana wizyta',
};

const skierowanieStatusMeta: Record<
  SkierowanieStatus,
  { label: string; color: string; Icon: typeof CheckCircleOutlineIcon }
> = {
  Aktywne: { label: 'Aktywne', color: '#16A34A', Icon: CheckCircleOutlineIcon },
  Przeterminowane: { label: 'Przeterminowane', color: '#DC2626', Icon: CancelOutlinedIcon },
  Zrealizowane: { label: 'Zrealizowane', color: '#16A34A', Icon: CheckCircleOutlineIcon },
};

const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box
    sx={{
      bgcolor: '#fff',
      borderRadius: 3,
      boxShadow: '0 2px 12px rgba(15, 28, 46, 0.06)',
      border: '1px solid #F1F5F9',
      p: 2.5,
    }}
  >
    <Typography sx={{ fontWeight: 700, fontSize: 17, color: 'text.primary', mb: 1.5 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

const MissionDetail: React.FC<MissionDetailProps> = ({ mission, open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!mission) return null;

  const forma = formaMeta[mission.formaWizity];
  const pageTitle = statusTitle[mission.status];
  const zrealizowane =
    mission.zrealizowaneUslugi ?? (mission.status === 'Odbyta' ? [`${mission.typ} ${mission.usluga}`] : []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      aria-labelledby="mission-dialog-title"
      PaperProps={{
        sx: {
          bgcolor: '#F5F7FA',
          borderRadius: isMobile ? 0 : 3,
          maxHeight: isMobile ? '100%' : '90vh',
          overflow: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '48px 1fr 48px',
          alignItems: 'center',
          px: 1,
          py: 1.5,
          bgcolor: '#F5F7FA',
        }}
      >
        <IconButton
          onClick={onClose}
          aria-label="Wróć"
          sx={{
            bgcolor: '#fff',
            boxShadow: '0 2px 8px rgba(15, 28, 46, 0.08)',
            width: 40,
            height: 40,
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography
          id="mission-dialog-title"
          sx={{
            fontWeight: 700,
            fontSize: 17,
            color: 'text.primary',
            textAlign: 'center',
            px: 1,
          }}
        >
          {pageTitle}
        </Typography>
        <Box />
      </Box>

      <DialogContent
        sx={{
          px: 2,
          py: 2,
          bgcolor: '#F5F7FA',
        }}
      >
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: 3,
            boxShadow: '0 2px 12px rgba(15, 28, 46, 0.06)',
            border: '1px solid #F1F5F9',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ px: 2.5, py: 2 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: 'text.primary' }}>
              {formatLaunchDate(mission.launchDate)}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: '#E2E8F0' }} />

          <Box sx={{ px: 2.5, py: 2 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: forma.color, mb: 0.75 }}>
              {forma.label}
            </Typography>
            <Typography
              sx={{
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: -0.3,
                color: 'text.primary',
                lineHeight: 1.15,
                mb: 1,
              }}
            >
              {mission.usluga}
            </Typography>
            {mission.lekarz.length > 0 && (
              <Typography sx={{ fontSize: 15, fontWeight: 500, color: 'text.primary' }}>
                {mission.lekarz.join(', ')}
              </Typography>
            )}
          </Box>

          {mission.placowka && (
            <>
              <Divider sx={{ borderColor: '#E2E8F0' }} />
              <Box sx={{ px: 2.5, py: 2 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 500, color: 'text.primary', lineHeight: 1.45 }}>
                  {mission.placowka}
                </Typography>
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mission.placowka)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{
                    display: 'inline-block',
                    mt: 1.25,
                    fontSize: 15,
                    fontWeight: 600,
                    color: BRAND_BLUE,
                    '&:hover': { color: '#004078' },
                  }}
                >
                  Zobacz na mapie
                </Link>
              </Box>
            </>
          )}
        </Box>

        {mission.zalecenia && (
          <Box sx={{ mt: 2 }}>
            <SectionCard title="Zalecenia">
              <Typography sx={{ fontSize: 15, color: 'text.primary', lineHeight: 1.5 }}>
                {mission.zalecenia}
              </Typography>
            </SectionCard>
          </Box>
        )}

        {zrealizowane.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <SectionCard title="Zrealizowane usługi">
              <Stack spacing={1.5}>
                {zrealizowane.map((usluga, index) => (
                  <Box key={usluga} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        border: '1.5px solid #CBD5E1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#64748B',
                        flexShrink: 0,
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography sx={{ fontSize: 15, color: 'text.primary', pt: 0.25 }}>
                      {usluga}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </SectionCard>
          </Box>
        )}

        {mission.skierowania && mission.skierowania.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <SectionCard title="Skierowania">
              <Stack spacing={2}>
                {mission.skierowania.map((skierowanie) => {
                  const statusMeta = skierowanieStatusMeta[skierowanie.status];
                  const StatusIcon = statusMeta.Icon;
                  return (
                    <Box key={`${skierowanie.specjalista}-${skierowanie.rodzaj}`}>
                      <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'text.primary', mb: 1 }}>
                        {skierowanie.specjalista}
                      </Typography>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          px: 1.25,
                          py: 0.5,
                          borderRadius: 999,
                          bgcolor: '#E8F4FD',
                          color: '#004078',
                          fontSize: 14,
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        {skierowanie.rodzaj}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <StatusIcon sx={{ fontSize: 18, color: statusMeta.color }} />
                        <Typography sx={{ fontSize: 15, fontWeight: 600, color: statusMeta.color }}>
                          {statusMeta.label}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
            </SectionCard>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MissionDetail;
