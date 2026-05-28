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
import ComputerIcon from '@mui/icons-material/Computer';
import PlaceIcon from '@mui/icons-material/Place';
import { Mission } from '../types/mission';
import { StatusBadge } from './StatusBadge';
import { TypeBadge } from './TypeBadge';

interface AppointmentsTableProps {
  appointments: Mission[];
  onRowClick: (mission: Mission) => void;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const formatDate = (dateString: string): string => {
  const [day, month, year] = dateString.split('-');
  // desired format: dd.mm.yyyy
  return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
};

const formaConfig: Record<
  Mission['formaWizity'],
  { label: string; color: string; bg: string; border: string; Icon: typeof PhoneIcon }
> = {
  telefoniczna: {
    label: 'Telemedycyna',
    color: '#01847d',
    bg: 'rgba(1, 132, 125, 0.12)',
    border: 'rgba(1, 132, 125, 0.35)',
    Icon: PhoneIcon,
  },
  online: {
    label: 'Online',
    color: '#005aa9',
    bg: 'rgba(0, 90, 169, 0.12)',
    border: 'rgba(0, 90, 169, 0.35)',
    Icon: ComputerIcon,
  },
  'w placówce': {
    label: 'Wizyta w placówce',
    color: '#ad029c',
    bg: 'rgba(173, 2, 156, 0.10)',
    border: 'rgba(173, 2, 156, 0.35)',
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
      <TableContainer>
        <Table sx={{ minWidth: 900 }} aria-label="tabela wizyt">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor:'#F0F2F6',
                // backgroundColor: '#E2E8F0',
                '& th': {
                  fontWeight: 600,
                  color: '#475569',
                  fontSize: '0.8125rem',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  py: 2,
                },
              }}
            >
              <TableCell>Usluga</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Lekarz</TableCell>
              <TableCell>Typ</TableCell>
              <TableCell>Forma wizyty</TableCell>
              {/* <TableCell>Status</TableCell> */}
              <TableCell align="right">Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Brak wynikow dla wybranych filtrow
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedAppointments.map((appointment, index) => (
                <TableRow
                  key={`${appointment.id}-${index}`}
                  hover
                  onClick={() => onRowClick(appointment)}
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
                  }}
                >
                  <TableCell>
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
                  <TableCell>
                    <Typography
                      sx={{
                        color: '#475569',
                        fontSize: '0.875rem',
                      }}
                    >
                      {formatDate(appointment.launchDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: '#475569',
                        fontSize: '0.875rem',
                      }}
                    >
                      {appointment.lekarz.join(', ') || '—'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TypeBadge type={appointment.typ} />
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const cfg = formaConfig[appointment.formaWizity];
                      const FormaIcon = cfg.Icon;
                      return (
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        px: 1.25,
                        py: 0.45,
                        borderRadius: 1,
                        backgroundColor: cfg.bg,
                        color: cfg.color,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: `1px solid ${cfg.border}`,
                        gap: 0.75,
                      }}
                    >
                      <FormaIcon sx={{ fontSize: 16 }} />
                      {cfg.label}
                    </Box>
                      );
                    })()}
                  </TableCell>
                  {/* <TableCell>
                    <StatusBadge status={appointment.status} />
                  </TableCell> */}
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRowClick(appointment);
                      }}
                      aria-label="Zobacz szczegoly"
                      sx={{
                        color: '#94A3B8',
                        '&:hover': {
                          color: '#1E293B',
                          backgroundColor: '#F1F5F9',
                        },
                      }}
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
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
        labelRowsPerPage="Wierszy na strone"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} z ${count !== -1 ? count : `wiecej niz ${to}`}`
        }
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          '& .MuiTablePagination-toolbar': {
            px: 2,
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
