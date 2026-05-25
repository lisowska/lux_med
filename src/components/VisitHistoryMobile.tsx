import { useMemo, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Typography,
  Drawer,
  Button,
  Badge,
  Radio,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ScienceIcon from "@mui/icons-material/Science";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import ComputerIcon from "@mui/icons-material/Computer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SpaIcon from "@mui/icons-material/Spa";
import type { Mission, MissionStatus } from "../types/mission";
import missionData from "../data/missionData.json";
import ServiceToggle, { ServiceTab } from "./ServiceToggle";

// Brand blue color
const BRAND_BLUE = "#005aa9";
const FILTER_BLUE_LIGHT = "#E8F4FD";
const FILTER_BLUE_HOVER = "#D6E4F7";
const FILTER_GREY_BORDER = "#E5E7EB";
const FILTER_CARD_SHADOW = "0 2px 10px rgba(15, 28, 46, 0.08)";
const BRAND_BLUE_DARK = "#004a8c";
const BRAND_BLUE_PRESSED = "#003d75";

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
  color: active ? BRAND_BLUE : "#6B7280",
  fontWeight: 600,
  fontSize: 14,
  border: `1.5px solid ${active ? BRAND_BLUE : FILTER_GREY_BORDER}`,
  "& .MuiChip-label": { px: 1.5 },
  "& .MuiChip-icon": {
    color: `${active ? BRAND_BLUE : "#9CA3AF"} !important`,
  },
  "&&.MuiChip-clickable:hover, &&.MuiChip-clickable.Mui-focusVisible": {
    bgcolor: active ? FILTER_BLUE_LIGHT : "#F9FAFB",
    color: active ? BRAND_BLUE : "#6B7280",
    borderColor: BRAND_BLUE,
    "& .MuiChip-icon": {
      color: `${active ? BRAND_BLUE : "#9CA3AF"} !important`,
    },
  },
  "&&.MuiChip-clickable:active": {
    bgcolor: active ? FILTER_BLUE_HOVER : "#F3F4F6",
    borderColor: BRAND_BLUE,
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
  color: active ? "#fff" : "#6B7280",
  border: `1.5px solid ${active ? BRAND_BLUE : FILTER_GREY_BORDER}`,
  "&:hover": {
    bgcolor: active ? BRAND_BLUE_DARK : "#F9FAFB",
    color: active ? "#fff" : "#6B7280",
    borderColor: active ? BRAND_BLUE_DARK : FILTER_GREY_BORDER,
    boxShadow: "none",
  },
  "&:focus, &:focus-visible": {
    bgcolor: active ? BRAND_BLUE : "#fff",
    color: active ? "#fff" : "#6B7280",
    borderColor: BRAND_BLUE,
    boxShadow: "none",
  },
  "&:active": {
    bgcolor: active ? BRAND_BLUE_PRESSED : "#F3F4F6",
    color: active ? "#fff" : "#6B7280",
    boxShadow: "none",
  },
});

const filterFormaCardSx = (active: boolean) => ({
  flex: 1,
  py: 2,
  px: 1,
  borderRadius: 2.5,
  border: `2px solid ${active ? BRAND_BLUE : "transparent"}`,
  bgcolor: active ? FILTER_BLUE_LIGHT : "#fff",
  boxShadow: FILTER_CARD_SHADOW,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: 1,
  cursor: "pointer",
  transition: "border-color 0.15s, background-color 0.15s",
  "&:hover": {
    bgcolor: active ? FILTER_BLUE_LIGHT : "#F9FAFB",
    borderColor: active ? BRAND_BLUE : FILTER_GREY_BORDER,
  },
  "&:focus-visible": {
    outline: `2px solid ${BRAND_BLUE}`,
    outlineOffset: 2,
    bgcolor: active ? FILTER_BLUE_LIGHT : "#fff",
    borderColor: BRAND_BLUE,
  },
  "&:active": {
    bgcolor: active ? FILTER_BLUE_HOVER : "#F3F4F6",
    borderColor: BRAND_BLUE,
  },
});

type FormaWizyty = Mission["formaWizity"];

const TYPE_META: Record<string, { color: string; bg: string; Icon: typeof LocalHospitalIcon }> = {
  Badanie: { color: "#0A6E8C", bg: "#E0F2F8", Icon: ScienceIcon },
  Konsultacja: { color: BRAND_BLUE, bg: "#E1E8F8", Icon: LocalHospitalIcon },
  "Badania laboratoryjne": { color: "#5B2D90", bg: "#EFE6FA", Icon: ScienceIcon },
  USG: { color: "#0A6E8C", bg: "#E0F2F8", Icon: ScienceIcon },
};

