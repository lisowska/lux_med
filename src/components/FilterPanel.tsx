import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  Chip,
  Stack,
  Typography,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import BusinessIcon from '@mui/icons-material/Business';
import ScheduleIcon from '@mui/icons-material/Schedule';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Mission } from '../types/mission';
import { statusColor } from './styleUtils';

interface FilterPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedForma: string[];
  onAgencyFilterChange: (agencies: string[]) => void;
  selectedStatuses: string[];
  onStatusFilterChange: (statuses: string[]) => void;
  selectedTypes: string[];
  onTypeFilterChange: (types: string[]) => void;
  resultCount: number;
  totalCount: number;
  onClearAll: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchQuery,
  onSearchChange,
  selectedForma,
  onAgencyFilterChange,
  selectedStatuses,
  onStatusFilterChange,
  selectedTypes,
  onTypeFilterChange,
  resultCount,
  totalCount,
  onClearAll,
}) => {
  const [formaAnchor, setFormaAnchor] = useState<null | HTMLElement>(null);
  const [statusAnchor, setStatusAnchor] = useState<null | HTMLElement>(null);
  const [typeAnchor, setTypeAnchor] = useState<null | HTMLElement>(null);

  const wizyty: Mission['formaWizity'][] = [
    'telefoniczna',
    'online',
    'w placówce',
  ];
  const statuses: Mission['status'][] = ['Odbyta', 'Planowana', 'Anulowana'];
  const types: Mission['usluga'][] = [
    'Ginekolog',
    'Pediatra',
    'Usg',
    'Dietetyk',
    'Okulista',
  ];

  const activeFilterCount =
    selectedForma.length + selectedStatuses.length + selectedTypes.length;

  const handleAgencyToggle = (agency: string) => {
    if (selectedForma.includes(agency)) {
      onAgencyFilterChange(selectedForma.filter((a) => a !== agency));
    } else {
      onAgencyFilterChange([...selectedForma, agency]);
    }
  };

  const handleStatusToggle = (status: string) => {
    if (selectedStatuses.includes(status)) {
      onStatusFilterChange(selectedStatuses.filter((s) => s !== status));
    } else {
      onStatusFilterChange([...selectedStatuses, status]);
    }
  };

  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeFilterChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypeFilterChange([...selectedTypes, type]);
    }
  };

  const CheckSlot = ({ checked }: { checked: boolean }) => (
    <Box
      sx={{
        width: 28,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      }}
    >
      {checked ? <CheckIcon fontSize="small" /> : null}
    </Box>
  );

  return (
    <Box sx={{ position: 'sticky', top: 16, zIndex: 20, pt: 2, pb: 2 }}>
      <Paper
        elevation={4}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* Gradient accent line */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)',
          }}
        />
        <Box sx={{ p: 2, backgroundColor: 'white' }}>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }} alignItems="center">
            <TextField
              fullWidth
              placeholder="Wyszukaj usługę…"
              value={searchQuery}
              size="small"
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Szukaj lekarza lub badania"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: '#162B47' }}>
                    <SearchIcon
                      sx={{ color: 'text.secondary', fontSize: 20 }}
                      aria-hidden="true"
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: '#CDD9E480',
                },
              }}
            />
            <Paper
              sx={{
                px: 2,
                py: 0.9,
                backgroundColor: '#CDD9E480',
                minWidth: { xs: '110px', md: '240px' },
                textAlign: 'center',
                borderRadius: 2,
              }}
            >
              <Typography
                component="span"
                color="#101D2E"
                sx={{ fontWeight: '700', pr: '5px' }}
              >
                <Box
                  component="span"
                  sx={{ display: { xs: 'none', sm: 'inline' } }}
                >
                  Pokazuje{' '}
                </Box>
                {resultCount}
              </Typography>
              <Typography component="span" color="#365780">
                of {totalCount}
                <Box
                  component="span"
                  sx={{ display: { xs: 'none', sm: 'inline' } }}
                >
                  {' '}
                  wyników
                </Box>
              </Typography>
            </Paper>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            gap="12px"
          >
            <Button
              variant={activeFilterCount > 0 ? 'contained' : 'outlined'}
              startIcon={<FilterListIcon aria-hidden="true" />}
              onClick={onClearAll}
              disabled={activeFilterCount === 0}
              size="small"
              aria-label={
                activeFilterCount > 0
                  ? `Clear all ${activeFilterCount} filters`
                  : 'No filters to clear'
              }
              sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
            >
              Filtry {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>

            <Button
              id="agency-filter-button"
              variant={selectedForma.length > 0 ? 'contained' : 'outlined'}
              startIcon={<BusinessIcon aria-hidden="true" />}
              endIcon={
                <ArrowDropDownIcon
                  sx={{
                    transform: formaAnchor ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                  aria-hidden="true"
                />
              }
              onClick={(e) => setFormaAnchor(e.currentTarget)}
              size="small"
              aria-label={`Filter by forma${selectedForma.length > 0 ? `, ${selectedForma.length} selected` : ''}`}
              aria-expanded={Boolean(formaAnchor)}
              aria-haspopup="true"
              sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
            >
              Forma wizity{' '}
              {selectedForma.length > 0 && `(${selectedForma.length})`}
            </Button>

            <Button
              id="status-filter-button"
              variant={selectedStatuses.length > 0 ? 'contained' : 'outlined'}
              startIcon={<ScheduleIcon aria-hidden="true" />}
              endIcon={
                <ArrowDropDownIcon
                  sx={{
                    transform: statusAnchor ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                  aria-hidden="true"
                />
              }
              onClick={(e) => setStatusAnchor(e.currentTarget)}
              size="small"
              aria-label={`Filter by status${selectedStatuses.length > 0 ? `, ${selectedStatuses.length} selected` : ''}`}
              aria-expanded={Boolean(statusAnchor)}
              aria-haspopup="true"
              sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
            >
              Status{' '}
              {selectedStatuses.length > 0 && `(${selectedStatuses.length})`}
            </Button>

            <Button
              id="type-filter-button"
              variant={selectedTypes.length > 0 ? 'contained' : 'outlined'}
              startIcon={<RocketLaunchIcon aria-hidden="true" />}
              endIcon={
                <ArrowDropDownIcon
                  sx={{
                    transform: typeAnchor ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                  aria-hidden="true"
                />
              }
              onClick={(e) => setTypeAnchor(e.currentTarget)}
              size="small"
              aria-label={`Filter by mission type${selectedTypes.length > 0 ? `, ${selectedTypes.length} selected` : ''}`}
              aria-expanded={Boolean(typeAnchor)}
              aria-haspopup="true"
              sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
            >
              Usługa {selectedTypes.length > 0 && `(${selectedTypes.length})`}
            </Button>

            {activeFilterCount > 0 && (
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={onClearAll}
                aria-label={`Clear ${activeFilterCount} active filters`}
                sx={{
                  marginLeft: { md: 'auto' },
                  fontSize: { xs: '0.7rem', md: '0.8rem' },
                }}
              >
                Wyczyść wszystkie&nbsp;
                <Box
                  component="span"
                  sx={{
                    minWidth: 20,
                    height: 20,
                    borderRadius: '999px',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 0.75,
                  }}
                >
                  {activeFilterCount}
                </Box>
              </Button>
            )}
          </Stack>

          {activeFilterCount > 0 && (
            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 2 }}
              flexWrap="wrap"
              useFlexGap
            >
              {selectedForma.map((agency) => (
                <Chip
                  key={agency}
                  label={agency}
                  onDelete={() => handleAgencyToggle(agency)}
                  size="small"
                />
              ))}
              {selectedStatuses.map((status) => (
                <Chip
                  key={status}
                  label={status}
                  onDelete={() => handleStatusToggle(status)}
                  size="small"
                />
              ))}
              {selectedTypes.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  onDelete={() => handleTypeToggle(type)}
                  size="small"
                />
              ))}
            </Stack>
          )}

          <Menu
            anchorEl={formaAnchor}
            open={Boolean(formaAnchor)}
            onClose={() => setFormaAnchor(null)}
            slotProps={{
              paper: {
                sx: {
                  width: 160,
                  borderRadius: 2,
                  overflow: 'hidden',
                  mt: 1,
                },
              },
            }}
            aria-labelledby="agency-filter-button"
          >
            {wizyty.map((wizyta) => (
              <MenuItem
                key={wizyta}
                onClick={() => handleAgencyToggle(wizyta)}
                selected={selectedForma.includes(wizyta)}
                sx={{
                  py: 1.25,
                  gap: 1.1,
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                  {wizyta}
                </Typography>
                <CheckSlot checked={selectedForma.includes(wizyta)} />
              </MenuItem>
            ))}
          </Menu>

          <Menu
            anchorEl={statusAnchor}
            open={Boolean(statusAnchor)}
            onClose={() => setStatusAnchor(null)}
            slotProps={{
              paper: {
                sx: { width: 160, borderRadius: 2, overflow: 'hidden', mt: 1 },
              },
            }}
            aria-labelledby="status-filter-button"
          >
            {statuses.map((status) => (
              <MenuItem
                key={status}
                onClick={() => handleStatusToggle(status)}
                selected={selectedStatuses.includes(status)}
                sx={{ py: 1.25, gap: 1.1, justifyContent: 'space-between' }}
              >
                <Box
                  aria-hidden
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: statusColor[status],
                  }}
                />
                <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                  {status}
                </Typography>
                <CheckSlot checked={selectedStatuses.includes(status)} />
              </MenuItem>
            ))}
          </Menu>
          <Menu
            anchorEl={typeAnchor}
            open={Boolean(typeAnchor)}
            onClose={() => setTypeAnchor(null)}
            slotProps={{
              paper: {
                sx: { width: 160, borderRadius: 2, overflow: 'hidden', mt: 1 },
              },
            }}
            aria-labelledby="type-filter-button"
          >
            {types.map((type) => (
              <MenuItem
                key={type}
                onClick={() => handleTypeToggle(type)}
                selected={selectedTypes.includes(type)}
                sx={{ py: 1.25, gap: 1.25, justifyContent: 'space-between' }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  {type}
                </Typography>
                <CheckSlot checked={selectedTypes.includes(type)} />
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Paper>
    </Box>
  );
};

export default FilterPanel;
