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
  selectedAgencies: string[];
  onAgencyFilterChange: (agencies: string[]) => void;
  selectedStatuses: string[];
  onStatusFilterChange: (statuses: string[]) => void;
  selectedTypes: string[];
  onTypeFilterChange: (types: string[]) => void;
  showFavoritesOnly: boolean;
  onFavoritesToggle: () => void;
  resultCount: number;
  totalCount: number;
  onClearAll: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchQuery,
  onSearchChange,
  selectedAgencies,
  onAgencyFilterChange,
  selectedStatuses,
  onStatusFilterChange,
  selectedTypes,
  onTypeFilterChange,
  showFavoritesOnly,
  onFavoritesToggle,
  resultCount,
  totalCount,
  onClearAll,
}) => {
  const [agencyAnchor, setAgencyAnchor] = useState<null | HTMLElement>(null);
  const [statusAnchor, setStatusAnchor] = useState<null | HTMLElement>(null);
  const [typeAnchor, setTypeAnchor] = useState<null | HTMLElement>(null);

  const agencies: Mission['agency'][] = [
    'NASA',
    'ESA',
    'SpaceX',
    'CNSA',
    'ISRO',
    'Roscosmos',
  ];
  const statuses: Mission['status'][] = [
    'Success',
    'Failure',
    'Ongoing',
    'Planned',
  ];
  const types: Mission['missionType'][] = [
    'Orbital',
    'Lunar',
    'Mars',
    'Deep Space',
    'ISS',
  ];

  const activeFilterCount =
    selectedAgencies.length +
    selectedStatuses.length +
    selectedTypes.length +
    (showFavoritesOnly ? 1 : 0);

  const handleAgencyToggle = (agency: string) => {
    if (selectedAgencies.includes(agency)) {
      onAgencyFilterChange(selectedAgencies.filter((a) => a !== agency));
    } else {
      onAgencyFilterChange([...selectedAgencies, agency]);
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

  const SelectHeader = ({ title }: { title: string }) => (
    <Box
      sx={{ px: 2, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>
  );

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
              placeholder="Search mission names…"
              value={searchQuery}
              size="small"
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search missions by name"
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
                  Showing{' '}
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
                  missions
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
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>

            <Button
              id="agency-filter-button"
              variant={selectedAgencies.length > 0 ? 'contained' : 'outlined'}
              startIcon={<BusinessIcon aria-hidden="true" />}
              endIcon={
                <ArrowDropDownIcon
                  sx={{
                    transform: agencyAnchor ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                  aria-hidden="true"
                />
              }
              onClick={(e) => setAgencyAnchor(e.currentTarget)}
              size="small"
              aria-label={`Filter by agency${selectedAgencies.length > 0 ? `, ${selectedAgencies.length} selected` : ''}`}
              aria-expanded={Boolean(agencyAnchor)}
              aria-haspopup="true"
              sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
            >
              Agency{' '}
              {selectedAgencies.length > 0 && `(${selectedAgencies.length})`}
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
              Type {selectedTypes.length > 0 && `(${selectedTypes.length})`}
            </Button>

            <Button
              variant={showFavoritesOnly ? 'contained' : 'outlined'}
              startIcon={<StarIcon aria-hidden="true" />}
              onClick={onFavoritesToggle}
              size="small"
              aria-label={
                showFavoritesOnly ? 'Show all missions' : 'Show favorites only'
              }
              aria-pressed={showFavoritesOnly}
              sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
            >
              Favorites
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
                Clear All&nbsp;
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
              {selectedAgencies.map((agency) => (
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

              {showFavoritesOnly && (
                <Chip
                  label="Favorites Only"
                  onDelete={onFavoritesToggle}
                  size="small"
                />
              )}
            </Stack>
          )}

          <Menu
            anchorEl={agencyAnchor}
            open={Boolean(agencyAnchor)}
            onClose={() => setAgencyAnchor(null)}
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
            <SelectHeader title="Select agencies" />
            {agencies.map((agency) => (
              <MenuItem
                key={agency}
                onClick={() => handleAgencyToggle(agency)}
                selected={selectedAgencies.includes(agency)}
                sx={{
                  py: 1.25,
                  gap: 1.1,
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                  {agency}
                </Typography>
                <CheckSlot checked={selectedAgencies.includes(agency)} />
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
            <SelectHeader title="Select status" />
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
            <SelectHeader title="Select type" />
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
