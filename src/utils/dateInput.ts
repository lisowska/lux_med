/** Otwiera natywny kalendarz po kliknięciu w całe pole (nie tylko ikonę). */
export function openDatePicker(input: HTMLInputElement | null | undefined) {
  if (!input) return;
  if (typeof input.showPicker === 'function') {
    try {
      input.showPicker();
      return;
    } catch {
      // np. picker już otwarty lub przeglądarka zablokowała wywołanie
    }
  }
  input.focus();
}

export function handleDateFieldClick(event: React.MouseEvent<HTMLElement>) {
  const input = event.currentTarget.querySelector(
    'input[type="date"]',
  ) as HTMLInputElement | null;
  openDatePicker(input);
}
