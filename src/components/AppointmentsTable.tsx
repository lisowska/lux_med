import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PhoneIcon from '@mui/icons-material/Phone';
import { formatLaunchDate } from '../utils/formatDate';
import ComputerIcon from '@mui/icons-material/Computer';
import PlaceIcon from '@mui/icons-material/Place';
import { Mission } from '../types/mission';
import { StatusBadge } from './StatusBadge';
import { TypeBadge } from './TypeBadge';
import { TABLE_BADGE_ICON_SIZE, tableBadgeBaseSx } from './styleUtils';

interface AppointmentsTableProps {
  appointments: Mission[];
  onRowClick: (mission: Mission) => void;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const formaConfig: Record<
  Mission['formaWizity'],
  { label: string; color: string; bg: string; border: string; Icon: typeof PhoneIcon }
> = {
  telefoniczna: {
    label: 'Telemedycyna',
    color: '#016B65',
    bg: 'rgba(1, 132, 125, 0.12)',
    border: 'rgba(1, 107, 101, 0.35)',
    Icon: PhoneIcon,
  },
  online: {
    label: 'Online',
    color: '#004078',
    bg: 'rgba(0, 90, 169, 0.12)',
    border: 'rgba(0, 64, 120, 0.35)',
    Icon: ComputerIcon,
  },
  'w placówce': {
    label: 'Wizyta w placówce',
    color: '#8B0278',
    bg: 'rgba(173, 2, 156, 0.10)',
    border: 'rgba(139, 2, 120, 0.35)',
    Icon: PlaceIcon,
  },
};

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  appointments,
  onRowClick,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const paginatedAppointments = appointments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        borderTop: 'none',
        backgroundColor: 'white',
      }}
    >
      <TableContainer sx={{ width: '100%' }}>
        <Table
          sx={{
            width: '100%',
            tableLayout: 'fixed',
            '& .MuiTableCell-root:first-of-type': { pl: 3 },
            '& .MuiTableCell-root:last-of-type': {
              width: 132,
              minWidth: 132,
              maxWidth: 132,
              pr: 3,
              pl: 1,
              textAlign: 'right',
              whiteSpace: 'nowrap',
              overflow: 'visible',
            },
          }}
          aria-label="tabela wizyt"
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor:'#F0F2F6',
                '& th': {
                  fontWeight: 600,
                  color: '#475569',
                  fontSize: '0.8125rem',
                  borderTop: '1px solid',
                  borderBottom: '1px solid',
                  borderColor: '#E2E8F0',
                  py: 2,
                  whiteSpace: 'nowrap',
                },
              }}
            >
              <TableCell scope="col" sx={{ width: '13%' }}>Usługa</TableCell>
              <TableCell scope="col" sx={{ width: '10%' }}>Data</TableCell>
              <TableCell scope="col" sx={{ width: '20%' }}>Lekarz</TableCell>
              <TableCell scope="col" sx={{ width: '23%' }}>Typ</TableCell>
              <TableCell scope="col">Forma wizyty</TableCell>
              <TableCell scope="col">Szczegóły</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Brak wyników dla wybranych filtrów
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedAppointments.map((appointment, index) => {
                const rowLabel = `${appointment.usluga}, ${formatLaunchDate(appointment.launchDate)}, ${appointment.lekarz.join(', ') || 'brak lekarza'}`;
                return (
                <TableRow
                  key={`${appointment.id}-${index}`}
                  hover
                  tabIndex={0}
                  role="button"
                  aria-label={`Otwórz szczegóły wizyty: ${rowLabel}`}
                  onClick={() => onRowClick(appointment)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onRowClick(appointment);
                    }
                  }}
                  sx={{
                    cursor: 'pointer',
                    '&:last-child td, &:last-child th': { border: 0 },
                    '& td': {
                      py: 2,
                      fontSize: '0.875rem',
                    },
                    '&:hover': {
                      backgroundColor: '#F8FAFC',
                    },
                    '&:focus': { outline: 'none' },
                    '&:focus-visible': {
                      outline: '2px solid #005AA9',
                      outlineOffset: -2,
                      backgroundColor: '#F8FAFC',
                    },
                  }}
                >
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: '#1E293B',
                        fontSize: '0.875rem',
                      }}
                    >
                      {appointment.usluga}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <Typography
                      sx={{
                        color: '#475569',
                        fontSize: '0.875rem',
                      }}
                    >
                      {formatLaunchDate(appointment.launchDate)}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: 0,
                    }}
                  >
                    <Typography
                      noWrap
                      title={appointment.lekarz.join(', ') || undefined}
                      sx={{
                        color: '#475569',
                        fontSize: '0.875rem',
                      }}
                    >
                      {appointment.lekarz.join(', ') || '—'}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <TypeBadge type={appointment.typ} />
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {(() => {
                      const cfg = formaConfig[appointment.formaWizity];
                      const FormaIcon = cfg.Icon;
                      return (
                    <Box
                      sx={{
                        ...tableBadgeBaseSx,
                        backgroundColor: cfg.bg,
                        color: cfg.color,
                        border: `1px solid ${cfg.border}`,
                      }}
                    >
                      <FormaIcon sx={{ fontSize: TABLE_BADGE_ICON_SIZE }} />
                      {cfg.label}
                    </Box>
                      );
                    })()}
                  </TableCell>
                  {/* <TableCell>
                    <StatusBadge status={appointment.status} />
                  </TableCell> */}
                  <TableCell>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick(appointment);
                        }}
                        aria-label="Zobacz szczegóły"
                        sx={{
                          mr: -0.75,
                          color: '#64748B',
                          '&:hover': {
                            color: '#1E293B',
                            backgroundColor: '#F1F5F9',
                          },
                        }}
                      >
                        <ChevronRightIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={appointments.length}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Wierszy na stronę"
        labelDisplayedRows={({ count }) => {
          const totalPages = Math.max(1, Math.ceil(count / rowsPerPage));
          return `${page + 1} z ${totalPages}`;
        }}
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          '& .MuiTablePagination-toolbar': {
            px: 3,
          },
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows':
            {
              fontSize: '0.875rem',
              color: '#475569',
            },
        }}
      />
    </Paper>
  );
};

export default AppointmentsTable;
