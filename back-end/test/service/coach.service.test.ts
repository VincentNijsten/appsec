import coachService from '../../service/coach.service';
import coachDb from '../../repository/coach.db';
import { Coach } from '../../model/coach';
import { CoachInput } from '../../types';

const coachInput: CoachInput = {
    naam: 'John Doe',
    coachLicentie: '1234567',
};

const coach = new Coach(coachInput);

let mockGetAllCoaches: jest.Mock;
let mockGetCoachByNaam: jest.Mock;
let mockRemoveCoach: jest.Mock;
let mockAddCoach: jest.Mock;
let mockUpdateCoach: jest.Mock;
let mockGetCoachByCoachLicentie: jest.Mock;

beforeEach(() => {
    mockGetAllCoaches = jest.fn();
    mockGetCoachByNaam = jest.fn();
    mockRemoveCoach = jest.fn();
    mockAddCoach = jest.fn();
    mockUpdateCoach = jest.fn();
    mockGetCoachByCoachLicentie = jest.fn();

    coachDb.getAllCoaches = mockGetAllCoaches;
    coachDb.getCoachByNaam = mockGetCoachByNaam;
    coachDb.removeCoach = mockRemoveCoach;
    coachDb.addCoach = mockAddCoach;
    coachDb.getCoachByCoachLicentie = mockGetCoachByCoachLicentie;
    coachDb.updateCoach = mockUpdateCoach;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid coach, when addCoach is called, then the coach is added successfully', async () => {
    // given
    mockGetCoachByCoachLicentie.mockResolvedValue(null); // Coach bestaat nog niet
    mockAddCoach.mockResolvedValue(undefined); // Simuleer succesvolle toevoeging

    // when
    const result = await coachService.addCoach(coachInput);

    // then
    expect(mockGetCoachByCoachLicentie).toHaveBeenCalledWith(coachInput.coachLicentie);
    expect(mockAddCoach).toHaveBeenCalledWith(expect.any(Coach));
    expect(result).toBe('Succes');
});

test('given an existing coach, when addCoach is called, then an error is thrown', async () => {
    // given
    mockGetCoachByCoachLicentie.mockResolvedValue(coach); // Coach bestaat al

    // when
    const addExistingCoach = async () => await coachService.addCoach(coachInput);

    // then
    expect(addExistingCoach).rejects.toThrow(`De coach met licentie: ${coachInput.coachLicentie}, bestaat al: ${coachInput.naam}`);
});

test('given a valid coach name, when getCoachByNaam is called, then the coach is returned', async () => {
    // given
    mockGetCoachByNaam.mockResolvedValue(coach); // Coach wordt gevonden

    // when
    const result = await coachService.getCoachByNaam(coachInput.naam);

    // then
    expect(mockGetCoachByNaam).toHaveBeenCalledWith({ coachnaam: coachInput.naam });
    expect(result).toEqual(coach);
});

test('given a non-existing coach name, when getCoachByNaam is called, then an error is thrown', async () => {
    // given
    mockGetCoachByNaam.mockResolvedValue(null); // Coach niet gevonden

    // when
    const getNonExistingCoach = async () => await coachService.getCoachByNaam(coachInput.naam);

    // then
    expect(getNonExistingCoach).rejects.toThrow('Deze coach kan niet gevonden worden');
});

test('given a valid coach license, when removeCoach is called, then the coach is removed successfully', async () => {
    // given
    mockGetCoachByCoachLicentie.mockResolvedValue(coach); // Coach bestaat
    mockRemoveCoach.mockResolvedValue(undefined); // Simuleer succesvolle verwijdering

    // when
    const result = await coachService.removeCoach(coachInput.coachLicentie);

    // then
    expect(mockGetCoachByCoachLicentie).toHaveBeenCalledWith(coachInput.coachLicentie);
    expect(mockRemoveCoach).toHaveBeenCalledWith(coachInput.coachLicentie);
    expect(result).toBe('Coach succesvol verwijderd');
});

test('given a non-existing coach license, when removeCoach is called, then an error is thrown', async () => {
    // given
    mockGetCoachByCoachLicentie.mockResolvedValue(null); // Coach niet gevonden

    // when
    const removeNonExistingCoach = async () => await coachService.removeCoach(coachInput.coachLicentie);

    // then
    expect(removeNonExistingCoach).rejects.toThrow('Coach verwijderen mislukt');
});

test('given a valid coach license and data, when updateCoach is called, then the coach is updated successfully', async () => {
    // given
    const updatedData = { naam: 'Jane Doe' };
    mockGetCoachByCoachLicentie.mockResolvedValue(coach); // Coach bestaat
    mockUpdateCoach.mockResolvedValue(undefined); // Simuleer succesvolle update

    // when
    const result = await coachService.updateCoach(coachInput.coachLicentie, updatedData);

    // then
    expect(mockGetCoachByCoachLicentie).toHaveBeenCalledWith(coachInput.coachLicentie);
    expect(mockUpdateCoach).toHaveBeenCalledWith(coachInput.coachLicentie, updatedData);
    expect(result).toBe('Coach succesvol bijgewerkt');
});

test('given a non-existing coach license, when updateCoach is called, then an error is thrown', async () => {
    // given
    mockGetCoachByCoachLicentie.mockResolvedValue(null); // Coach niet gevonden

    // when
    const updateNonExistingCoach = async () => await coachService.updateCoach(coachInput.coachLicentie, { naam: 'New Name' });

    // then
    expect(updateNonExistingCoach).rejects.toThrow('Coach bijwerken mislukt');
});