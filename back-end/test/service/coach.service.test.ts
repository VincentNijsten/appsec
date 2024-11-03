import { Coach } from '../../model/coach';
import coachDb from '../../repository/coach.db';
import ploegDb from '../../repository/ploeg.db';
import coachService from '../../service/coach.service';
import { CoachInput } from '../../types';
const coachInput: CoachInput = {
    
    naam: 'Jan',
    coachlicentie: '2573826',
};

const coach = new Coach(coachInput);

let mockGetAllCoaches: jest.Mock;
let mockGetCoachByNaam: jest.Mock;
let mockRemoveCoach: jest.Mock;
let mockAddCoach: jest.Mock;
let mochGetCpachesByCoachlicentie: jest.Mock;

beforeEach(() => {
    mockGetAllCoaches = jest.fn();
    mockGetCoachByNaam = jest.fn();
    mockRemoveCoach = jest.fn();
    mockAddCoach = jest.fn();
    mochGetCpachesByCoachlicentie = jest.fn();

    coachDb.getAllCoaches = mockGetAllCoaches;
    coachDb.getCoachByNaam = mockGetCoachByNaam;
    coachDb.removeCoach = mockRemoveCoach;
    coachDb.addCoach = mockAddCoach;
    coachDb.getCoachByCoachLicentie = mochGetCpachesByCoachlicentie;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid coach, when adding a coach, then the coach is added successfully', () => {
    // given
    mockAddCoach.mockReturnValue(undefined); 

    // when
    const result = coachService.addCoach(coach);

    // then
    expect(result).toEqual('succes');
    expect(mockAddCoach).toHaveBeenCalledWith(coach);
});

test('given a coach name that exists, when getting a coach by name, then the coach is returned', () => {
    // given
    mockGetCoachByNaam.mockReturnValue(coach);

    // when
    const result = coachService.getCoachByNaam('Jan');

    // then
    expect(result).toEqual(coach);
    expect(mockGetCoachByNaam).toHaveBeenCalledWith({ coachnaam: 'Jan' });
});

test('given a coach name that does not exist, when getting a coach by name, then an error is thrown', () => {
    // given
    mockGetCoachByNaam.mockReturnValue(null);

    // when
    const getCoach = () => coachService.getCoachByNaam('Onbekend');

    // then
    expect(getCoach).toThrow('deze coach kan niet gevonden worden');
});

test('given a valid coach license, when removing a coach, then the coach is removed successfully', () => {
    // given
    mockGetAllCoaches.mockReturnValue([coach]);
    mockRemoveCoach.mockReturnValue(undefined); 

    // when
    const result = coachService.removeCoach('2573826');

    // then
    expect(result).toEqual('Coach succesvol verwijderd');
    expect(mockRemoveCoach).toHaveBeenCalled();
});

test('given a non-existing coach license, when removing a coach, then an error is thrown', () => {
    // given
    mockGetAllCoaches.mockReturnValue([]); // Geen coaches in de database

    // when
    const removeCoach = () => coachService.removeCoach('XYZ789');

    // then
    expect(removeCoach).toThrow('coach verwijderen mislukt');
});

test('given a coach that already exists, when adding a coach, then an error is thrown', () => {
    // given
    mochGetCpachesByCoachlicentie.mockReturnValue(coach); 
    
    // when
    const addCoach = () => coachService.addCoach(coach);
    
    // then
    expect(addCoach).toThrow(`de coach met licentie : ${coach.coachlicentie}, bestaal al : ${coach.naam}`);
});