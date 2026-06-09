import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import type { Typ } from '../types/mission';
import { TYPE_META, TypeIcon } from './TypeIcon';
import { TABLE_BADGE_ICON_SIZE, tableBadgeBaseSx } from './styleUtils';

const BADGE_ICON_SLOT = TABLE_BADGE_ICON_SIZE;

interface TypeBadgeProps {
  type: Typ;
}

export const TypeBadge = ({ type }: TypeBadgeProps) => {
  const config = TYPE_META[type] ?? TYPE_META.Konsultacja;

  return (
    <Tooltip title={`Typ wizyty: ${type}`}>
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
          ...tableBadgeBaseSx,
          color: config.color,
          backgroundColor: config.bg,
          border: `1px solid ${config.color}33`,
          '& .MuiChip-label': {
            px: 0,
            py: 0,
            display: 'flex',
            alignItems: 'center',
          },
        }}
      />
    </Tooltip>
  );
};
