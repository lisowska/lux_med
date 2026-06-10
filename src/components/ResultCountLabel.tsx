import React from 'react';
import { Box, Typography, TypographyProps } from '@mui/material';
import { formatResultCount, formatVisitCount } from '../utils/visitCount';

const BRAND_BLUE = '#004078';

interface ResultCountLabelProps {
  filtered: number;
  total: number;
  hasActiveFilters: boolean;
  highlightColor?: string;
  textColor?: string;
  typographyProps?: TypographyProps;
}

const ResultCountLabel: React.FC<ResultCountLabelProps> = ({
  filtered,
  total,
  hasActiveFilters,
  highlightColor = BRAND_BLUE,
  textColor = '#64748B',
  typographyProps,
}) => {
  const simplified = !hasActiveFilters && filtered === total;

  if (simplified) {
    const suffix = formatVisitCount(total).replace(String(total), '').trim();
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: '0.875rem', color: textColor, ...typographyProps?.sx }}
        {...typographyProps}
      >
        <Box component="span" sx={{ color: highlightColor, fontWeight: 600 }}>
          {total}
        </Box>{' '}
        {suffix}
      </Typography>
    );
  }

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ fontSize: '0.875rem', color: textColor, whiteSpace: 'nowrap', ...typographyProps?.sx }}
      {...typographyProps}
    >
      <Box component="span" sx={{ color: highlightColor, fontWeight: 600 }}>
        {filtered}
      </Box>{' '}
      z {total} wizyt
    </Typography>
  );
};

export default ResultCountLabel;
