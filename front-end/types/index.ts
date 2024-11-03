export type Speler = {
    naam: string;
    spelerlicentie: string;
    leeftijd: number;
};

export type Coach = {
    naam: string;
    coachlicentie: string;
};

export type Ploeg = {
    niveau: string;
    ploegnaam: string;
    spelers: Speler[];
    coach: Coach;
};

export type Zaal = {
    address: string;
    naam: string;
    beschikbaarheid: boolean;
};

export type TrainingSession = {
    ploeg: Ploeg;
    zaal: Zaal;
    datum: Date;
    startTijd: string;
    eindTijd: string;
};