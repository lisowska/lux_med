/** Normalizuje spacje i skrót „Med.” w nazwach lekarzy z danych. */
export const normalizeSearchLabel = (value: string) =>
  value.replace(/\s+/g, " ").replace(/Med\.\s*/gi, "Med. ").trim();

/** Zwraca unikalne etykiety (np. ten sam lekarz z różnym zapisem → jedna pozycja). */
export const uniqueSearchLabels = (values: string[]) => {
  const map = new Map<string, string>();
  values.forEach((value) => {
    const normalized = normalizeSearchLabel(value);
    const key = normalized.toLowerCase();
    if (!map.has(key)) {
      map.set(key, normalized);
    }
  });
  return Array.from(map.values());
};
