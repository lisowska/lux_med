export interface Mission {
  id: string;
  name: string;
  year: number;
  formaWizity: 'telefoniczna' | 'online' | 'w placówce';
  status: 'Odbyta' | 'Planowana' | 'Anulowana';
  doctorType: 'Ginekolog' | 'Pediatra' | 'Usg' | 'Dietetyk' | 'Okulista';
  lekarz: string[];
  launchDate: string; //ISO date
  cost?: number;
}

export type FormaWizity = 'telefoniczna' | 'online' | 'Wplacówce';

export type MissionStatus = 'Odbyta' | 'Planowana' | 'Anulowana';
export type DoctorType =
  | 'Ginekolog'
  | 'Pediatra'
  | 'Usg'
  | 'Dietetyk'
  | 'Okulista';
