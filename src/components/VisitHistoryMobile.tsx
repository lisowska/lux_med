import { useMemo, useState } from "react";
import {
  Box,
  Autocomplete,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Typography,
  Drawer,
  Button,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import ScienceIcon from "@mui/icons-material/Science";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BiotechIcon from '@mui/icons-material/Biotech';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PhoneIcon from "@mui/icons-material/Phone";
import ComputerIcon from "@mui/icons-material/Computer";
import type { Mission } from "../types/mission";
import missionData from "../data/missionData.json";
import ServiceToggle, { ServiceTab } from "./ServiceToggle";
import IconUsg from "../assets/usg.png";
import { TYPE_META, TypeIcon } from "./TypeIcon";
import { focusVisibleRing, focusVisibleRingOnDark } from "../styles/focus";
import { normalizeSearchLabel, uniqueSearchLabels } from "../utils/searchLabels";
import { formatIsoDateForDisplay } from "../utils/formatDate";
import { handleDateFieldClick } from "../utils/dateInput";
import { formatVisitCount } from "../utils/visitCount";
import ResultCountLabel from "./ResultCountLabel";

// Brand blue color
const BRAND_BLUE = "#005aa9";
const FILTER_BLUE_LIGHT = "#E8F4FD";
const FILTER_BLUE_HOVER = "#D6E4F7";
const FILTER_GREY_BORDER = "#E5E7EB";
const FILTER_CARD_SHADOW = "0 2px 10px rgba(15, 28, 46, 0.08)";
const BRAND_BLUE_DARK = "#004a8c";
const BRAND_BLUE_PRESSED = "#003d75";
const MIN_SEARCH_CHARS = 2;

type SearchOption = {
  label: string;
  group: "Usługi" | "Lekarze";
};

/** MUI Chip overrides – prevents grey hover / white-on-grey focus */
const formaQuickChipSx = (active: boolean) => ({
  bgcolor: active ? BRAND_BLUE : "#E1E8F8",
  color: active ? "#fff" : BRAND_BLUE,
  fontWeight: 600,
  flexShrink: 0,
  border: `2px solid ${active ? BRAND_BLUE : "transparent"}`,
  "& .MuiChip-icon": {
    color: `${active ? "#fff" : BRAND_BLUE} !important`,
  },
  "&&.MuiChip-clickable:hover, &&.MuiChip-clickable.Mui-focusVisible": {
    bgcolor: active ? BRAND_BLUE_DARK : FILTER_BLUE_HOVER,
    color: active ? "#fff" : BRAND_BLUE,
    borderColor: BRAND_BLUE,
    "& .MuiChip-icon": {
      color: `${active ? "#fff" : BRAND_BLUE} !important`,
    },
  },
  "&&.MuiChip-clickable:active": {
    bgcolor: active ? BRAND_BLUE_PRESSED : "#C5D9F0",
    color: active ? "#fff" : BRAND_BLUE,
    borderColor: BRAND_BLUE,
    "& .MuiChip-icon": {
      color: `${active ? "#fff" : BRAND_BLUE} !important`,
    },
  },
});

const filterTypChipSx = (active: boolean) => ({
  height: 40,
  borderRadius: 999,
  bgcolor: active ? FILTER_BLUE_LIGHT : "#fff",
  color: active ? BRAND_BLUE_DARK : "#4B5563",
  fontWeight: 600,
  fontSize: 14,
  border: `1.5px solid ${active ? BRAND_BLUE : FILTER_GREY_BORDER}`,
  "& .MuiChip-label": { px: 1.5 },
  "& .MuiChip-icon": {
    color: `${active ? BRAND_BLUE_DARK : "#6B7280"} !important`,
  },
  "&&.MuiChip-clickable:hover, &&.MuiChip-clickable.Mui-focusVisible": {
    bgcolor: active ? FILTER_BLUE_LIGHT : "#F9FAFB",
    color: active ? BRAND_BLUE_DARK : "#4B5563",
    borderColor: BRAND_BLUE,
    "& .MuiChip-icon": {
      color: `${active ? BRAND_BLUE_DARK : "#6B7280"} !important`,
    },
  },
  "&&.MuiChip-clickable:active": {
    bgcolor: active ? FILTER_BLUE_HOVER : "#F3F4F6",
    borderColor: BRAND_BLUE,
  },
});

const filterDrawerRowChipSx = (active: boolean) => ({
  ...filterTypChipSx(active),
  flex: 1,
  minWidth: 0,
  "& .MuiChip-label": {
    px: 1,
    fontSize: 13,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

const filterPillButtonSx = (active: boolean) => ({
  flex: 1,
  borderRadius: 999,
  textTransform: "none" as const,
  fontWeight: 600,
  fontSize: 15,
  py: 1.25,
  boxShadow: "none",
  bgcolor: active ? BRAND_BLUE : "#fff",
  color: active ? "#fff" : "#4B5563",
  border: `1.5px solid ${active ? BRAND_BLUE : FILTER_GREY_BORDER}`,
  "&:hover": {
    bgcolor: active ? BRAND_BLUE_DARK : "#F9FAFB",
    color: active ? "#fff" : "#4B5563",
    borderColor: active ? BRAND_BLUE_DARK : FILTER_GREY_BORDER,
    boxShadow: "none",
  },
  ...focusVisibleRing,
  "&:active": {
    bgcolor: active ? BRAND_BLUE_PRESSED : "#F3F4F6",
    color: active ? "#fff" : "#4B5563",
    boxShadow: "none",
  },
});

type FormaWizyty = Mission["formaWizity"];

const FORMA_META: Record<FormaWizyty, { color: string; bg: string; Icon: typeof PhoneIcon; label: string }> = {
  telefoniczna: { color: "#016B65", bg: "#E0F2F8", Icon: PhoneIcon, label: "Telemedycyna" },
  online: { color: "#004078", bg: "#E1E8F8", Icon: ComputerIcon, label: "Online" },
  "w placówce": { color: "#8B0278", bg: "#FCE8F9", Icon: PlaceIcon, label: "W placówce" },
};

const ALL_FORMY: FormaWizyty[] = ["telefoniczna", "online", "w placówce"];

// Etykieta w UI → wartość w danych (typ)
const TYP_FILTER_OPTIONS: { label: string; value: Mission["typ"] }[] = [
  { label: "Badanie", value: "Badanie" },
  { label: "Konsultacja", value: "Konsultacja" },
  { label: "Laboratoryjne", value: "Badania laboratoryjne" },
];

const typLabelByValue = Object.fromEntries(
  TYP_FILTER_OPTIONS.map((option) => [option.value, option.label]),
) as Record<Mission["typ"], string>;

const activeFilterChipSx = {
  height: 36,
  borderRadius: 999,
  bgcolor: FILTER_BLUE_LIGHT,
  color: BRAND_BLUE_DARK,
  fontWeight: 600,
  fontSize: 14,
  border: `1.5px solid ${BRAND_BLUE}`,
  "& .MuiChip-label": { px: 1.25 },
  "& .MuiChip-icon": {
    color: `${BRAND_BLUE} !important`,
  },
  "& .MuiChip-deleteIcon": {
    color: BRAND_BLUE,
    fontSize: 18,
    "&:hover": { color: BRAND_BLUE_DARK },
  },
};

interface VisitHistoryMobileProps {
  onMissionClick: (mission: Mission) => void;
  serviceTab: ServiceTab;
  onServiceTabChange: (tab: ServiceTab) => void;
}

export default function VisitHistoryMobile({ 
  onMissionClick, 
  serviceTab, 
  onServiceTabChange 
}: VisitHistoryMobileProps) {
  const missions: Mission[] = missionData.missions as Mission[];

  const [query, setQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState<string | null>(null);
  const [formy, setFormy] = useState<FormaWizyty[]>([]);
  const [typy, setTypy] = useState<Mission["typ"][]>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Draft state for batch filtering
  const [draftStatusTab, setDraftStatusTab] = useState<"zaplanowane" | "zrealizowane">("zaplanowane");
  const [draftFormy, setDraftFormy] = useState<FormaWizyty[]>([]);
  const [draftTypy, setDraftTypy] = useState<Mission["typ"][]>([]);
  const [draftDateFrom, setDraftDateFrom] = useState("");
  const [draftDateTo, setDraftDateTo] = useState("");
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const searchOptions = useMemo(() => {
    const uslugi = new Set<string>();
    const doctors: string[] = [];
    missions.forEach((m) => {
      uslugi.add(m.usluga);
      m.lekarz.forEach((d) => doctors.push(d));
    });
    const sortPl = (a: string, b: string) => a.localeCompare(b, "pl");
    return [
      ...Array.from(uslugi)
        .sort(sortPl)
        .map((label): SearchOption => ({ label, group: "Usługi" })),
      ...uniqueSearchLabels(doctors)
        .sort(sortPl)
        .map((label): SearchOption => ({ label, group: "Lekarze" })),
    ];
  }, [missions]);

  const getSearchLabel = (option: SearchOption | string) =>
    typeof option === "string" ? option : option.label;

  const canShowSearchList = query.trim().length >= MIN_SEARCH_CHARS;

  // Parse date (DD-MM-YYYY) to Date object
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const matchesDateRange = (launchDate: string, from: string, to: string) => {
    if (!from && !to) return true;
    const missionDay = parseDate(launchDate);
    missionDay.setHours(0, 0, 0, 0);
    if (from) {
      const fromDay = new Date(from);
      fromDay.setHours(0, 0, 0, 0);
      if (missionDay < fromDay) return false;
    }
    if (to) {
      const toDay = new Date(to);
      toDay.setHours(23, 59, 59, 999);
      if (missionDay > toDay) return false;
    }
    return true;
  };

  const dateFieldSx = (hasValue: boolean) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: 2.5,
      bgcolor: hasValue ? FILTER_BLUE_LIGHT : "#fff",
      "& fieldset": {
        borderColor: hasValue ? BRAND_BLUE : FILTER_GREY_BORDER,
      },
      "&:hover fieldset": {
        borderColor: BRAND_BLUE,
      },
      "&.Mui-focused fieldset": {
        borderColor: BRAND_BLUE,
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: BRAND_BLUE,
    },
  });

  const syncDraftFromApplied = () => {
    setDraftStatusTab(serviceTab);
    setDraftFormy(formy);
    setDraftTypy(typy);
    setDraftDateFrom(dateFrom);
    setDraftDateTo(dateTo);
    setDateRangeOpen(Boolean(dateFrom || dateTo));
  };

  const openDrawer = () => {
    syncDraftFromApplied();
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    syncDraftFromApplied();
    setDrawerOpen(false);
  };

  const applyDraft = () => {
    onServiceTabChange(draftStatusTab);
    setFormy(draftFormy);
    setTypy(draftTypy);
    setDateFrom(draftDateFrom);
    setDateTo(draftDateTo);
    setDrawerOpen(false);
  };

  const clearDraft = () => {
    setDraftStatusTab("zaplanowane");
    setDraftFormy([]);
    setDraftTypy([]);
    setDraftDateFrom("");
    setDraftDateTo("");
    setDateRangeOpen(false);
  };

  const tabTotalCount = useMemo(() => {
    const statusFilter = serviceTab === "zaplanowane" ? "Planowana" : "Odbyta";
    return missions.filter((m) => m.status === statusFilter).length;
  }, [missions, serviceTab]);

  const matchesSearch = (mission: Mission, search: string) => {
    if (!search) return true;
    const blob = `${mission.lekarz.map(normalizeSearchLabel).join(" ")} ${mission.usluga} ${mission.typ}`.toLowerCase();
    return blob.includes(normalizeSearchLabel(search).toLowerCase());
  };

  const draftCount = useMemo(() => {
    const search = (searchFilter || query).trim().toLowerCase();
    const statusFilter = draftStatusTab === 'zaplanowane' ? 'Planowana' : 'Odbyta';
    
    return missions.filter((m) => {
      if (m.status !== statusFilter) return false;
      if (draftFormy.length && !draftFormy.includes(m.formaWizity)) return false;
      if (draftTypy.length && !draftTypy.includes(m.typ)) return false;
      if (!matchesDateRange(m.launchDate, draftDateFrom, draftDateTo)) return false;
      if (!matchesSearch(m, search)) return false;
      return true;
    }).length;
  }, [query, searchFilter, draftStatusTab, draftFormy, draftTypy, draftDateFrom, draftDateTo, missions]);

  const draftActive =
    draftFormy.length +
    draftTypy.length +
    (draftDateFrom ? 1 : 0) +
    (draftDateTo ? 1 : 0);

  const filtered = useMemo(() => {
    const search = (searchFilter || query).trim().toLowerCase();
    const statusFilter = serviceTab === 'zaplanowane' ? 'Planowana' : 'Odbyta';
    
    return missions
      .filter((m) => {
        if (m.status !== statusFilter) return false;
        if (formy.length && !formy.includes(m.formaWizity)) return false;
        if (typy.length && !typy.includes(m.typ)) return false;
        if (!matchesDateRange(m.launchDate, dateFrom, dateTo)) return false;
        if (!matchesSearch(m, search)) return false;
        return true;
      })
      .sort((a, b) => {
        const dateA = parseDate(a.launchDate);
        const dateB = parseDate(b.launchDate);
        return dateB.getTime() - dateA.getTime();
      });
  }, [query, searchFilter, serviceTab, formy, typy, dateFrom, dateTo, missions]);

  const dateChipLabel = useMemo(() => {
    if (dateFrom && dateTo) {
      return `${formatIsoDateForDisplay(dateFrom)} – ${formatIsoDateForDisplay(dateTo)}`;
    }
    if (dateFrom) return `Od ${formatIsoDateForDisplay(dateFrom)}`;
    if (dateTo) return `Do ${formatIsoDateForDisplay(dateTo)}`;
    return "";
  }, [dateFrom, dateTo]);

  const hasActiveChips = Boolean(
    searchFilter || formy.length || typy.length || dateFrom || dateTo,
  );

  const activeFilters =
    formy.length +
    typy.length +
    (dateFrom ? 1 : 0) +
    (dateTo ? 1 : 0);

  const clearAll = () => {
    setQuery("");
    setSearchFilter(null);
    setFormy([]);
    setTypy([]);
    setDateFrom("");
    setDateTo("");
  };

  const commitSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setSearchFilter(trimmed);
    setQuery("");
  };

  // Group by Year-Month
  const grouped = useMemo(() => {
    const map = new Map<string, Mission[]>();
    filtered.forEach((m) => {
      const date = parseDate(m.launchDate);
      const key = date.toLocaleDateString("pl-PL", {
        month: "long",
        year: "numeric",
      });
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(m);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const toggleForma = (f: FormaWizyty) =>
    setFormy(formy.includes(f) ? formy.filter((x) => x !== f) : [...formy, f]);

  const toggleDraftForma = (f: FormaWizyty) =>
    setDraftFormy(draftFormy.includes(f) ? draftFormy.filter((x) => x !== f) : [...draftFormy, f]);

  const toggleDraftTyp = (value: Mission["typ"]) =>
    setDraftTypy(draftTypy.includes(value) ? draftTypy.filter((x) => x !== value) : [...draftTypy, value]);

  const srOnlySx = {
    position: "absolute" as const,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap" as const,
    border: 0,
  };

  return (
    <Box sx={{ position: "relative", pb: 2, px: 2, pt: 3 }}>
      <Typography component="h1" sx={srOnlySx}>
        Historia leczenia
      </Typography>

      {/* Service Toggle */}
      <Box sx={{ width: '100%', mb: 3 }}>
        <ServiceToggle
          value={serviceTab}
          onChange={onServiceTabChange}
        />
      </Box>

      {/* Sticky search */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          bgcolor: "#F8FAFC",
          pb: 2.5,
        }}
      >
        <Autocomplete
          freeSolo
          disableClearable
          options={searchOptions}
          groupBy={(option) =>
            typeof option === "string" ? "Wyniki" : option.group
          }
          getOptionLabel={getSearchLabel}
          isOptionEqualToValue={(option, value) =>
            getSearchLabel(option) === getSearchLabel(value)
          }
          filterOptions={(options, { inputValue }) => {
            const input = inputValue.trim().toLowerCase();
            if (input.length < MIN_SEARCH_CHARS) return [];
            return options.filter((option) =>
              getSearchLabel(option).toLowerCase().includes(input),
            );
          }}
          open={searchOpen && canShowSearchList}
          onOpen={() => {
            if (canShowSearchList) setSearchOpen(true);
          }}
          onClose={() => setSearchOpen(false)}
          inputValue={query}
          onInputChange={(_, v, reason) => {
            if (reason === "reset") {
              setQuery("");
              setSearchOpen(false);
              return;
            }
            setQuery(v);
            setSearchOpen(v.trim().length >= MIN_SEARCH_CHARS);
          }}
          onChange={(_, value) => {
            const label =
              typeof value === "string" ? value : value?.label ?? "";
            if (label.trim()) commitSearch(label);
          }}
          slotProps={{
            popper: { sx: { zIndex: 1400 } },
            paper: {
              sx: {
                mt: 0.5,
                borderRadius: 2,
                boxShadow: "0 8px 24px rgba(15, 28, 46, 0.12)",
              },
            },
          }}
          ListboxProps={{ style: { maxHeight: 280 } }}
          renderGroup={(params) => (
            <li key={params.key}>
              <Typography
                sx={{
                  px: 2,
                  pt: 1.25,
                  pb: 0.5,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                  color: "#64748B",
                }}
              >
                {params.group}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0 }}>
                {params.children}
              </Box>
            </li>
          )}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            const label = getSearchLabel(option);
            const isDoctor =
              typeof option === "object" && option.group === "Lekarze";
            const OptionIcon = isDoctor ? PersonIcon : MedicalServicesIcon;
            return (
              <Box
                component="li"
                key={key}
                {...optionProps}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 1.25,
                  px: 2,
                }}
              >
                <OptionIcon sx={{ fontSize: 20, color: "#6B7280", flexShrink: 0 }} />
                <Typography sx={{ fontSize: 15, color: "text.primary" }}>
                  {label}
                </Typography>
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Szukaj lekarza lub usługi..."
              aria-label="Szukaj lekarza lub usługi"
              fullWidth
              size="small"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commitSearch(query);
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 999, bgcolor: "#fff" },
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    {query ? (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setQuery("")}
                          aria-label="Wyczyść wpisywany tekst"
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />

        {hasActiveChips ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mt: 1.5,
            }}
          >
            {searchFilter ? (
              <Chip
                label={searchFilter}
                onDelete={() => setSearchFilter(null)}
                sx={activeFilterChipSx}
              />
            ) : null}
            {formy.map((forma) => {
              const FormaIcon = FORMA_META[forma].Icon;
              return (
                <Chip
                  key={forma}
                  icon={<FormaIcon sx={{ fontSize: "16px !important" }} />}
                  label={FORMA_META[forma].label}
                  onDelete={() => setFormy(formy.filter((f) => f !== forma))}
                  sx={activeFilterChipSx}
                />
              );
            })}
            {typy.map((typ) => (
              <Chip
                key={typ}
                label={typLabelByValue[typ] ?? typ}
                onDelete={() => setTypy(typy.filter((t) => t !== typ))}
                sx={activeFilterChipSx}
              />
            ))}
            {dateChipLabel ? (
              <Chip
                icon={<EventIcon sx={{ fontSize: "16px !important" }} />}
                label={dateChipLabel}
                onDelete={() => {
                  setDateFrom("");
                  setDateTo("");
                }}
                sx={activeFilterChipSx}
              />
            ) : null}
          </Box>
        ) : null}

        {/* Filtry – pod wyszukiwarką */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Button
            onClick={openDrawer}
            aria-label="Otwórz filtry wizyt"
            aria-haspopup="dialog"
            startIcon={<TuneIcon sx={{ fontSize: 20, color: BRAND_BLUE }} />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: 0.5,
              color: BRAND_BLUE,
              bgcolor: FILTER_BLUE_LIGHT,
              borderRadius: 999,
              px: 2,
              py: 0.75,
              minHeight: 40,
              boxShadow: "none",
              "&:hover": {
                bgcolor: FILTER_BLUE_HOVER,
                boxShadow: "none",
              },
              ...focusVisibleRing,
              "&:active": {
                bgcolor: "#C5D9F0",
                boxShadow: "none",
              },
              "& .MuiButton-startIcon": { mr: 0.75, ml: 0 },
            }}
          >
            FILTRUJ
            {activeFilters > 0 && (
              <Box
                component="span"
                sx={{
                  ml: 0.75,
                  minWidth: 20,
                  height: 20,
                  px: 0.75,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 999,
                  bgcolor: BRAND_BLUE,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {activeFilters}
              </Box>
            )}
          </Button>
        </Box>

        {/* Quick forma chips */}
        {/* <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 1,
            overflowX: "auto",
            pb: 0.5,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {ALL_FORMY.map((f) => {
            const active = formy.includes(f);
            const meta = FORMA_META[f];
            const Icon = meta.Icon;
            return (
              <Chip
                key={f}
                icon={<Icon sx={{ fontSize: 16 }} />}
                label={meta.label}
                onClick={() => toggleForma(f)}
                sx={formaQuickChipSx(active)}
              />
            );
          })}
        </Box> */}
      </Box>

      {/* Results count + clear */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
          mt: 0.5,
        }}
      >
        <ResultCountLabel
          filtered={filtered.length}
          total={tabTotalCount}
          hasActiveFilters={hasActiveChips}
          highlightColor={BRAND_BLUE}
        />
        {(activeFilters > 0 || searchFilter || query.trim()) && (
          <Button
            size="small"
            sx={{ color: BRAND_BLUE, textTransform: "none" }}
            onClick={clearAll}
          >
            Wyczyść filtry
          </Button>
        )}
      </Box>

      {/* Cards grouped by month */}
      {grouped.length === 0 && (
        <Box sx={{ py: 6, textAlign: "center" }}>
          <Typography color="text.secondary">Brak wyników.</Typography>
        </Box>
      )}

      {grouped.map(([month, items]) => (
        <Box key={month} sx={{ mb: 2 }}>
          <Typography
            variant="overline"
            sx={{
              color: "text.secondary",
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "capitalize",
            }}
          >
            {month}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 0.5 }}>
            {items.map((m) => {
              const formaMeta = FORMA_META[m.formaWizity];
              const dateLabel = parseDate(m.launchDate).toLocaleDateString("pl-PL", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              });
              const cardLabel = `${m.typ} ${m.usluga}, ${dateLabel}`;
              return (
                <Box
                  key={m.id}
                  component="article"
                  role="button"
                  tabIndex={0}
                  aria-label={`Otwórz szczegóły wizyty: ${cardLabel}`}
                  onClick={() => onMissionClick(m)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onMissionClick(m);
                    }
                  }}
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "#F1F5F9",
                    p: 2.25,
                    boxShadow: "0 2px 12px rgba(15, 28, 46, 0.06)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    cursor: "pointer",
                    transition: "border-color .15s",
                    "&:active": { borderColor: BRAND_BLUE },
                    "&:focus": { outline: "none" },
                    "&:focus-visible": {
                      outline: `2px solid ${BRAND_BLUE}`,
                      outlineOffset: 2,
                      borderColor: BRAND_BLUE,
                    },
                  }}
                >
                  {/* Nagłówek: forma + tytuł */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      pb: 1.25,
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                      <formaMeta.Icon sx={{ fontSize: 16, color: formaMeta.color }} />
                      <Typography sx={{ fontSize: 14, fontWeight: 600, color: formaMeta.color }}>
                        {formaMeta.label}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                      <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
                        <TypeIcon typ={m.typ} size={(TYPE_META[m.typ] || TYPE_META.Konsultacja).iconSize ?? 24} />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: 22,
                          fontWeight: 800,
                          letterSpacing: -0.2,
                          color: "text.primary",
                          lineHeight: 1.15,
                          minWidth: 0,
                        }}
                      >
                        {m.typ} {m.usluga}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Szczegóły */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
                        <EventIcon sx={{ fontSize: 17, color: "#374151" }} />
                        <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#374151" }} noWrap>
                          {dateLabel}
                        </Typography>
                      </Box>
                      {/* optional time if ever added */}
                      {"time" in (m as any) && (m as any).time ? (
                        <Typography sx={{ fontSize: 16, fontWeight: 500, color: "#6B7280" }}>
                          {(m as any).time}
                        </Typography>
                      ) : null}
                    </Box>

                    {m.lekarz.length > 0 && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                        <PersonIcon sx={{ fontSize: 16, color: "#6B7280" }} />
                        <Typography sx={{ fontSize: 15, fontWeight: 400, color: "#6B7280" }} noWrap>
                          {m.lekarz.join(", ")}
                        </Typography>
                      </Box>
                    )}

                    {m.formaWizity === "w placówce" && m.placowka ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                        <PlaceIcon sx={{ fontSize: 16, color: "#6B7280" }} />
                        <Typography sx={{ fontSize: 15, fontWeight: 400, color: "#6B7280" }} noWrap>
                          {m.placowka}
                        </Typography>
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      ))}

      {/* Filter bottom sheet */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={closeDrawer}
        aria-labelledby="filter-drawer-title"
        PaperProps={{
          sx: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: "92vh",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#fff",
            boxShadow: "0 -8px 32px rgba(15, 28, 46, 0.12)",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2,
            pt: 2,
            pb: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={closeDrawer}
            aria-label="Zamknij filtry"
            size="small"
            sx={{
              bgcolor: "#fff",
              borderRadius: "50%",
              boxShadow: FILTER_CARD_SHADOW,
              width: 40,
              height: 40,
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: 22 }} />
          </IconButton>
          <Typography
            id="filter-drawer-title"
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: 18,
              color: "text.primary",
              flex: 1,
              textAlign: "center",
            }}
          >
            Filtruj wizyty
          </Typography>
          <Button
            size="small"
            onClick={clearDraft}
            disabled={draftActive === 0}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: 15,
              color: "#005aa9",
              minWidth: "auto",
              "&.Mui-disabled": { color: "#D1D5DB" },
            }}
          >
            Wyczyść
          </Button>
        </Box>

        {/* Scrollable body */}
        <Box sx={{ flex: 1, overflowY: "auto", px: 2, py: 0.5 }}>
          {/* Status wizyty */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 15, color: "text.primary", mb: 1.5 }}>
              Status wizyty
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {(["zaplanowane", "zrealizowane"] as const).map((tab) => {
                const active = draftStatusTab === tab;
                const label = tab === "zaplanowane" ? "Zaplanowane" : "Zrealizowane";
                return (
                  <Button
                    key={tab}
                    onClick={() => setDraftStatusTab(tab)}
                    disableRipple
                    sx={filterPillButtonSx(active)}
                  >
                    {label}
                  </Button>
                );
              })}
            </Box>
          </Box>

          {/* Forma wizyty */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 15, color: "text.primary", mb: 1.5 }}>
              Forma wizyty
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {ALL_FORMY.map((f) => {
                const active = draftFormy.includes(f);
                const meta = FORMA_META[f];
                const Icon = meta.Icon;
                return (
                  <Chip
                    key={f}
                    icon={<Icon sx={{ fontSize: "18px !important" }} />}
                    label={meta.label}
                    onClick={() => toggleDraftForma(f)}
                    sx={filterDrawerRowChipSx(active)}
                  />
                );
              })}
            </Box>
          </Box>

          {/* Typ */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 15, color: "text.primary", mb: 1.5 }}>
              Typ
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {TYP_FILTER_OPTIONS.map(({ label, value }) => {
                const active = draftTypy.includes(value);
                const TypIcon =
                  value === "Konsultacja"
                    ? ChatBubbleOutlineIcon
                    : value === "Badania laboratoryjne"
                      ? BiotechIcon
                      : ScienceIcon;

                return (
                  <Chip
                    key={value}
                    icon={
                      value === "Badanie" ? (
                        <Box
                          component="img"
                          src={IconUsg}
                          alt=""
                          sx={{
                            height: "22px !important",
                            objectFit: "contain",
                            display: "block",
                          }}
                        />
                      ) : (
                        <TypIcon sx={{ fontSize: "18px !important" }} />
                      )
                    }
                    label={label}
                    onClick={() => toggleDraftTyp(value)}
                    sx={filterDrawerRowChipSx(active)}
                  />
                );
              })}
            </Box>
          </Box>

          {/* Zakres dat */}
          <Box sx={{ mb: 2 }}>
            <Box
              role="button"
              tabIndex={0}
              aria-expanded={dateRangeOpen}
              aria-controls="date-range-panel"
              onClick={() => setDateRangeOpen((open) => !open)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setDateRangeOpen((open) => !open);
                }
              }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                mb: dateRangeOpen ? 1.5 : 0,
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: 15, color: "text.primary" }}>
                Zakres dat
              </Typography>
              <ExpandMoreIcon
                sx={{
                  color: "#6B7280",
                  transition: "transform 0.2s",
                  transform: dateRangeOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </Box>
            <Collapse in={dateRangeOpen}>
              <Box id="date-range-panel" sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <TextField
                  type="date"
                  label="Od dnia"
                  value={draftDateFrom}
                  onChange={(e) => setDraftDateFrom(e.target.value)}
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    onClick: handleDateFieldClick,
                    sx: { cursor: "pointer" },
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon
                          sx={{ fontSize: 18, color: draftDateFrom ? BRAND_BLUE : "#9CA3AF" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={dateFieldSx(Boolean(draftDateFrom))}
                />
                <TextField
                  type="date"
                  label="Do dnia"
                  value={draftDateTo}
                  onChange={(e) => setDraftDateTo(e.target.value)}
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: draftDateFrom || undefined }}
                  InputProps={{
                    onClick: handleDateFieldClick,
                    sx: { cursor: "pointer" },
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon
                          sx={{ fontSize: 18, color: draftDateTo ? BRAND_BLUE : "#9CA3AF" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={dateFieldSx(Boolean(draftDateTo))}
                />
              </Box>
            </Collapse>
          </Box>
        </Box>

        {/* Sticky CTA */}
        <Box
          sx={{
            px: 2,
            py: 2,
            pt: 1,
            borderTop: "1px solid",
            borderColor: "#F3F4F6",
            pb: "calc(16px + env(safe-area-inset-bottom))",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={applyDraft}
            disableRipple
            sx={{
              textTransform: "none",
              fontWeight: 700,
              py: 1.75,
              borderRadius: 999,
              fontSize: 16,
              bgcolor: BRAND_BLUE,
              boxShadow: "none",
              "&:hover": { bgcolor: BRAND_BLUE_DARK, boxShadow: "none" },
              ...focusVisibleRingOnDark,
              "&:active": { bgcolor: BRAND_BLUE_PRESSED, boxShadow: "none" },
            }}
          >
            Pokaż {formatVisitCount(draftCount)}
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
