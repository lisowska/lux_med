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
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const getFormaWizytyLabel = (forma: Mission['formaWizity']): string => {
  const labels: Record<Mission['formaWizity'], string> = {
    telefoniczna: 'Telefoniczna',
    online: 'Online',
    'w placówce': 'W placówce',
  };
  return labels[forma] || forma;
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
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'white',
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 900 }} aria-label="tabela wizyt">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#F8FAFC',
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
              <TableCell>Data i godzina</TableCell>
              <TableCell>Lekarz</TableCell>
              <TableCell>Typ</TableCell>
              <TableCell>Forma wizyty</TableCell>
              <TableCell>Status</TableCell>
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
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: '#F1F5F9',
                        color: '#475569',
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                      }}
                    >
                      {getFormaWizytyLabel(appointment.formaWizity)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={appointment.status} />
                  </TableCell>
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
