import Chip from '@mui/material/Chip';
import PublicIcon from '@mui/icons-material/Public';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import Tooltip from '@mui/material/Tooltip';
import type { MissionType } from '../types/mission';

interface TypeBadgeProps {
  type: MissionType;
}

const typeConfig: Record<
  MissionType,
  {
    icon: React.ReactElement;
    color: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  Orbital: {
    icon: <PublicIcon fontSize="small" />,
    color: 'white',
    bgColor: '#162D4D',
    borderColor: 'rgba(14, 165, 233, 0.3)',
  },
  Lunar: {
    icon: <NightsStayIcon fontSize="small" />,
    color: '#A78BFA',
    bgColor: 'rgba(167, 139, 250, 0.15)',
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  Mars: {
    icon: <RadioButtonCheckedIcon fontSize="small" />,
    color: '#F97316',
    bgColor: 'rgba(249, 115, 22, 0.15)',
    borderColor: 'rgba(249, 115, 22, 0.3)',
  },
  'Deep Space': {
    icon: <RocketLaunchIcon fontSize="small" />,
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.15)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  ISS: {
    icon: <SatelliteAltIcon fontSize="small" />,
    color: '#06B6D4',
    bgColor: 'rgba(6, 182, 212, 0.15)',
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
};

export const TypeBadge = ({ type }: TypeBadgeProps) => {
  const config = typeConfig[type];

  return (
    <Tooltip title={'Mission Type'} sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
      <Chip
        icon={config.icon}
        label={type}
        size="small"
        sx={{
          fontSize: '0.75rem',
          fontWeight: 500,
          color: config.color,
          backgroundColor: config.bgColor,
          border: `1px solid ${config.borderColor}`,
          '& .MuiChip-icon': {
            color: 'inherit',
          },
        }}
      />
    </Tooltip>
  );
};