const STATUS_META: Record<MissionStatus, { color: string; bg: string }> = {
  Odbyta: { color: "#1a6b14", bg: "#E4F5E0" },
  Planowana: { color: "#002677", bg: "#E1E8F8" },
  Anulowana: { color: "#8a1a1a", bg: "#FBE3E3" },
};

const FORMA_META: Record<FormaWizyty, { color: string; bg: string; Icon: typeof PhoneIcon; label: string }> = {
  telefoniczna: { color: "#0A6E8C", bg: "#E0F2F8", Icon: PhoneIcon, label: "Mobile" },
  online: { color: "#5B2D90", bg: "#EFE6FA", Icon: ComputerIcon, label: "Online" },
  "w placówce": { color: BRAND_BLUE, bg: "#E1E8F8", Icon: PlaceIcon, label: "Placówka" },
};

const ALL_FORMY: FormaWizyty[] = ["telefoniczna", "online", "w placówce"];

// Typ options for the filter
const TYP_OPTIONS = ["Badanie", "Konsultacja", "Laboratoryjne"];

// Specjalista options with icons
const SPECJALISTA_OPTIONS: { label: string; Icon: typeof FavoriteIcon }[] = [
  { label: "Kardiolog", Icon: FavoriteIcon },
  { label: "Stomatolog", Icon: MedicalServicesIcon },
  { label: "Dietetyk", Icon: RestaurantIcon },
  { label: "Dermatolog", Icon: SpaIcon },
];

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
  const [formy, setFormy] = useState<FormaWizyty[]>([]);
  const [uslugi, setUslugi] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<string[]>([]);
  const [typy, setTypy] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Draft state for batch filtering
  const [draftStatusTab, setDraftStatusTab] = useState<"zaplanowane" | "zrealizowane">("zaplanowane");
  const [draftFormy, setDraftFormy] = useState<FormaWizyty[]>([]);
  const [draftTypy, setDraftTypy] = useState<string[]>([]);
  const [draftSpecjalista, setDraftSpecjalista] = useState<string | null>(null);

  // Get unique doctors from data
  const availableDoctors = useMemo(() => {
    const docs = new Set<string>();
    missions.forEach((m) => m.lekarz.forEach((d) => docs.add(d)));
    return Array.from(docs).sort();
  }, [missions]);

  // Get unique uslugi from data
  const availableUslugi = useMemo(() => {
    const uslugiSet = new Set<string>();
    missions.forEach((m) => uslugiSet.add(m.usluga));
    return Array.from(uslugiSet).sort();
  }, [missions]);

  // Parse date (DD-MM-YYYY) to Date object
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const openDrawer = () => {
    setDraftStatusTab(serviceTab);
    setDraftFormy(formy);
    setDraftTypy(typy);
    setDraftSpecjalista(uslugi[0] || null);
    setDrawerOpen(true);
  };

  const applyDraft = () => {
    onServiceTabChange(draftStatusTab);
    setFormy(draftFormy);
    setTypy(draftTypy);
    setUslugi(draftSpecjalista ? [draftSpecjalista] : []);
    setDrawerOpen(false);
  };

  const clearDraft = () => {
    setDraftStatusTab("zaplanowane");
    setDraftFormy([]);
    setDraftTypy([]);
    setDraftSpecjalista(null);
  };

  const draftCount = useMemo(() => {
    const q = query.trim().toLowerCase();
    const statusFilter = draftStatusTab === 'zaplanowane' ? 'Planowana' : 'Odbyta';
    
    return missions.filter((m) => {
      if (m.status !== statusFilter) return false;
      if (draftFormy.length && !draftFormy.includes(m.formaWizity)) return false;
      if (draftTypy.length && !draftTypy.includes(m.typ)) return false;
      if (draftSpecjalista && m.usluga !== draftSpecjalista) return false;
      if (q) {
        const blob = `${m.lekarz.join(" ")} ${m.usluga} ${m.typ}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    }).length;
  }, [query, draftStatusTab, draftFormy, draftTypy, draftSpecjalista, missions]);

  const draftActive =
    draftFormy.length +
    draftTypy.length +
    (draftSpecjalista ? 1 : 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const statusFilter = serviceTab === 'zaplanowane' ? 'Planowana' : 'Odbyta';
    
    return missions
      .filter((m) => {
        if (m.status !== statusFilter) return false;
        if (formy.length && !formy.includes(m.formaWizity)) return false;
        if (typy.length && !typy.includes(m.typ)) return false;
        if (uslugi.length && !uslugi.includes(m.usluga)) return false;
        if (doctors.length && !doctors.some((d) => m.lekarz.includes(d))) return false;
        if (dateFrom || dateTo) {
          const missionDate = parseDate(m.launchDate);
          if (dateFrom && missionDate < new Date(dateFrom)) return false;
          if (dateTo && missionDate > new Date(dateTo)) return false;
        }
        if (q) {
          const blob = `${m.lekarz.join(" ")} ${m.usluga} ${m.typ}`.toLowerCase();
          if (!blob.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const dateA = parseDate(a.launchDate);
        const dateB = parseDate(b.launchDate);
        return dateB.getTime() - dateA.getTime();
      });
  }, [query, serviceTab, formy, typy, uslugi, doctors, dateFrom, dateTo, missions]);

  const activeFilters =
    formy.length +
    typy.length +
    uslugi.length +
    doctors.length +
    (dateFrom ? 1 : 0) +
    (dateTo ? 1 : 0);

  const clearAll = () => {
    setFormy([]);
    setTypy([]);
    setUslugi([]);
    setDoctors([]);
    setDateFrom("");
    setDateTo("");
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

  const toggleDraftTyp = (t: string) =>
    setDraftTypy(draftTypy.includes(t) ? draftTypy.filter((x) => x !== t) : [...draftTypy, t]);

  return (
    <Box sx={{ position: "relative", pb: 12, px: 2, pt: 2 }}>
      {/* Service Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
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
          pb: 1.5,
        }}
      >
        <TextField
          placeholder="Szukaj lekarza lub uslugi..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": { borderRadius: 999, bgcolor: "#fff" },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
              endAdornment: query ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setQuery("")}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
        />

        {/* Quick forma chips */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 1.5,
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
        </Box>
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
        <Typography variant="body2" color="text.secondary">
          <Box component="strong" sx={{ color: BRAND_BLUE }}>
            {filtered.length}
          </Box>{" "}
          z {missions.length} wpisow
        </Typography>
        {(activeFilters > 0 || query) && (
          <Button
            size="small"
            sx={{ color: BRAND_BLUE, textTransform: "none" }}
            onClick={() => {
              clearAll();
              setQuery("");
            }}
          >
            Wyczysc
          </Button>
        )}
      </Box>

      {/* Cards grouped by month */}
      {grouped.length === 0 && (
        <Box sx={{ py: 6, textAlign: "center" }}>
          <Typography color="text.secondary">Brak wynikow.</Typography>
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
              const tm = TYPE_META[m.typ] || TYPE_META.Konsultacja;
              const sm = STATUS_META[m.status];
              const TypeIcon = tm.Icon;
              const formaMeta = FORMA_META[m.formaWizity];
              return (
                <Box
                  key={m.id}
                  onClick={() => onMissionClick(m)}
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    p: 2,
                    display: "flex",
                    gap: 1.5,
                    alignItems: "flex-start",
                    cursor: "pointer",
                    transition: "border-color .15s",
                    "&:active": { borderColor: BRAND_BLUE },
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: tm.bg,
                      color: tm.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <TypeIcon />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", fontWeight: 600 }}
                      >
                        {parseDate(m.launchDate).toLocaleDateString("pl-PL", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </Typography>
                      <Chip
                        label={m.status}
                        size="small"
                        sx={{
                          bgcolor: sm.bg,
                          color: sm.color,
                          height: 20,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "text.primary", mt: 0.25 }}
                    >
                      {m.usluga}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: tm.color,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {m.typ}
                    </Typography>
                    {m.lekarz.length > 0 && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.75 }}>
                        <PersonIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {m.lekarz.join(", ")}
                        </Typography>
                      </Box>
                    )}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.25 }}>
                      <formaMeta.Icon sx={{ fontSize: 14, color: "text.secondary" }} />
                      <Typography variant="caption" color="text.secondary" noWrap>
                        {formaMeta.label}
                      </Typography>
                    </Box>
                  </Box>
                  <ChevronRightIcon sx={{ color: "text.secondary", alignSelf: "center" }} />
                </Box>
              );
            })}
          </Box>
        </Box>
      ))}

      {/* Sticky bottom filter bar */}
      <Box
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1200,
          bgcolor: "#fff",
          borderTop: "1px solid",
          borderColor: "divider",
          px: 2,
          py: 1.25,
          boxShadow: "0 -4px 16px rgba(0,0,0,0.08)",
          pb: "calc(10px + env(safe-area-inset-bottom))",
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={openDrawer}
          disableRipple
          startIcon={
            <Badge badgeContent={activeFilters} color="error">
              <TuneIcon />
            </Badge>
          }
          sx={{
            textTransform: "none",
            fontWeight: 700,
            py: 1.25,
            borderRadius: 999,
            bgcolor: BRAND_BLUE,
            boxShadow: "none",
            "&:hover": { bgcolor: BRAND_BLUE_DARK, boxShadow: "none" },
            "&:focus, &:focus-visible": { bgcolor: BRAND_BLUE, boxShadow: "none" },
            "&:active": { bgcolor: BRAND_BLUE_PRESSED, boxShadow: "none" },
          }}
        >
          Filtry{activeFilters > 0 ? ` (${activeFilters})` : ""}
        </Button>
      </Box>

      {/* Filter bottom sheet */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: "92vh",
              display: "flex",
              flexDirection: "column",
              bgcolor: "#fff",
              boxShadow: "0 -8px 32px rgba(15, 28, 46, 0.12)",
            },
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
            onClick={() => setDrawerOpen(false)}
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
            variant="h6"
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
              color: "#9CA3AF",
              minWidth: "auto",
              "&.Mui-disabled": { color: "#D1D5DB" },
            }}
          >
            Czyść
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
            <Box sx={{ display: "flex", gap: 1.5 }}>
              {ALL_FORMY.map((f) => {
                const active = draftFormy.includes(f);
                const meta = FORMA_META[f];
                const Icon = meta.Icon;
                return (
                  <Box
                    key={f}
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleDraftForma(f)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleDraftForma(f);
                      }
                    }}
                    sx={filterFormaCardSx(active)}
                  >
                    <Icon sx={{ fontSize: 28, color: active ? BRAND_BLUE : "#9CA3AF" }} />
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: active ? BRAND_BLUE : "#6B7280",
                        textAlign: "center",
                      }}
                    >
                      {meta.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Typ */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 15, color: "text.primary", mb: 1.5 }}>
              Typ
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {TYP_OPTIONS.map((t) => {
                const active = draftTypy.includes(t);
                const TypIcon =
                  t === "Badanie"
                    ? ScienceIcon
                    : t === "Konsultacja"
                      ? ChatBubbleOutlineIcon
                      : ScienceIcon;
                return (
                  <Chip
                    key={t}
                    icon={<TypIcon sx={{ fontSize: "18px !important" }} />}
                    label={t}
                    onClick={() => toggleDraftTyp(t)}
                    sx={filterTypChipSx(active)}
                  />
                );
              })}
            </Box>
          </Box>

          {/* Specjalista / Usługa */}
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 15, color: "text.primary", mb: 1.5 }}>
              Specjalista / Usługa
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
              {SPECJALISTA_OPTIONS.map(({ label, Icon }) => {
                const active = draftSpecjalista === label;
                return (
                  <Box
                    key={label}
                    role="button"
                    tabIndex={0}
                    onClick={() => setDraftSpecjalista(active ? null : label)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setDraftSpecjalista(active ? null : label);
                      }
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: 3,
                      border: active ? `2px solid ${BRAND_BLUE}` : "2px solid transparent",
                      bgcolor: active ? FILTER_BLUE_LIGHT : "#fff",
                      boxShadow: active ? "none" : FILTER_CARD_SHADOW,
                      cursor: "pointer",
                      transition: "border-color 0.15s, box-shadow 0.15s, background-color 0.15s",
                      "&:hover": {
                        bgcolor: active ? FILTER_BLUE_LIGHT : "#F9FAFB",
                        borderColor: active ? BRAND_BLUE : "transparent",
                      },
                      "&:focus-visible": {
                        outline: `2px solid ${BRAND_BLUE}`,
                        outlineOffset: 2,
                        borderColor: BRAND_BLUE,
                      },
                      "&:active": {
                        bgcolor: active ? FILTER_BLUE_HOVER : "#F3F4F6",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: active ? "#fff" : "#F3F4F6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ fontSize: 22, color: active ? BRAND_BLUE : "#9CA3AF" }} />
                    </Box>
                    <Typography
                      sx={{
                        flex: 1,
                        fontWeight: active ? 600 : 500,
                        fontSize: 15,
                        color: active ? BRAND_BLUE : "text.primary",
                      }}
                    >
                      {label}
                    </Typography>
                    <Radio
                      checked={active}
                      sx={{
                        p: 0.5,
                        color: FILTER_GREY_BORDER,
                        "&.Mui-checked": { color: BRAND_BLUE },
                        "& .MuiSvgIcon-root": { fontSize: 22 },
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
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
              "&:focus, &:focus-visible": { bgcolor: BRAND_BLUE, boxShadow: "none" },
              "&:active": { bgcolor: BRAND_BLUE_PRESSED, boxShadow: "none" },
            }}
          >
            Zastosuj filtry
            <Box
              component="span"
              sx={{
                ml: 1,
                minWidth: 28,
                height: 28,
                px: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.28)",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {draftCount}
            </Box>
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
