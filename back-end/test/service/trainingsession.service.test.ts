import trainingSessionService from '../../service/trainingSession.service';
import trainingSessionsDb from '../../repository/trainingSession.db';
import zaalDb from '../../repository/zaal.db';
import { TrainingSession } from '../../model/trainingSession';
import { Ploeg } from '../../model/ploeg';

const trainingSessionInput = {
    id: 'TS123',
    zaalNaam: 'Hoofdzaal',
    datum: new Date('2023-10-01'),
    startTijd: '10:00',
    eindTijd: '11:00',
    ploegen: [new Ploeg({ ploegnaam: 'Heren A', niveau: 'Professioneel', coachLicentie: '1234567' })],
};

const trainingSession = new TrainingSession(trainingSessionInput);

let mockGetAllTrainingSessions: jest.Mock;
let mockGetTrainingSessionByPloegNaam: jest.Mock;
let mockAddTrainingSession: jest.Mock;
let mockRemoveTrainingSession: jest.Mock;
let mockRemovePloegFromTrainingSession: jest.Mock;
let mockGetAllZalen: jest.Mock;
let mockGetTrainingSessionsByZaal: jest.Mock;

beforeEach(() => {
    mockGetAllTrainingSessions = jest.fn();
    mockGetTrainingSessionByPloegNaam = jest.fn();
    mockAddTrainingSession = jest.fn();
    mockRemoveTrainingSession = jest.fn();
    mockRemovePloegFromTrainingSession = jest.fn();
    mockGetAllZalen = jest.fn();
    mockGetTrainingSessionsByZaal = jest.fn();

    trainingSessionsDb.getAllTrainingSessions = mockGetAllTrainingSessions;
    trainingSessionsDb.getTrainingSessionByPloegNaam = mockGetTrainingSessionByPloegNaam;
    trainingSessionsDb.addTrainingSession = mockAddTrainingSession;
    trainingSessionsDb.removeTrainingSession = mockRemoveTrainingSession;
    trainingSessionsDb.removePloegFromTrainingSession = mockRemovePloegFromTrainingSession;
    zaalDb.getAllZalen = mockGetAllZalen;
    trainingSessionsDb.getTrainingSessionsByZaal = mockGetTrainingSessionsByZaal;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid training session, when addTrainingSession is called, then the training session is added successfully', async () => {
    // given
    mockGetAllZalen.mockResolvedValue([{ getNaam: () => 'Hoofdzaal' }]); // Zaal bestaat
    mockGetTrainingSessionsByZaal.mockResolvedValue([]); // Geen bestaande trainingen

    // when
    const result = await trainingSessionService.addTrainingSession(trainingSessionInput);

    // then
    expect(mockGetAllZalen).toHaveBeenCalled();
    expect(mockGetTrainingSessionsByZaal).toHaveBeenCalledWith('Hoofdzaal');
    expect(mockAddTrainingSession).toHaveBeenCalledWith(expect.any(TrainingSession));
    expect(result).toBe("Training succesvol toegevoegd");
});

test('given a non-existing zaal, when addTrainingSession is called, then an error is thrown', async () => {
    // given
    mockGetAllZalen.mockResolvedValue([]); // Zaal bestaat niet

    // when
    const addTrainingSessionWithNonExistingZaal = async () => await trainingSessionService.addTrainingSession(trainingSessionInput);

    // then
    expect(addTrainingSessionWithNonExistingZaal).rejects.toThrow(`Zaal met naam ${trainingSessionInput.zaalNaam} niet gevonden.`);
});

test('given an overlapping training session, when addTrainingSession is called, then an error is thrown', async () => {
    // given
    mockGetAllZalen.mockResolvedValue([{ getNaam: () => 'Hoofdzaal' }]); // Zaal bestaat
    mockGetTrainingSessionsByZaal.mockResolvedValue([trainingSession]); // Bestaande training in dezelfde zaal

    // when
    const addOverlappingTrainingSession = async () => await trainingSessionService.addTrainingSession(trainingSessionInput);

    // then
    expect(addOverlappingTrainingSession).rejects.toThrow(`Er is al een training op dat moment bezig in Hoofdzaal.`);
});

test('given a valid ploeg name, when getTrainingSessionByPloegNaam is called, then the training session is returned', async () => {
    // given
    mockGetTrainingSessionByPloegNaam.mockResolvedValue(trainingSession); // Training sessie wordt gevonden

    // when
    const result = await trainingSessionService.getTrainingSessionByPloegNaam(trainingSessionInput.ploegen[0].ploegnaam);

    // then
    expect(mockGetTrainingSessionByPloegNaam).toHaveBeenCalledWith(trainingSessionInput.ploegen[0].ploegnaam);
    expect(result).toEqual(trainingSession);
});

test('given a non-existing ploeg name, when getTrainingSessionByPloegNaam is called, then an error is thrown', async () => {
    // given
    mockGetTrainingSessionByPloegNaam.mockResolvedValue(null); // Training sessie bestaat niet

    // when
    const getNonExistingTrainingSession = async () => await trainingSessionService.getTrainingSessionByPloegNaam('Onbekende Ploeg');

    // then
    expect(getNonExistingTrainingSession).rejects.toThrow('Deze trainingssessie kan niet gevonden worden');
});

test('given a valid training session ID, when removeTrainingSession is called, then the training session is removed successfully', async () => {
    // given
    mockRemoveTrainingSession.mockResolvedValue(true); // Training sessie wordt verwijderd

    // when
    const result = await trainingSessionService.removeTrainingSession(trainingSessionInput.id);

    // then
    expect(mockRemoveTrainingSession).toHaveBeenCalledWith(trainingSessionInput.id);
    expect(result).toBe("Training sessie succesvol verwijderd");
});

test('given a non-existing training session ID, when removeTrainingSession is called, then an error is thrown', async () => {
    // given
    mockRemoveTrainingSession.mockResolvedValue(false); // Training sessie bestaat niet

    // when
    const removeNonExistingTrainingSession = async () => await trainingSessionService.removeTrainingSession('TS000');

    // then
    expect(removeNonExistingTrainingSession).rejects.toThrow('Kon de trainingssessie niet verwijderen');
});

test('given a valid ploeg name, when removePloegFromTrainingSession is called, then the ploeg is removed successfully', async () => {
    // given
    mockRemovePloegFromTrainingSession.mockResolvedValue(true); // Ploeg wordt verwijderd

    // when
    const result = await trainingSessionService.removePloegFromTrainingSession(trainingSessionInput.ploegen[0].ploegnaam);

    // then
    expect(mockRemovePloegFromTrainingSession).toHaveBeenCalledWith(trainingSessionInput.ploegen[0].ploegnaam);
    expect(result).toBe("Ploeg succesvol verwijderd");
});

test('given a non-existing ploeg name, when removePloegFromTrainingSession is called, then an error is thrown', async () => {
    // given
    mockRemovePloegFromTrainingSession.mockResolvedValue(false); // Ploeg bestaat niet

    // when
    const removeNonExistingPloeg = async () => await trainingSessionService.removePloegFromTrainingSession('Onbekende Ploeg');

    // then
    expect(removeNonExistingPloeg).rejects.toThrow('Kon de ploeg niet verwijderen');
});