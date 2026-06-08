export type SkierowanieStatus = 'Aktywne' | 'Przeterminowane' | 'Zrealizowane';

export interface Skierowanie {
  specjalista: string;
  rodzaj: string;
  status: SkierowanieStatus;
}

export interface Mission {
  id: string;
  year: number;
  formaWizity: 'telefoniczna' | 'online' | 'w placówce';
  status: 'Odbyta' | 'Planowana' | 'Anulowana';
  usluga: string;
  typ: 'Badanie' | 'Konsultacja' | 'Badania laboratoryjne';
  lekarz: string[];
  launchDate: string; //ISO date
  cost?: number;
  placowka?: string;
  zalecenia?: string;
  zrealizowaneUslugi?: string[];
  skierowania?: Skierowanie[];
}

export type FormaWizity = 'telefoniczna' | 'online' | 'Wplacówce';

export type MissionStatus = 'Odbyta' | 'Planowana' | 'Anulowana';
export type Usluga = 'Ginekolog' | 'Pediatra' | 'Usg' | 'Dietetyk' | 'Okulista'|'Laryngolog'|'Dermatolog';
export type Typ = 'Badanie' | 'Konsultacja' | 'Badania laboratoryjne';
