// index.ts


type SpelerInput = {
    naam: string;
    spelerLicentie: string;
    leeftijd: number;
    ploegNaam: string;
};

type CoachInput = {
    naam: string;
    coachLicentie: string;
};

type PloegInput = {
    niveau: string;
    ploegnaam: string;
    coachLicentie: string | null;
};

type ZaalInput = {
    address: string;
    naam: string;
    beschikbaarheid: boolean;
};

type TrainingSessionInput = {
    ploeg: PloegInput;
    zaal: ZaalInput;
    datum: Date;
    startTijd: string;
    eindTijd: string;
};

export {
    SpelerInput,
    CoachInput,
    PloegInput,
    ZaalInput,
    TrainingSessionInput
};