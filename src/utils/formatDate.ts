/** ISO z <input type="date"> (YYYY-MM-DD) → DD-MM-YYYY do wyświetlania */
export function formatIsoDateForDisplay(iso: string): string {
  const [year, month, day] = iso.split('-');
  if (!year || !month || !day) return iso;
  return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
}

/** launchDate z danych (DD-MM-YYYY) — normalizuje zerami wiodącymi */
export function formatLaunchDate(dateStr: string): string {
  const [day, month, year] = dateStr.split('-');
  if (!day || !month || !year) return dateStr;
  return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
}
