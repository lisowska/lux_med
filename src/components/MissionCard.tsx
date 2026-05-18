import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Stack,
  Box,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Mission } from '../types/mission';
import { AgencyLogo } from './AgencyLogo';
import { StatusBadge } from './StatusBadge';
import { TypeBadge } from './TypeBadge';
import Tooltip from '@mui/material/Tooltip';

interface MissionCardProps {
  mission: Mission;
  isFavorite: boolean;
  onFavoriteToggle: (missionId: string) => void;
  onClick: (mission: Mission) => void;
}

const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  isFavorite,
  onFavoriteToggle,
  onClick,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle(mission.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(mission);
    }
  };

  return (
    <Card
      component="article"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 300ms ease',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'rgba(205, 213, 222, 0.5)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #0059B3 0%, #17A2E8 100%)',
          opacity: 0,
          transition: 'opacity 300ms ease',
        },
        '&:hover::before': {
          opacity: 1,
        },
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          borderColor: ' rgba(0, 116, 228, 0.4)',
        },
      }}
      onClick={() => onClick(mission)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`${mission.name} mission, ${mission.agency}, ${mission.year}. ${mission.description.substring(0, 100)}`}
    >
      <CardContent sx={{ flexGrow: 1, position: 'relative', p: 2.5 }}>
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
          }}
          onClick={handleFavoriteClick}
          size="small"
          aria-label="Favorite missions"
        >
          {isFavorite ? (
            <StarIcon sx={{ color: '#ffc107' }} aria-hidden="true" />
          ) : (
            <StarBorderIcon aria-hidden="true" />
          )}
        </IconButton>

        <Stack
          direction="row"
          spacing={2}
          alignItems="flex-start"
          sx={{ mb: 2 }}
        >
          <AgencyLogo
            agency={mission.agency}
            sx={{ width: '2.5rem', height: '2.5rem' }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ fontWeight: 600, mb: 0.5, lineHeight: 1 }}
              color="text.primary"
            >
              {mission.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 600, mb: 0.5 }}
            >
              {mission.agency} • {mission.year}
            </Typography>
          </Box>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.5rem',
          }}
        >
          {mission.description}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <StatusBadge status={mission.status} />
          <TypeBadge type={mission.missionType} />
          <Tooltip title={'Crew size'} sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
            <Chip
              icon={
                <SupportAgentIcon sx={{ fontSize: '0.875rem !important' }} />
              }
              label={
                mission.crew.length > 0
                  ? `${mission.crew.length} crew`
                  : 'Uncrewed'
              }
              size="small"
              sx={{ fontSize: '0.75rem' }}
            />
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MissionCard;
