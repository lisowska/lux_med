import { Chip } from '@mui/material';
import type { MissionStatus } from '../types/mission';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import RotateRightRoundedIcon from '@mui/icons-material/RotateRightRounded';
import Tooltip from '@mui/material/Tooltip';
import { getStatusStyles } from './styleUtils';

interface StatusBadgeProps {
  status: MissionStatus;
}
export const getStatusIcon = (status: MissionStatus) => {
  const iconMap = {
    Odbyta: <CheckCircleOutlineIcon fontSize="small" htmlColor="#15803D" />,
    Anulowana: (
      <HighlightOffOutlinedIcon fontSize="small" htmlColor="#B91C1C" />
    ),
    Planowana: <CalendarTodayIcon fontSize="small" htmlColor="#0E7490" />,
  };
  return iconMap[status] ?? null;
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Tooltip title={`Status wizyty: ${status}`} sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
      <Chip
        icon={getStatusIcon(status)}
        label={status}
        size="small"
        sx={{
          fontSize: '0.75rem',
          ...getStatusStyles(status),
          '& .MuiChip-icon': {
            color: 'inherit',
          },
        }}
      />
    </Tooltip>
  );
};
