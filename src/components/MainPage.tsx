import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper } from '@mui/material';

import MissionDetail from './MissionDetail';
import { Mission } from '../types/mission';
import SearchIcon from '@mui/icons-material/Search';
import missionData from '../data/missionData.json';
import FilterPanel from './FilterPanel';
import HeaderHealth from './HeaderHealth';
import AppointmentsTable from './AppointmentsTable';
import VisitHistoryMobile from './VisitHistoryMobile';
import { useIsMobile } from '../hooks/use-mobile';

const MainPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgencies, setSelectedAgencies] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const missions: Mission[] = missionData.missions as Mission[];

  // Extract unique doctors for autocomplete
  const availableDoctors = useMemo(() => {
    const doctors = new Set<string>();
    missions.forEach((mission) => {
      mission.lekarz.forEach((doc) => doctors.add(doc));
    });
    return Array.from(doctors).sort();
  }, [missions]);

  // Parse date string (DD-MM-YYYY) to Date object
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('-');
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const filteredMissions = useMemo(() => {
    return missions
      .filter((mission) => {
        // Search query filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          if (!mission.usluga.toLowerCase().includes(query)) {
            return false;
          }
        }

        // Forma wizyty filter
        if (
          selectedAgencies.length > 0 &&
          !selectedAgencies.includes(mission.formaWizity)
        ) {
          return false;
        }

        // Status filter
        if (
          selectedStatuses.length > 0 &&
          !selectedStatuses.includes(mission.status)
        ) {
          return false;
        }

        // Usluga filter
        if (
          selectedTypes.length > 0 &&
          !selectedTypes.includes(mission.usluga)
        ) {
          return false;
        }

        // Doctor filter
        if (selectedDoctor) {
          const doctorMatch = mission.lekarz.some((doc) =>
            doc.toLowerCase().includes(selectedDoctor.toLowerCase())
          );
          if (!doctorMatch) {
            return false;
          }
        }

        // Date range filter
        if (dateFrom || dateTo) {
          const missionDate = parseDate(mission.launchDate);

          if (dateFrom) {
            const fromDate = new Date(dateFrom);
            if (missionDate < fromDate) {
              return false;
            }
          }

          if (dateTo) {
            const toDate = new Date(dateTo);
            if (missionDate > toDate) {
              return false;
            }
          }
        }

        return true;
      })
      .sort((a, b) => {
        const dateA = parseDate(a.launchDate);
        const dateB = parseDate(b.launchDate);
        return dateB.getTime() - dateA.getTime();
      });
  }, [
    missions,
    searchQuery,
    selectedAgencies,
    selectedStatuses,
    selectedTypes,
    selectedDoctor,
    dateFrom,
    dateTo,
  ]);

  const handleMissionClick = (mission: Mission) => {
    setSelectedMission(mission);
    setIsDetailOpen(true);
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedAgencies([]);
    setSelectedStatuses([]);
    setSelectedTypes([]);
    setSelectedDoctor('');
    setDateFrom('');
    setDateTo('');
    setPage(0);
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Mobile view
  if (isMobile) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
        <Box sx={{ px: 2, pt: 2 }}>
          <HeaderHealth />
        </Box>
        <VisitHistoryMobile onMissionClick={handleMissionClick} />
        <MissionDetail
          mission={selectedMission}
          open={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
        />
      </Box>
    );
  }

  // Desktop view
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Box
        sx={{
          maxWidth: { xs: '100%', lg: '1400px' },
          mx: 'auto',
          width: '100%',
          px: { xs: 2, md: 3 },
        }}
      >
        <HeaderHealth />
        <FilterPanel
          searchQuery={searchQuery}
          onSearchChange={(query) => {
            setSearchQuery(query);
            setPage(0);
          }}
          selectedForma={selectedAgencies}
          onAgencyFilterChange={(agencies) => {
            setSelectedAgencies(agencies);
            setPage(0);
          }}
          selectedStatuses={selectedStatuses}
          onStatusFilterChange={(statuses) => {
            setSelectedStatuses(statuses);
            setPage(0);
          }}
          selectedTypes={selectedTypes}
          onTypeFilterChange={(types) => {
            setSelectedTypes(types);
            setPage(0);
          }}
          selectedDoctor={selectedDoctor}
          onDoctorFilterChange={(doctor) => {
            setSelectedDoctor(doctor);
            setPage(0);
          }}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateFromChange={(date) => {
            setDateFrom(date);
            setPage(0);
          }}
          onDateToChange={(date) => {
            setDateTo(date);
            setPage(0);
          }}
          resultCount={filteredMissions.length}
          totalCount={missions.length}
          onClearAll={handleClearAll}
          availableDoctors={availableDoctors}
        />
      </Box>
      <Box
        sx={{
          maxWidth: { xs: '100%', lg: '1400px' },
          mx: 'auto',
          width: '100%',
          p: { xs: 2, md: 3 },
        }}
      >
        {filteredMissions.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
            elevation={0}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                mb: 2,
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F0F9FF',
              }}
            >
              <SearchIcon sx={{ color: '#0EA5E9', fontSize: 28 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{ color: '#1E293B', fontWeight: 600, mb: 1 }}
            >
              Brak wynikow
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              Sprobuj wyszukac inna usluge lub dostosuj filtry
            </Typography>
          </Paper>
        ) : (
          <AppointmentsTable
            appointments={filteredMissions}
            onRowClick={handleMissionClick}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        )}
      </Box>
      <MissionDetail
        mission={selectedMission}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </Box>
  );
};

export default MainPage;
