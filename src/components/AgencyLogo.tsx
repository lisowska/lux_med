import type { FormaWizity } from '../types/mission';
import { Box } from '@mui/material';

interface AgencyLogoProps {
  formaWizity: FormaWizity;
  sx: any;
}

export const AgencyLogo = ({ formaWizity, sx }: AgencyLogoProps) => {
  const initials = formaWizity.slice(0, 2).toUpperCase();

  return (
    <Box
      style={{
        background: `red`,
        width: '2.5rem',
        height: '2.5rem',
        fontWeight: '700',
        borderRadius: '0.75rem',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        color: 'white',
      }}
      title={formaWizity}
      sx={sx}
    >
      {initials}
    </Box>
  );
};
