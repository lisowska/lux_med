import React, { useState, useMemo, useEffect } from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';

import MissionCard from './MissionCard';
import MissionDetail from './MissionDetail';
import { Mission } from '../types/mission';
import SearchIcon from '@mui/icons-material/Search';
import missionData from '../data/missionData.json';
import FilterPanel from './FilterPanel';
import HeaderHealth from './HeaderHealth';

const MainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgencies, setSelectedAgencies] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    'Odbyta',
  ]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const missions: Mission[] = missionData.missions as Mission[];

  const filteredMissions = useMemo(() => {
    return missions
      .filter((mission) => {
        if (searchQuery) {
          console.log('searchQuery', searchQuery);
          const query = searchQuery.toLowerCase();
          if (!mission.usluga.toLowerCase().includes(query)) {
            return false;
          }
        }

        if (
          selectedAgencies.length > 0 &&
          !selectedAgencies.includes(mission.formaWizity)
        ) {
          return false;
        }

        if (
          selectedStatuses.length > 0 &&
          !selectedStatuses.includes(mission.status)
        ) {
          return false;
        }

        if (
          selectedTypes.length > 0 &&
          !selectedTypes.includes(mission.usluga)
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => b.year - a.year);
  }, [
    missions,
    searchQuery,
    selectedAgencies,
    selectedStatuses,
    selectedTypes,
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
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F7F9FB' }}>
      <Box
        sx={{
          maxWidth: { xs: '64rem', lg: '80rem', xl: '80rem' },
          mx: 'auto',
          width: '100%',
          px: { xs: 2, md: 3 },
        }}
      >
        <HeaderHealth />
        <FilterPanel
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedForma={selectedAgencies}
          onAgencyFilterChange={setSelectedAgencies}
          selectedStatuses={selectedStatuses}
          onStatusFilterChange={setSelectedStatuses}
          selectedTypes={selectedTypes}
          onTypeFilterChange={setSelectedTypes}
          resultCount={filteredMissions.length}
          totalCount={missions.length}
          onClearAll={handleClearAll}
        />
      </Box>
      <Box
        sx={{
          maxWidth: { xs: '64rem', lg: '80rem', xl: '96rem' },
          mx: 'auto',
          width: '100%',
          p: { xs: 2, md: 3 },
        }}
      >
        {filteredMissions.length === 0 ? (
          <Paper
            sx={{
              p: 4,
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              style={{
                width: '45px',
                height: '45px',
                marginBottom: '5px',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background:
                  'linear-gradient(135deg, hsl(210 100% 45%) 0%, hsl(199 89% 48%) 100%)',
              }}
            >
              <SearchIcon sx={{ color: 'white' }} />
            </Box>
            <Typography variant="h6" color="#101D2E" gutterBottom>
              No missions found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try searching by a different mission name or adjusting your
              filters.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={2}>
            {filteredMissions.map((mission) => (
              <Grid item key={mission.id} xs={12} sm={6} md={4} lg={3}>
                <MissionCard mission={mission} onClick={handleMissionClick} />
              </Grid>
            ))}
          </Grid>
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
