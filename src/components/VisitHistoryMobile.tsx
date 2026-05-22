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
  Checkbox,
  ListItemText,
  ListItemButton,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ScienceIcon from "@mui/icons-material/Science";
import VideocamIcon from "@mui/icons-material/Videocam";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import ComputerIcon from "@mui/icons-material/Computer";
import type { Mission, MissionStatus } from "../types/mission";
import missionData from "../data/missionData.json";

type FormaWizyty = Mission["formaWizity"];
type Usluga = Mission["usluga"];
type Typ = Mission["typ"];

const TYPE_META: Record<string, { color: string; bg: string; Icon: typeof LocalHospitalIcon }> = {
  Badanie: { color: "#0A6E8C", bg: "#E0F2F8", Icon: ScienceIcon },
  Konsultacja: { color: "#C8007A", bg: "#FCE6F1", Icon: LocalHospitalIcon },
  "Badania laboratoryjne": { color: "#5B2D90", bg: "#EFE6FA", Icon: ScienceIcon },
  USG: { color: "#0A6E8C", bg: "#E0F2F8", Icon: ScienceIcon },
};

const STATUS_META: Record<MissionStatus, { color: string; bg: string }> = {
  Odbyta: { color: "#1a6b14", bg: "#E4F5E0" },
  Planowana: { color: "#002677", bg: "#E1E8F8" },
  Anulowana: { color: "#8a1a1a", bg: "#FBE3E3" },
};

const FORMA_META: Record<FormaWizyty, { color: string; bg: string; Icon: typeof PhoneIcon; label: string }> = {
  telefoniczna: { color: "#0A6E8C", bg: "#E0F2F8", Icon: PhoneIcon, label: "Telefoniczna" },
  online: { color: "#5B2D90", bg: "#EFE6FA", Icon: ComputerIcon, label: "Online" },
  "w placówce": { color: "#C8007A", bg: "#FCE6F1", Icon: PlaceIcon, label: "W placówce" },
};

const ALL_FORMY: FormaWizyty[] = ["telefoniczna", "online", "w placówce"];
const ALL_STATUSES: MissionStatus[] = ["Odbyta", "Planowana", "Anulowana"];
const ALL_USLUGI: string[] = ["Ginekolog", "Pediatra", "Usg", "Dietetyk", "Okulista", "Pobranie krwi"];

interface FilterAccordionProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  renderOption?: (opt: string, checked: boolean) => React.ReactNode;
}

