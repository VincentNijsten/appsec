type Role = 'admin' | 'player' | 'coach';

type UserInput = {
    id?: number;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    fullname: string;
    role: Role;
};

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
    Role,
    UserInput,
    AuthenticationResponse,
    SpelerInput,
    CoachInput,
    PloegInput,
    ZaalInput,
    TrainingSessionInput
};