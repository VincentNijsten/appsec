import { Ploeg } from '../../model/ploeg';
import { Speler } from '../../model/speler';
import { Coach } from '../../model/coach';
import ploegDb from '../../repository/ploeg.db';
import spelerDb from '../../repository/speler.db';
import spelerService from '../../service/speler.service';
import ploegService from '../../service/ploeg.service';
import { PloegInput, SpelerInput, CoachInput } from '../../types';

const spelerInput: SpelerInput = {
    naam: 'Speler 1',
    spelerlicentie: '2562726',
    leeftijd: 22,
};


const spelerinput2: SpelerInput = {
    naam: 'Speler 2',
    spelerlicentie: '1234567',
    leeftijd: 25
}


const coachInput: CoachInput = {
    naam: 'Coach 1',
    coachlicentie: '8910112',
};


const speler = new Speler({...spelerInput,});
const speler2 = new Speler(spelerinput2);
const coach = new Coach(coachInput);

const ploegInput: PloegInput = {
    niveau: 'Liga A',
    ploegnaam: 'Heren A',
    spelers: [spelerInput], 
    coach: coachInput,
};

// Converteer SpelerInput naar Speler objecten
const ploeg = new Ploeg({
    niveau: ploegInput.niveau,
    ploegnaam: ploegInput.ploegnaam,
    spelers: [], 
    coach: undefined, 
});

let mockGetAllPloegen: jest.Mock;
let mockGetPloegByNaam: jest.Mock;
let mockAddPloeg: jest.Mock;
let mockGetSpelersInPloeg: jest.Mock;
let mockAddSpelerToPloeg: jest.Mock;

beforeEach(() => {
    mockGetAllPloegen = jest.fn();
    mockGetPloegByNaam = jest.fn();
    mockAddPloeg = jest.fn();
    mockGetSpelersInPloeg = jest.fn();
    mockAddSpelerToPloeg = jest.fn();

    ploegDb.getAllPloegen = mockGetAllPloegen;
    ploegDb.getPloegByNaam = mockGetPloegByNaam;
    ploegDb.addPloeg = mockAddPloeg;
    ploegDb.getSpelersInPloeg = mockGetSpelersInPloeg;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid ploeg, when adding a ploeg, then the ploeg is added successfully', () => {
    // given
    mockAddPloeg.mockReturnValue(undefined); 

    // when
    const result = ploegService.addPloeg(ploeg);

    // then
    expect(result).toEqual(`${ploeg.getPloegnaam()} is succesvol toegevoegd`);
    expect(mockAddPloeg).toHaveBeenCalledWith(ploeg);
});

test('given a ploegnaam that exists, when getting a ploeg by naam, then the ploeg is returned', () => {
    // given
    mockGetPloegByNaam.mockReturnValue(ploeg);

    // when
    const result = ploegService.getPloegByNaam('Heren A');

    // then
    expect(result).toEqual(ploeg);
    expect(mockGetPloegByNaam).toHaveBeenCalledWith({ ploegnaam: 'Heren A' });
});

test('given a ploegnaam that does not exist, when getting a ploeg by naam, then an error is thrown', () => {
    // given
    mockGetPloegByNaam.mockReturnValue(null);

    // when
    const getPloeg = () => ploegService.getPloegByNaam('Onbekend');

    // then
    expect(getPloeg).toThrow('Deze ploeg kan niet gevonden worden');
});

test('given a ploegnaam and spelerlicentie, when adding a speler to a ploeg, then the speler is added successfully', () => {
    // given
    mockGetPloegByNaam.mockReturnValue(ploeg);
    jest.spyOn(spelerService, 'getSpelerByLicentie').mockReturnValue(speler);
    mockGetAllPloegen.mockReturnValue([ploeg]);

    // when
    const result = ploegService.addSpelerToPloeg('Heren A', '1234567');

    // then
    expect(result).toEqual(ploeg);
    expect(ploeg.spelers).toContain(speler);
});

test('given a ploegnaam and spelerlicentie, when adding a speler that already exists in the ploeg, then an error is thrown', () => {
    // given
    ploeg.spelers.push(speler);
    mockGetPloegByNaam.mockReturnValue(ploeg);
    jest.spyOn(spelerService, 'getSpelerByLicentie').mockReturnValue(speler);

    // when
    const addSpeler = () => ploegService.addSpelerToPloeg('Heren A', '2562726');

    // then
    expect(addSpeler).toThrow('Speler is al toegevoegd aan deze ploeg');
});

test('given a ploegnaam and spelerlicentie, when adding a speler that already exists in another ploeg, then an error is thrown ', () => {
    // given
    const anderePloeg = new Ploeg({
        niveau: 'Liga B',
        ploegnaam: 'Heren B',
        spelers: [speler2],
        coach: coach,
    });
    mockGetPloegByNaam.mockReturnValue(ploeg);
    jest.spyOn(spelerService, 'getSpelerByLicentie').mockReturnValue(speler);
    mockGetAllPloegen.mockReturnValue([ploeg, anderePloeg]);

    // when
    const addSpeler = () => ploegService.addSpelerToPloeg('Heren A', '1234567');

    // then
    expect(addSpeler).toThrow(`De speler ${speler.naam} speelt al in de ploeg ${anderePloeg.getPloegnaam()}`);
});

test('given a ploeg that already exists, when adding a ploeg, then an error is thrown', () => {
    // given
    mockGetPloegByNaam.mockReturnValue(ploeg); 
    
    // when
    const addPloeg = () => ploegService.addPloeg(ploeg);
    
    // then
    expect(addPloeg).toThrow(`de ploeg met naam ${ploeg.getPloegnaam()} bestaat al`);
});