function FilterAccordion({
  title,
  options,
  selected,
  onChange,
  renderOption,
}: FilterAccordionProps) {
  return (
    <Accordion
      disableGutters
      elevation={0}
      sx={{
        bgcolor: "transparent",
        "&::before": { display: "none" },
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ px: 0, "& .MuiAccordionSummary-content": { my: 1.5 } }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: 15 }}>{title}</Typography>
          {selected.length > 0 && (
            <Box
              component="span"
              sx={{
                px: 1,
                py: 0.1,
                borderRadius: 999,
                bgcolor: "primary.main",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                minWidth: 22,
                textAlign: "center",
              }}
            >
              {selected.length}
            </Box>
          )}
        </Box>
        {selected.length > 0 && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mr: 1, maxWidth: 160, textAlign: "right" }}
            noWrap
          >
            {selected.join(", ")}
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0, pt: 0, pb: 1 }}>
        {options.map((opt) => {
          const checked = selected.includes(opt);
          return (
            <ListItemButton
              key={opt}
              onClick={() =>
                onChange(checked ? selected.filter((s) => s !== opt) : [...selected, opt])
              }
              sx={{ px: 0, borderRadius: 1 }}
            >
              <Checkbox checked={checked} size="small" sx={{ p: 0.5, mr: 1 }} />
              {renderOption ? (
                renderOption(opt, checked)
              ) : (
                <ListItemText slotProps={{ primary: { sx: { fontSize: 15 } } }} primary={opt} />
              )}
            </ListItemButton>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
}

interface VisitHistoryMobileProps {
  onMissionClick: (mission: Mission) => void;
}

export default function VisitHistoryMobile({ onMissionClick }: VisitHistoryMobileProps) {
  const missions: Mission[] = missionData.missions as Mission[];

  const [query, setQuery] = useState("");
  const [formy, setFormy] = useState<FormaWizyty[]>([]);
  const [statuses, setStatuses] = useState<MissionStatus[]>([]);
  const [uslugi, setUslugi] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Draft state for batch filtering
  const [draftFormy, setDraftFormy] = useState<FormaWizyty[]>([]);
  const [draftStatuses, setDraftStatuses] = useState<MissionStatus[]>([]);
  const [draftUslugi, setDraftUslugi] = useState<string[]>([]);
  const [draftDoctors, setDraftDoctors] = useState<string[]>([]);
  const [draftDateFrom, setDraftDateFrom] = useState("");
  const [draftDateTo, setDraftDateTo] = useState("");

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
    setDraftFormy(formy);
    setDraftStatuses(statuses);
    setDraftUslugi(uslugi);
    setDraftDoctors(doctors);
    setDraftDateFrom(dateFrom);
    setDraftDateTo(dateTo);
    setDrawerOpen(true);
  };

  const applyDraft = () => {
    setFormy(draftFormy);
    setStatuses(draftStatuses);
    setUslugi(draftUslugi);
    setDoctors(draftDoctors);
    setDateFrom(draftDateFrom);
    setDateTo(draftDateTo);
    setDrawerOpen(false);
  };

  const clearDraft = () => {
    setDraftFormy([]);
    setDraftStatuses([]);
    setDraftUslugi([]);
    setDraftDoctors([]);
    setDraftDateFrom("");
    setDraftDateTo("");
  };

  const draftCount = useMemo(() => {
    const q = query.trim().toLowerCase();
    return missions.filter((m) => {
      if (draftFormy.length && !draftFormy.includes(m.formaWizity)) return false;
      if (draftStatuses.length && !draftStatuses.includes(m.status)) return false;
      if (draftUslugi.length && !draftUslugi.includes(m.usluga)) return false;
      if (draftDoctors.length && !draftDoctors.some((d) => m.lekarz.includes(d))) return false;
      if (draftDateFrom || draftDateTo) {
        const missionDate = parseDate(m.launchDate);
        if (draftDateFrom && missionDate < new Date(draftDateFrom)) return false;
        if (draftDateTo && missionDate > new Date(draftDateTo)) return false;
      }
      if (q) {
        const blob = `${m.lekarz.join(" ")} ${m.usluga} ${m.typ}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    }).length;
  }, [query, draftFormy, draftStatuses, draftUslugi, draftDoctors, draftDateFrom, draftDateTo, missions]);

  const draftActive =
    draftFormy.length +
    draftStatuses.length +
    draftUslugi.length +
    draftDoctors.length +
    (draftDateFrom ? 1 : 0) +
    (draftDateTo ? 1 : 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return missions
      .filter((m) => {
        if (formy.length && !formy.includes(m.formaWizity)) return false;
        if (statuses.length && !statuses.includes(m.status)) return false;
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
  }, [query, formy, statuses, uslugi, doctors, dateFrom, dateTo, missions]);

  const activeFilters =
    formy.length +
    statuses.length +
    uslugi.length +
    doctors.length +
    (dateFrom ? 1 : 0) +
    (dateTo ? 1 : 0);

  const clearAll = () => {
    setFormy([]);
    setStatuses([]);
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

  return (
    <Box sx={{ position: "relative", pb: 12, px: 2, pt: 2 }}>
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
                icon={<Icon sx={{ fontSize: 16, color: `${active ? "#fff" : meta.color} !important` }} />}
                label={meta.label}
                onClick={() => toggleForma(f)}
                sx={{
                  bgcolor: active ? meta.color : meta.bg,
                  color: active ? "#fff" : meta.color,
                  fontWeight: 600,
                  flexShrink: 0,
                }}
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
          <Box component="strong" sx={{ color: "primary.main" }}>
            {filtered.length}
          </Box>{" "}
          z {missions.length} wpisow
        </Typography>
        {(activeFilters > 0 || query) && (
          <Button
            size="small"
            color="secondary"
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
                    "&:active": { borderColor: "primary.main" },
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
          color="primary"
          onClick={openDrawer}
          startIcon={
            <Badge badgeContent={activeFilters} color="secondary">
              <TuneIcon />
            </Badge>
          }
          sx={{
            textTransform: "none",
            fontWeight: 700,
            py: 1.25,
            borderRadius: 999,
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
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2.5,
            pt: 2,
            pb: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
              Filtry
            </Typography>
            {draftActive > 0 && (
              <Typography variant="caption" color="text.secondary">
                {draftActive} {draftActive === 1 ? "filtr aktywny" : "filtrow aktywnych"}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Button
              size="small"
              color="secondary"
              onClick={clearDraft}
              disabled={draftActive === 0}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Wyczysc
            </Button>
            <IconButton onClick={() => setDrawerOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Scrollable body */}
        <Box sx={{ flex: 1, overflowY: "auto", px: 2.5, py: 2 }}>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              type="date"
              size="small"
              label="Od"
              value={draftDateFrom}
              onChange={(e) => setDraftDateFrom(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
            />
            <TextField
              type="date"
              size="small"
              label="Do"
              value={draftDateTo}
              onChange={(e) => setDraftDateTo(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
            />
          </Box>

          <FilterAccordion
            title="Forma wizyty"
            options={ALL_FORMY}
            selected={draftFormy}
            onChange={(v) => setDraftFormy(v as FormaWizyty[])}
            renderOption={(opt) => (
              <ListItemText
                slotProps={{ primary: { sx: { fontSize: 15 } } }}
                primary={FORMA_META[opt as FormaWizyty]?.label || opt}
              />
            )}
          />
          <FilterAccordion
            title="Status"
            options={ALL_STATUSES}
            selected={draftStatuses}
            onChange={(v) => setDraftStatuses(v as MissionStatus[])}
            renderOption={(opt) => (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: STATUS_META[opt as MissionStatus].color,
                  }}
                />
                <ListItemText slotProps={{ primary: { sx: { fontSize: 15 } } }} primary={opt} />
              </Box>
            )}
          />
          <FilterAccordion
            title="Usluga"
            options={availableUslugi}
            selected={draftUslugi}
            onChange={setDraftUslugi}
          />
          <FilterAccordion
            title="Lekarz"
            options={availableDoctors}
            selected={draftDoctors}
            onChange={setDraftDoctors}
          />
        </Box>

        {/* Sticky CTA */}
        <Box
          sx={{
            px: 2.5,
            py: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            pb: "calc(16px + env(safe-area-inset-bottom))",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={applyDraft}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              py: 1.5,
              borderRadius: 999,
              fontSize: 16,
            }}
          >
            Pokaz wyniki ({draftCount})
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
