import { TrainingSession } from '../../model/trainingSession';
import { Ploeg } from '../../model/ploeg';

describe('TrainingSession', () => {
    test('given: valid values for training session, when: training session is created, then: training session is created with those values', () => {
        // given
        const validTrainingSessionData = {
            id: '1',
            zaalNaam: 'Brussel Zaal 1',
            datum: new Date('2024-12-18'),
            startTijd: '20:00',
            eindTijd: '22:00',
            ploegen: [],
        };

        // when
        const trainingSession = new TrainingSession(validTrainingSessionData);

        // then
        expect(trainingSession.getZaalNaam()).toEqual(validTrainingSessionData.zaalNaam);
        expect(trainingSession.getDatum()).toEqual(validTrainingSessionData.datum);
        expect(trainingSession.getStartTijd()).toEqual(validTrainingSessionData.startTijd);
        expect(trainingSession.getEindTijd()).toEqual(validTrainingSessionData.eindTijd);
        expect(trainingSession.getPloegen()).toEqual(validTrainingSessionData.ploegen);
    });

    test('given: an existing training session, when: adding a ploeg, then: the ploeg is added to the session', () => {
        // given
        const ploeg = new Ploeg({
            niveau: 'Professioneel',
            ploegnaam: 'Heren A',
            coachLicentie: '1234567',
        });
        const trainingSession = new TrainingSession({
            id: '1',
            zaalNaam: 'Brussel Zaal 1',
            datum: new Date('2024-12-18'),
            startTijd: '20:00',
            eindTijd: '22:00',
            ploegen: [],
        });

        // when
        trainingSession.addPloeg(ploeg);

        // then
        expect(trainingSession.getPloegen()).toContain(ploeg);
    });

    test('given: end time is before start time, when: setting the times, then: an error is thrown', () => {
        // given
        const trainingSession = new TrainingSession({
            id: '1',
            zaalNaam: 'Brussel Zaal 1',
            datum: new Date('2024-12-18'),
            startTijd: '20:00',
            eindTijd: '22:00',
            ploegen: [],
        });

        // when
        const setInvalidTimes = () => trainingSession.setTijden('22:00', '20:00');

        // then
        expect(setInvalidTimes).toThrow('Start time cannot be after or equal to end time');
    });

    test('given: a training session, when: setting the zaal, then: the zaal is updated', () => {
        // given
        const trainingSession = new TrainingSession({
            id: '1',
            zaalNaam: 'Brussel Zaal 1',
            datum: new Date('2024-12-18'),
            startTijd: '20:00',
            eindTijd: '22:00',
            ploegen: [],
        });

        // when
        trainingSession.setZaal('Brussel Zaal 2');

        // then
        expect(trainingSession.getZaalNaam()).toEqual('Brussel Zaal 2');
    });
});