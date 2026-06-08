import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import type { Typ } from '../types/mission';
import { TYPE_META, TypeIcon } from './TypeIcon';

const BADGE_ICON_SLOT = 20;

interface TypeBadgeProps {
  type: Typ;
}

export const TypeBadge = ({ type }: TypeBadgeProps) => {
  const config = TYPE_META[type] ?? TYPE_META.Konsultacja;

  return (
    <Tooltip title="Typ wizyty">
      <Chip
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box
              sx={{
                width: BADGE_ICON_SLOT,
                height: BADGE_ICON_SLOT,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden',
              }}
            >
              <TypeIcon
                typ={type}
                size={BADGE_ICON_SLOT}
                imageScale={config.imageSrc ? 1.45 : undefined}
              />
            </Box>
            <span>{type}</span>
          </Box>
        }
        size="small"
        sx={{
          fontSize: '0.75rem',
          fontWeight: 500,
          color: config.color,
          backgroundColor: config.bg,
          border: `1px solid ${config.color}33`,
          height: 'auto',
          px: 1.25,
          py: 0.5,
          '& .MuiChip-label': {
            px: 0,
            py: 0,
          },
        }}
      />
    </Tooltip>
  );
};
