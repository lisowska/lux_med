export interface Mission {
  id: string;
  year: number;
  formaWizity: 'telefoniczna' | 'online' | 'w placówce';
  status: 'Odbyta' | 'Planowana' | 'Anulowana';
  usluga: 'Ginekolog' | 'Pediatra' | 'Usg' | 'Dietetyk' | 'Okulista';
  typ: 'Badanie' | 'Konsultacja'  | 'Badania laboratoryjne';
  lekarz: string[];
  launchDate: string; //ISO date
  cost?: number;
}

export type FormaWizity = 'telefoniczna' | 'online' | 'Wplacówce';

export type MissionStatus = 'Odbyta' | 'Planowana' | 'Anulowana';
export type Usluga = 'Ginekolog' | 'Pediatra' | 'Usg' | 'Dietetyk' | 'Okulista';
export type Typ = 'Badanie' | 'Konsultacja'  | 'Badania laboratoryjne'