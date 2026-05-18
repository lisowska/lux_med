import type { Agency } from '../types/mission';
import { Box } from '@mui/material';

interface AgencyLogoProps {
  agency: Agency;
  sx: any;
}

const agencyGradients: Record<Agency, { from: string; to: string }> = {
  NASA: { from: 'hsl(210 100% 45%)', to: 'hsl(199 89% 48%)' },
  ESA: { from: 'hsl(245 80% 55%)', to: 'hsl(270 70% 60%)' },
  Roscosmos: { from: 'hsl(0 72% 50%)', to: 'hsl(15 80% 55%)' },
  SpaceX: { from: 'hsl(215 60% 22%)', to: 'hsl(220 50% 35%)' },
  CNSA: { from: 'hsl(0 80% 45%)', to: 'hsl(25 85% 50%)' },
  ISRO: { from: 'hsl(25 90% 50%)', to: 'hsl(38 92% 50%)' },
  JAXA: { from: 'hsl(199 89% 48%)', to: 'hsl(185 80% 45%)' },
};

export const AgencyLogo = ({ agency, sx }: AgencyLogoProps) => {
  const initials = agency.slice(0, 2).toUpperCase();
  const gradient = agencyGradients[agency];

  return (
    <Box
      style={{
        background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
        width: '2.5rem',
        height: '2.5rem',
        fontWeight: '700',
        borderRadius: '0.75rem',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        color: 'white',
      }}
      title={agency}
      sx={sx}
    >
      {initials}
    </Box>
  );
};
