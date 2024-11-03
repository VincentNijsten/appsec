// index.ts


type SpelerInput = {
    naam: string;
    spelerlicentie: string;
    leeftijd: number;
};

type CoachInput = {
    naam: string;
    coachlicentie: string;
};

type PloegInput = {
    niveau: string;
    ploegnaam: string;
    spelers: SpelerInput[];
    coach?: CoachInput;
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