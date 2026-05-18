import React, { useState, useMemo, useEffect } from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import Header from './Header';
import MissionCard from './MissionCard';
import MissionDetail from './MissionDetail';
import { Mission } from '../types/mission';
import SearchIcon from '@mui/icons-material/Search';
import missionData from '../data/missionData.json';
import FilterPanel from './FilterPanel';

const MainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgencies, setSelectedAgencies] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    'Success',
  ]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('spaceMissionsFavorites');
    return stored ? JSON.parse(stored) : [];
  });

  const missions: Mission[] = missionData.missions as Mission[];

  useEffect(() => {
    localStorage.setItem('spaceMissionsFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const filteredMissions = useMemo(() => {
    return missions
      .filter((mission) => {
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          if (!mission.name.toLowerCase().includes(query)) {
            return false;
          }
        }

        if (
          selectedAgencies.length > 0 &&
          !selectedAgencies.includes(mission.agency)
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
          !selectedTypes.includes(mission.missionType)
        ) {
          return false;
        }

        if (showFavoritesOnly && !favorites.includes(mission.id)) {
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
    showFavoritesOnly,
    favorites,
  ]);

  const handleFavoriteToggle = (missionId: string) => {
    setFavorites((prev) => {
      if (prev.includes(missionId)) {
        return prev.filter((id) => id !== missionId);
      } else {
        return [...prev, missionId];
      }
    });
  };

  const handleMissionClick = (mission: Mission) => {
    setSelectedMission(mission);
    setIsDetailOpen(true);
  };
  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedAgencies([]);
    setSelectedStatuses([]);
    setSelectedTypes([]);
    setShowFavoritesOnly(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />
      <Box
        sx={{
          maxWidth: { xs: '64rem', lg: '80rem', xl: '96rem' },
          mx: 'auto',
          width: '100%',
          px: { xs: 2, md: 3 },
        }}
      >
        <FilterPanel
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedAgencies={selectedAgencies}
          onAgencyFilterChange={setSelectedAgencies}
          selectedStatuses={selectedStatuses}
          onStatusFilterChange={setSelectedStatuses}
          selectedTypes={selectedTypes}
          onTypeFilterChange={setSelectedTypes}
          showFavoritesOnly={showFavoritesOnly}
          onFavoritesToggle={() => setShowFavoritesOnly(!showFavoritesOnly)}
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
                <MissionCard
                  mission={mission}
                  isFavorite={favorites.includes(mission.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                  onClick={handleMissionClick}
                />
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
