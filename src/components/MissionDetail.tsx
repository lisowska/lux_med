import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Chip,
  Stack,
  Box,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PeopleIcon from '@mui/icons-material/People';
import { Mission } from '../types/mission';
import { AgencyLogo } from './AgencyLogo';
import { StatusBadge } from './StatusBadge';
import { TypeBadge } from './TypeBadge';
import cover from '../assets/space.png';

interface MissionDetailProps {
  mission: Mission | null;
  open: boolean;
  onClose: () => void;
  onBack?: () => void;
}

const MissionDetail: React.FC<MissionDetailProps> = ({
  mission,
  open,
  onClose,
}) => {
  if (!mission) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCost = (cost?: number) => {
    if (!cost) return 'N/A';
    if (cost >= 1000) {
      return `$${(cost / 1000).toFixed(1)}B`;
    }
    return `$${cost}M`;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="mission-dialog-title"
      aria-describedby="mission-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
          maxWidth: '32rem',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: { xs: '120px', sm: '150px' },
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          backgroundImage: `url(${cover})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ position: 'absolute', top: 16, right: 16 }}
        >
          <IconButton
            onClick={onClose}
            sx={{ color: 'white' }}
            aria-label="Close mission details"
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <AgencyLogo
          agency={mission.agency}
          sx={{
            position: 'absolute',
            bottom: '-1.5rem',
            width: 56,
            height: 56,
          }}
        />
      </Box>

      <DialogContent sx={{ padding: { xs: '25px 20px', sm: '40px 20px' } }}>
        <Typography
          id="mission-dialog-title"
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700, mb: 1, fontSize: '1.5rem' }}
        >
          {mission.name}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            mb: {
              xs: 2,
              mb: 3,
            },
          }}
        >
          <StatusBadge status={mission.status} />
          <TypeBadge type={mission.missionType} />
        </Stack>
        <Box
          sx={{ border: '1px solid', borderColor: 'divider', mb: '15px' }}
        ></Box>

        <Grid
          container
          spacing={2}
          sx={{
            pb: { xs: '0.5rem', sm: '1rem' },
            pt: { xs: '0.5rem', sm: '1rem' },
            ml: { xs: 0 },
          }}
        >
          <Grid xs={3} sm={3} textAlign="center">
            <IconButton
              sx={{
                backgroundColor: '#0073e61a',
                borderRadius: '50%',
                width: 40,
                height: 40,
                padding: 0,
                mb: 1,
              }}
              aria-hidden="true"
            >
              <CalendarTodayIcon
                sx={{ fontSize: '1.2rem', color: 'primary.main' }}
                aria-hidden="true"
              />
            </IconButton>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.625rem' }}
            >
              LAUNCH DATE
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              color="text.primary"
              sx={{ fontSize: '0.75rem' }}
            >
              {formatDate(mission.launchDate)}
            </Typography>
          </Grid>
          <Grid xs={3} sm={3} textAlign="center">
            <IconButton
              sx={{
                backgroundColor: '#0073e61a',
                borderRadius: '50%',
                width: 40,
                height: 40,
                padding: 0,
                mb: 1,
              }}
              aria-hidden="true"
            >
              <RocketLaunchIcon
                sx={{ fontSize: '1.2rem', color: 'primary.main' }}
                aria-hidden="true"
              />
            </IconButton>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.625rem' }}
            >
              AGENCY
            </Typography>
            <Typography
              variant="body1"
              fontWeight={600}
              sx={{ fontSize: '0.75rem' }}
            >
              {mission.agency}
            </Typography>
          </Grid>
          <Grid xs={3} sm={3} textAlign="center">
            <IconButton
              sx={{
                backgroundColor: '#0073e61a',
                borderRadius: '50%',
                width: 40,
                height: 40,
                padding: 0,
                mb: 1,
              }}
              aria-hidden="true"
            >
              <AttachMoneyIcon
                sx={{ fontSize: '1.2rem', color: 'primary.main' }}
                aria-hidden="true"
              />
            </IconButton>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.625rem' }}
            >
              COST
            </Typography>
            <Typography
              variant="body1"
              fontWeight={600}
              sx={{ fontSize: '0.75rem' }}
            >
              {formatCost(mission.cost)}
            </Typography>
          </Grid>
          <Grid xs={3} sm={3} textAlign="center">
            <IconButton
              sx={{
                backgroundColor: '#0073e61a',
                borderRadius: '50%',
                width: 40,
                height: 40,
                padding: 0,
                mb: 1,
              }}
              aria-hidden="true"
            >
              <PeopleIcon
                sx={{ fontSize: '1.2rem', color: 'primary.main' }}
                aria-hidden="true"
              />
            </IconButton>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.625rem' }}
            >
              CREW
            </Typography>
            <Typography
              variant="body1"
              fontWeight={600}
              sx={{ fontSize: '0.75rem' }}
            >
              {mission.crew.length > 0
                ? `${mission.crew.length} crew`
                : 'Uncrewed'}
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{ border: '1px solid', borderColor: 'divider', mb: '15px' }}
        ></Box>

        <Typography
          variant="body1"
          sx={{ lineHeight: 1.7, fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          {mission.description}
        </Typography>

        {mission.crew.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Box
              sx={{
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <PeopleAltOutlinedIcon
                sx={{ fontSize: '1.2rem', color: 'primary.main' }}
                aria-hidden="true"
              />

              <Typography variant="h6" sx={{ fontSize: '0.875rem' }}>
                CREW MEMBERS
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {mission.crew.map((member) => (
                <Chip
                  key={member}
                  label={member}
                  size="small"
                  sx={{
                    backgroundColor: '#0073e61a',
                    color: 'primary.main',
                    fontSize: '.875rem',
                    lineHeight: '1.25rem',
                    border: '1px solid',
                    borderColor: '#3399FF33',
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MissionDetail;
