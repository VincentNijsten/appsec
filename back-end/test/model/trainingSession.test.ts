import { TrainingSession } from "../../model/trainingSession";
import { Coach } from "../../model/coach";
import { Ploeg } from "../../model/ploeg";
import { Speler } from "../../model/speler";
import { Zaal } from "../../model/zaal";

describe('TrainingSession', () => {
    const coach = new Coach({ naam: 'Jan', coachlicentie: '1234567' });
    const speler1 = new Speler({ naam: 'Speler 1', spelerlicentie: '1234567', leeftijd: 20 });
    const ploeg = new Ploeg({ niveau: 'Professioneel', ploegnaam: 'Team A', spelers: [speler1], coach });
    const zaal = new Zaal({ naam: 'Zaal 1', address:'teststraat 123', beschikbaarheid: true});

    test('given: valid training session data, when: training session is created, then: training session is created with those values', () => {
        // given
        const trainingData = {
            ploeg,
            zaal,
            datum: new Date('2023-10-01'),
            startTijd: '10:00',
            eindTijd: '11:00',
        };

        // when
        const trainingSession = new TrainingSession(trainingData);

        // then
        expect(trainingSession.getPloeg()).toEqual(ploeg);
        expect(trainingSession.getZaal()).toEqual(zaal);
        expect(trainingSession.getDatum()).toEqual(trainingData.datum);
        expect(trainingSession.getStartTijd()).toEqual(trainingData.startTijd);
        expect(trainingSession.getEindTijd()).toEqual(trainingData.eindTijd);
    });

    test('given: an existing training session, when: changing the date, then: date is updated correctly', () => {
        // given
        const trainingSession = new TrainingSession({
            ploeg,
            zaal,
            datum: new Date('2023-10-01'),
            startTijd: '10:00',
            eindTijd: '11:00',
        });

        // when
        const newDate = new Date('2023-10-02');
        trainingSession.setDatum(newDate);

        // then
        expect(trainingSession.getDatum()).toEqual(newDate);
    });

    test('given: an existing training session, when: setting invalid times, then: an error is thrown', () => {
        // given
        const trainingSession = new TrainingSession({
            ploeg,
            zaal,
            datum: new Date('2023-10-01'),
            startTijd: '10:00',
            eindTijd: '11:00',
        });

        // when
        const setInvalidTimes = () => trainingSession.setTijden('11:00', '10:00');

        // then
        expect(setInvalidTimes).toThrow('Start time cannot be after or equal to end time');
    });

    test('given: an existing training session, when: setting valid times, then: times are updated correctly', () => {
        // given
        const trainingSession = new TrainingSession({
            ploeg,
            zaal,
            datum: new Date('2023-10-01'),
            startTijd: '10:00',
            eindTijd: '11:00',
        });

        // when
        trainingSession.setTijden('09:00', '10:00');

        // then
        expect(trainingSession.getStartTijd()).toEqual('09:00');
        expect(trainingSession.getEindTijd()).toEqual('10:00');
    });

    test('given: an existing training session, when: displaying session details, then: details are displayed correctly', () => {
        // given
        const trainingSession = new TrainingSession({
            ploeg,
            zaal,
            datum: new Date('2023-10-01'),
            startTijd: '10:00',
            eindTijd: '11:00',
        });

        // when
        const details = trainingSession.displaySessionDetails();

        // then
        expect(details).toContain('Training Session:');
        expect(details).toContain(`Team: ${ploeg.getPloegnaam()}`);
        expect(details).toContain(`Hall: ${zaal.getNaam()}`);
        expect(details).toContain(`Date: ${trainingSession.getDatum().toDateString()}`);
        expect(details).toContain(`Time: ${trainingSession.getStartTijd()} - ${trainingSession.getEindTijd()}`);
    });
});