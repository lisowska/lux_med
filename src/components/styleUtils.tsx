import type { MissionStatus, Mission } from '../types/mission';

export const getStatusStyles = (status: MissionStatus) => {
  const styles = {
    Odbyta: {
      backgroundColor: 'rgba(22, 163, 74, 0.15)',
      color: '#16A34A',
      border: '1px solid rgba(22, 163, 74, 0.3)',
    },
    Anulowana: {
      backgroundColor: 'rgba(239, 68, 68, 0.15)',
      color: '#EF4444',
      border: '1px solid rgba(239, 68, 68, 0.3)',
    },
    Planowana: {
      backgroundColor: 'rgba(6, 182, 212, 0.15)',
      color: '#06B6D4',
      border: '1px solid rgba(6, 182, 212, 0.3)',
    },
  };
  return styles[status];
};

export const statusColor: Record<Mission['status'], string> = {
  Odbyta: '#16A34A',
  Planowana: '#06B6D4',
  Anulowana: '#EF4444',
  // Planned: '#F59E0B',
};
