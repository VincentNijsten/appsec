import ploegService from '../../service/ploeg.service';
import ploegDb from '../../repository/ploeg.db';
import { Ploeg } from '../../model/ploeg';
import { PloegInput } from '../../types';
import trainingSessionService from '../../service/trainingSession.service';

const ploegInput: PloegInput = {
    ploegnaam: 'Heren A',
    niveau: 'Professioneel',
    coachLicentie: '1234567',
};

const ploeg = new Ploeg(ploegInput);

let mockGetAllPloegen: jest.Mock;
let mockGetPloegByNaam: jest.Mock;
let mockAddPloeg: jest.Mock;
let mockVerwijderPloeg: jest.Mock;
let mockUpdatePloeg: jest.Mock;
let mockGetPloegByNaamExists: jest.Mock;
let mockGetTrainingSessionByPloegNaam: jest.Mock;
let mockRemovePloegFromTrainingSession: jest.Mock;

beforeEach(() => {
    mockGetAllPloegen = jest.fn();
    mockGetPloegByNaam = jest.fn();
    mockAddPloeg = jest.fn();
    mockVerwijderPloeg = jest.fn();
    mockUpdatePloeg = jest.fn();
    mockGetPloegByNaamExists = jest.fn();
    mockGetTrainingSessionByPloegNaam = jest.fn();
    mockRemovePloegFromTrainingSession = jest.fn();

    ploegDb.getAllPloegen = mockGetAllPloegen;
    ploegDb.getPloegByNaam = mockGetPloegByNaam;
    ploegDb.addPloeg = mockAddPloeg;
    ploegDb.verwijderPloeg = mockVerwijderPloeg;
    ploegDb.updatePloeg = mockUpdatePloeg;
    trainingSessionService.getTrainingSessionByPloegNaam = mockGetTrainingSessionByPloegNaam;
    trainingSessionService.removePloegFromTrainingSession = mockRemovePloegFromTrainingSession;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid ploeg, when addPloeg is called, then the ploeg is added successfully', async () => {
    // given
    mockGetPloegByNaam.mockResolvedValue(null); // Ploeg bestaat nog niet
    mockAddPloeg.mockResolvedValue(undefined); // Simuleer succesvolle toevoeging

    // when
    const result = await ploegService.addPloeg(ploegInput);

    // then
    expect(mockGetPloegByNaam).toHaveBeenCalledWith(ploegInput.ploegnaam);
    expect(mockAddPloeg).toHaveBeenCalledWith(expect.any(Ploeg));
    expect(result).toBe(`${ploegInput.ploegnaam} is succesvol toegevoegd`);
});

test('given an existing ploeg, when addPloeg is called, then an error is thrown', async () => {
    // given
    mockGetPloegByNaam.mockResolvedValue(ploeg); // Ploeg bestaat al

    // when
    const addExistingPloeg = async () => await ploegService.addPloeg(ploegInput);

    // then
    expect(addExistingPloeg).rejects.toThrow(`De ploeg met naam ${ploegInput.ploegnaam} bestaat al`);
});

test('given a valid ploeg name, when getPloegByNaam is called, then the ploeg is returned', async () => {
    // given
    mockGetPloegByNaam.mockResolvedValue(ploeg); // Ploeg wordt gevonden

    // when
    const result = await ploegService.getPloegByNaam(ploegInput.ploegnaam);

    // then
    expect(mockGetPloegByNaam).toHaveBeenCalledWith(ploegInput.ploegnaam);
    expect(result).toEqual(ploeg);
});

test('given a non-existing ploeg name, when getPloegByNaam is called, then an error is thrown', async () => {
    // given
    mockGetPloegByNaam.mockResolvedValue(null); // Ploeg niet gevonden

    // when
    const getNonExistingPloeg = async () => await ploegService.getPloegByNaam(ploegInput.ploegnaam);

    // then
    expect(getNonExistingPloeg).rejects.toThrow('Deze ploeg kan niet gevonden worden');
});

test('given a valid ploeg name, when verwijderPloeg is called , then the ploeg is removed successfully', async () => {
    // given
    mockGetPloegByNaam.mockResolvedValue(ploeg); // Ploeg bestaat
    mockGetTrainingSessionByPloegNaam.mockResolvedValue(null); // Geen training sessie gevonden

    // when
    await ploegService.verwijderPloeg(ploegInput.ploegnaam);

    // then
    expect(mockGetPloegByNaam).toHaveBeenCalledWith(ploegInput.ploegnaam);
    expect(mockVerwijderPloeg).toHaveBeenCalledWith(ploegInput.ploegnaam);
});

test('given a ploeg with existing training sessions, when verwijderPloeg is called, then the ploeg is removed and training sessions are updated', async () => {
    // given
    mockGetPloegByNaam.mockResolvedValue(ploeg); // Ploeg bestaat
    mockGetTrainingSessionByPloegNaam.mockResolvedValue(true); // Training sessie gevonden

    // when
    await ploegService.verwijderPloeg(ploegInput.ploegnaam);

    // then
    expect(mockGetPloegByNaam).toHaveBeenCalledWith(ploegInput.ploegnaam);
    expect(mockRemovePloegFromTrainingSession).toHaveBeenCalledWith(ploegInput.ploegnaam);
    expect(mockVerwijderPloeg).toHaveBeenCalledWith(ploegInput.ploegnaam);
});

test('given a non-existing ploeg name, when verwijderPloeg is called, then an error is thrown', async () => {
    // given
    mockGetPloegByNaam.mockResolvedValue(null); // Ploeg niet gevonden

    // when
    const removeNonExistingPloeg = async () => await ploegService.verwijderPloeg(ploegInput.ploegnaam);

    // then
    expect(removeNonExistingPloeg).rejects.toThrow(`De ploeg met naam ${ploegInput.ploegnaam} bestaat niet`);
});

test('given a valid ploeg name and data, when updatePloeg is called, then the ploeg is updated successfully', async () => {
    // given
    const updatedData = { niveau: 'Amateur' };
    const updatedPloeg = new Ploeg({ ...ploegInput, ...updatedData }); // Maak een bijgewerkte ploeg aan
    mockGetPloegByNaam.mockResolvedValue(ploeg); // Ploeg bestaat
    mockUpdatePloeg.mockResolvedValue(updatedPloeg); // Simuleer succesvolle update

    // when
    const result = await ploegService.updatePloeg(ploegInput.ploegnaam, updatedData);

    // then
    expect(mockGetPloegByNaam).toHaveBeenCalledWith(ploegInput.ploegnaam);
    expect(mockUpdatePloeg).toHaveBeenCalledWith(ploegInput.ploegnaam, updatedData);
    expect(result).toEqual(updatedPloeg); // Controleer of het resultaat de bijgewerkte ploeg is
});

test('given a non-existing ploeg name, when updatePloeg is called, then an error is thrown', async () => {
    // given
    mockGetPloegByNaam.mockResolvedValue(null); // Ploeg niet gevonden

    // when
    const updateNonExistingPloeg = async () => await ploegService.updatePloeg(ploegInput.ploegnaam, { niveau: 'Nieuw Niveau' });

    // then
    expect(updateNonExistingPloeg).rejects.toThrow(`De ploeg met naam ${ploegInput.ploegnaam} bestaat niet`);
});