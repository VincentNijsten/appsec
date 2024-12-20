export type Role = 'admin' | 'player' | 'coach';

export type User = {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: Role;
}

export type Speler = {
    naam: string;
    spelerLicentie: string;
    leeftijd: number;
    ploegNaam: string;
};

export type Coach = {
    naam: string;
    coachLicentie: string;
};

export type Ploeg = {
    niveau: string;
    ploegnaam: string;
    coachLicentie: String;
};

export type Zaal = {
    address: string;
    naam: string;
    beschikbaarheid: boolean;
};

export type TrainingSession = {
    ploegNaam: string;
    zaalNaam: string;
    datum: Date;
    startTijd: string;
    eindTijd: string;
};

export interface UserType {
    token: string;
    fullname: string;
    username: string; 
    role: string;
}

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};