export type Speler = {
    naam: string;
    spelerlicentie: string;
    leeftijd: number;
};

export type Ploeg = {
    niveau: string;
    ploegnaam: string;
    spelers: Speler[];
};