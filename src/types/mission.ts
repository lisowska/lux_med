export interface Mission {
    id: string;
    name: string;
    year: number;
    agency: 'NASA' | 'ESA' | 'SpaceX' | 'CNSA' | 'ISRO' | 'Roscosmos';
    status: 'Success' | 'Failure' | 'Ongoing' | 'Planned';
    missionType: 'Orbital' | 'Lunar' | 'Mars' | 'Deep Space' | 'ISS';
    crew: string[];
    description: string;
    launchDate: string; //ISO date
    cost?: number;
    }

export type Agency = "NASA" | "ESA" | "Roscosmos" | "SpaceX" | "CNSA" | "ISRO" | "JAXA";
export type MissionStatus = 'Success' | 'Failure' | 'Ongoing' | 'Planned';
export type MissionType=  'Orbital' | 'Lunar' | 'Mars' | 'Deep Space' | 'ISS';


