import type { MissionStatus, Mission } from '../types/mission';

export const getStatusStyles = (status: MissionStatus) => {
  const styles = {
    Success: {
      backgroundColor: 'rgba(22, 163, 74, 0.15)',
      color: '#16A34A',
      border: '1px solid rgba(22, 163, 74, 0.3)',
    },
    Failure: {
      backgroundColor: 'rgba(239, 68, 68, 0.15)',
      color: '#EF4444',
      border: '1px solid rgba(239, 68, 68, 0.3)',
    },
    Ongoing: {
      backgroundColor: 'rgba(6, 182, 212, 0.15)',
      color: '#06B6D4',
      border: '1px solid rgba(6, 182, 212, 0.3)',
    },
    Planned: {
      backgroundColor: 'rgba(245, 158, 11, 0.15)',
      color: '#F59E0B',
      border: '1px solid rgba(245, 158, 11, 0.3)',
    },
  };
  return styles[status];
};

export const statusColor: Record<Mission['status'], string> = {
  Success: '#16A34A',
  Failure: '#EF4444',
  Ongoing: '#06B6D4',
  Planned: '#F59E0B',
};
