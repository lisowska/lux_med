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
  Autocomplete,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import type { Mission } from '../types/mission';
import { statusColor } from './styleUtils';

interface FilterPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  availableUslugi: string[];
  selectedForma: string[];
  onAgencyFilterChange: (agencies: string[]) => void;
  selectedStatuses: string[];
  onStatusFilterChange: (statuses: string[]) => void;
  selectedTypes: string[];
  onTypeFilterChange: (types: string[]) => void;
  selectedDoctor: string;
  onDoctorFilterChange: (doctor: string) => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
  resultCount: number;
  totalCount: number;
  onClearAll: () => void;
  availableDoctors: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchQuery,
  onSearchChange,
  availableUslugi,
  selectedForma,
  onAgencyFilterChange,
  selectedStatuses,
  onStatusFilterChange,
  selectedTypes,
  onTypeFilterChange,
  selectedDoctor,
  onDoctorFilterChange,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  resultCount,
  totalCount,
  onClearAll,
  availableDoctors,
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
    selectedForma.length +
    selectedStatuses.length +
    selectedTypes.length +
    (selectedDoctor ? 1 : 0) +
    (dateFrom ? 1 : 0) +
    (dateTo ? 1 : 0);

  const filterSelectButtonSx = (isActive: boolean) => ({
    textTransform: 'none',
    borderRadius: 2,
    borderWidth: '1px',
    borderColor: isActive ? '#004078' : '#005AA9',
    color: isActive ? '#004078' : '#005AA9',
    bgcolor: isActive ? '#DFEFFF' : 'transparent',
    boxShadow: 'none',
    height: 40,
    minHeight: 40,
    lineHeight: 1,
    '& .MuiSvgIcon-root': { color: 'inherit' },
    '&:hover': {
      borderColor: '#004078',
      bgcolor: '#F7FAFD',
      color: '#004078',
      boxShadow: 'none',
    },
    '&:focus, &:focus-visible': {
      boxShadow: 'none',
      outline: 'none',
    },
    '&:active': {
      borderColor: '#004078',
      bgcolor: '#DFEFFF',
      color: '#004078',
      boxShadow: 'none',
    },
    px: 2,
    py: 0.75,
  });

  const filterFieldSx = (isActive: boolean) => ({
    '& .MuiOutlinedInput-root': {
      height: 40,
      minHeight: 40,
      borderRadius: 2,
      borderWidth: '1px',
      bgcolor: isActive ? '#DFEFFF' : 'transparent',
      py: 0,
      alignItems: 'center',
      '& fieldset': {
        borderColor: isActive ? '#004078' : '#005AA9',
      },
      '&:hover fieldset': {
        borderColor: '#004078',
      },
    },
    '&& .MuiOutlinedInput-root.Mui-focused fieldset': {
      borderColor: '#004078',
    },
    '& .MuiOutlinedInput-input, & .MuiInputBase-input': {
      height: 40,
      boxSizing: 'border-box',
      paddingTop: 0,
      paddingBottom: 0,
      display: 'flex',
      alignItems: 'center',
      color: isActive ? '#004078' : '#005AA9',
    },
    '& input[type=\"date\"]': {
      height: 40,
      paddingTop: 0,
      paddingBottom: 0,
    },
    // Chrome/Safari date icon color (native calendar indicator)
    '& input[type=\"date\"]::-webkit-calendar-picker-indicator': {
      opacity: 1,
      filter: isActive
        ? 'invert(18%) sepia(32%) saturate(4200%) hue-rotate(190deg) brightness(85%) contrast(105%)'
        : 'invert(22%) sepia(28%) saturate(4200%) hue-rotate(190deg) brightness(95%) contrast(105%)',
      cursor: 'pointer',
    },
    '& .MuiInputLabel-root': {
      color: '#005AA9',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#004078',
    },
    '&:focus, &:focus-visible': { boxShadow: 'none', outline: 'none' },
  });

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

  const getFormaWizytyLabel = (forma: string): string => {
    const labels: Record<string, string> = {
      telefoniczna: 'Telefoniczna',
      online: 'Online',
      'w placówce': 'W placówce',
    };
    return labels[forma] || forma;
  };

  return (
    <Box sx={{ position: 'sticky', top: 16, zIndex: 20, pt: 2 }}>
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          overflow: 'visible',
          borderRadius: 3,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          bgcolor: 'white',
          border: '1px solid',
          borderColor: 'divider',
          borderBottom: 'none',
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* First row - Search and result count */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            sx={{ mb: 2 }}
            alignItems={{ xs: 'stretch', md: 'center' }}
          >
            <Autocomplete
              freeSolo
              openOnFocus
              options={availableUslugi}
              inputValue={searchQuery}
              onInputChange={(_, v) => onSearchChange(v)}
              onChange={(_, v) => onSearchChange((v as string) || '')}
              slotProps={{
                popper: {
                  sx: { zIndex: 1400 },
                  placement: 'bottom-start',
                },
                paper: {
                  sx: {
                    mt: 0.5,
                    boxShadow: '0 8px 24px rgba(15, 28, 46, 0.12)',
                  },
                },
              }}
              ListboxProps={{ style: { maxHeight: 280 } }}
              sx={{
                width: { xs: '100%', md: 560 },
                '& .MuiAutocomplete-listbox': { py: 0.5 },
                '& .MuiAutocomplete-option': { whiteSpace: 'nowrap' },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Wyszukaj usluge..."
                  size="small"
                  aria-label="Szukaj uslugi"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon
                          sx={{ color: '#94A3B8', fontSize: 20 }}
                          aria-hidden="true"
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: '#F8FAFC',
                      '&:hover': {
                        bgcolor: '#F1F5F9',
                      },
                      '& fieldset': {
                        borderColor: '#E2E8F0',
                      },
                      '&:hover fieldset': {
                        borderColor: '#CBD5E1',
                      },
                    },
                  }}
                />
              )}
            />
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: '#64748B',
                whiteSpace: 'nowrap',
              }}
            >
              Znaleziono{' '}
              <Box component="span" sx={{ color: '#004078', fontWeight: 600 }}>
                {resultCount}
              </Box>{' '}
              z {totalCount} wpisow
            </Typography>
          </Stack>

          {/* Second row - Filter buttons */}
          <Stack
            direction="row"
            spacing={1.5}
            flexWrap="wrap"
            useFlexGap
            gap={1.5}
            alignItems="center"
          >
            {/* Forma wizyty dropdown */}
            <Button
              id="forma-filter-button"
              variant="outlined"
              endIcon={
                <ArrowDropDownIcon
                  sx={{
                    transform: formaAnchor ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                />
              }
              onClick={(e) => setFormaAnchor(e.currentTarget)}
              size="small"
              sx={filterSelectButtonSx(selectedForma.length > 0)}
            >
              <BusinessIcon sx={{ mr: 1, fontSize: 18 }} />
              Forma wizyty
              {selectedForma.length > 0 && ` (${selectedForma.length})`}
            </Button>

            {/* Status dropdown
            <Button
              id="status-filter-button"
              variant="outlined"
              endIcon={
                <ArrowDropDownIcon
                  sx={{
                    transform: statusAnchor ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                />
              }
              onClick={(e) => setStatusAnchor(e.currentTarget)}
              size="small"
              sx={filterSelectButtonSx(selectedStatuses.length > 0)}
            >
              <ScheduleIcon sx={{ mr: 1, fontSize: 18 }} />
              Status
              {selectedStatuses.length > 0 && ` (${selectedStatuses.length})`}
            </Button> */}

            {/* Usluga dropdown */}
            <Button
              id="type-filter-button"
              variant="outlined"
              endIcon={
                <ArrowDropDownIcon
                  sx={{
                    transform: typeAnchor ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                />
              }
              onClick={(e) => setTypeAnchor(e.currentTarget)}
              size="small"
              sx={filterSelectButtonSx(selectedTypes.length > 0)}
            >
              <MedicalServicesIcon sx={{ mr: 1, fontSize: 18 }} />
              Usluga
              {selectedTypes.length > 0 && ` (${selectedTypes.length})`}
            </Button>

            {/* Lekarz autocomplete */}
            <Autocomplete
              freeSolo
              options={availableDoctors}
              value={selectedDoctor}
              onChange={(_, newValue) => onDoctorFilterChange(newValue || '')}
              onInputChange={(_, newValue) => onDoctorFilterChange(newValue)}
              size="small"
              sx={{ minWidth: 180, ...filterFieldSx(Boolean(selectedDoctor)) }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Lekarz"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon
                          sx={{
                            fontSize: 18,
                            color: selectedDoctor ? '#004078' : '#005AA9',
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            {/* Date range pickers */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                type="date"
                size="small"
                label="Od"
                value={dateFrom}
                onChange={(e) => onDateFromChange(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ width: 160, ...filterFieldSx(Boolean(dateFrom)) }}
              />
              <TextField
                type="date"
                size="small"
                label="Do"
                value={dateTo}
                onChange={(e) => onDateToChange(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ width: 160, ...filterFieldSx(Boolean(dateTo)) }}
              />
            </Box>

            {/* Clear all button */}
            {activeFilterCount > 0 && (
              <Button
                variant="text"
                size="small"
                onClick={onClearAll}
                sx={{
                  textTransform: 'none',
                  color: '#EF4444',
                  '&:hover': {
                    bgcolor: '#FEF2F2',
                  },
                  ml: 'auto',
                }}
              >
                <CloseIcon sx={{ mr: 0.5, fontSize: 16 }} />
                Wyczysc filtry
              </Button>
            )}
          </Stack>

          {/* Active filters chips */}
          {activeFilterCount > 0 && (
            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 2 }}
              flexWrap="wrap"
              useFlexGap
            >
              {selectedForma.map((forma) => (
                <Chip
                  key={forma}
                  label={getFormaWizytyLabel(forma)}
                  onDelete={() => handleAgencyToggle(forma)}
                  size="small"
                  sx={{
                    bgcolor: '#E0F2FE',
                    color: '#0369A1',
                    '& .MuiChip-deleteIcon': {
                      color: '#0369A1',
                      '&:hover': {
                        color: '#0284C7',
                      },
                    },
                  }}
                />
              ))}
              {selectedStatuses.map((status) => (
                <Chip
                  key={status}
                  label={status}
                  onDelete={() => handleStatusToggle(status)}
                  size="small"
                  icon={
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: statusColor[status as Mission['status']],
                        ml: 1,
                      }}
                    />
                  }
                  sx={{
                    bgcolor: '#E0F2FE',
                    color: '#0369A1',
                    '& .MuiChip-deleteIcon': {
                      color: '#0369A1',
                      '&:hover': {
                        color: '#0284C7',
                      },
                    },
                  }}
                />
              ))}
              {selectedTypes.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  onDelete={() => handleTypeToggle(type)}
                  size="small"
                  sx={{
                    bgcolor: '#E0F2FE',
                    color: '#0369A1',
                    '& .MuiChip-deleteIcon': {
                      color: '#0369A1',
                      '&:hover': {
                        color: '#0284C7',
                      },
                    },
                  }}
                />
              ))}
              {selectedDoctor && (
                <Chip
                  label={`Lekarz: ${selectedDoctor}`}
                  onDelete={() => onDoctorFilterChange('')}
                  size="small"
                  sx={{
                    bgcolor: '#E0F2FE',
                    color: '#0369A1',
                    '& .MuiChip-deleteIcon': {
                      color: '#0369A1',
                      '&:hover': {
                        color: '#0284C7',
                      },
                    },
                  }}
                />
              )}
              {dateFrom && (
                <Chip
                  label={`Od: ${dateFrom}`}
                  onDelete={() => onDateFromChange('')}
                  size="small"
                  sx={{
                    bgcolor: '#E0F2FE',
                    color: '#0369A1',
                    '& .MuiChip-deleteIcon': {
                      color: '#0369A1',
                      '&:hover': {
                        color: '#0284C7',
                      },
                    },
                  }}
                />
              )}
              {dateTo && (
                <Chip
                  label={`Do: ${dateTo}`}
                  onDelete={() => onDateToChange('')}
                  size="small"
                  sx={{
                    bgcolor: '#E0F2FE',
                    color: '#0369A1',
                    '& .MuiChip-deleteIcon': {
                      color: '#0369A1',
                      '&:hover': {
                        color: '#0284C7',
                      },
                    },
                  }}
                />
              )}
            </Stack>
          )}

          {/* Dropdown Menus */}
          <Menu
            anchorEl={formaAnchor}
            open={Boolean(formaAnchor)}
            onClose={() => setFormaAnchor(null)}
            slotProps={{
              paper: {
                sx: {
                  minWidth: 180,
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  mt: 1,
                },
              },
            }}
          >
            {wizyty.map((wizyta) => (
              <MenuItem
                key={wizyta}
                onClick={() => handleAgencyToggle(wizyta)}
                selected={selectedForma.includes(wizyta)}
                sx={{
                  py: 1.25,
                  gap: 1.5,
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                  {getFormaWizytyLabel(wizyta)}
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
                sx: {
                  minWidth: 180,
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  mt: 1,
                },
              },
            }}
          >
            {statuses.map((status) => (
              <MenuItem
                key={status}
                onClick={() => handleStatusToggle(status)}
                selected={selectedStatuses.includes(status)}
                sx={{ py: 1.25, gap: 1.5, justifyContent: 'space-between' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: statusColor[status],
                    }}
                  />
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    {status}
                  </Typography>
                </Box>
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
                sx: {
                  minWidth: 180,
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  mt: 1,
                },
              },
            }}
          >
            {types.map((type) => (
              <MenuItem
                key={type}
                onClick={() => handleTypeToggle(type)}
                selected={selectedTypes.includes(type)}
                sx={{ py: 1.25, gap: 1.5, justifyContent: 'space-between' }}
              >
                <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
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
