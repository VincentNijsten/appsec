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
    zaalNaam: string;
    datum: Date;
    startTijd: string;
    eindTijd: string;
    ploegen: Ploeg[];
};