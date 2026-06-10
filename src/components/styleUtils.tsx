import type { MissionStatus, Mission } from '../types/mission';

export const getStatusStyles = (status: MissionStatus) => {
  const styles = {
    Odbyta: {
      backgroundColor: 'rgba(22, 163, 74, 0.15)',
      color: '#15803D',
      border: '1px solid rgba(21, 128, 61, 0.35)',
    },
    Anulowana: {
      backgroundColor: 'rgba(239, 68, 68, 0.15)',
      color: '#B91C1C',
      border: '1px solid rgba(185, 28, 28, 0.35)',
    },
    Planowana: {
      backgroundColor: 'rgba(14, 116, 144, 0.12)',
      color: '#0E7490',
      border: '1px solid rgba(14, 116, 144, 0.35)',
    },
  };
  return styles[status];
};

export const TABLE_BADGE_ICON_SIZE = 20;

export const tableBadgeBaseSx = {
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 28,
  height: 28,
  px: 1.25,
  borderRadius: '999px',
  fontSize: '0.75rem',
  fontWeight: 600,
  lineHeight: 1,
  gap: 0.75,
  boxSizing: 'border-box' as const,
  whiteSpace: 'nowrap',
  flexShrink: 0,
};

export const statusColor: Record<Mission['status'], string> = {
  Odbyta: '#15803D',
  Planowana: '#0E7490',
  Anulowana: '#B91C1C',
  // Planned: '#F59E0B',
};
