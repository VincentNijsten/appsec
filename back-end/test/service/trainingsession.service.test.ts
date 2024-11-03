import { TrainingSession } from '../../model/trainingSession';
import { Ploeg } from '../../model/ploeg';
import { Zaal } from '../../model/zaal';
import { CoachInput, PloegInput, SpelerInput, ZaalInput } from '../../types';
import { Speler } from '../../model/speler';
import { Coach } from '../../model/coach';

const coachInput : CoachInput = {
    naam: 'Coach A',
    coachlicentie: '1234567'
}


const ploegInput : PloegInput = {
    niveau: 'Professioneel',
    ploegnaam: 'Team A',
    spelers: [],
    coach: coachInput,
};



const zaalInput :ZaalInput= {
    naam: 'Zaal 1',
    address: 'Straatnaam 1',
    beschikbaarheid: true,
};

const ploeg = new Ploeg({
    niveau: ploegInput.niveau,
    ploegnaam: ploegInput.ploegnaam,
    spelers: ploegInput.spelers.map(speler => new Speler(speler)), 
    coach: new Coach(coachInput), 
});
const zaal = new Zaal(zaalInput);

let trainingSession: TrainingSession;

beforeEach(() => {
    trainingSession = new TrainingSession({
        ploeg: ploeg,
        zaal: zaal,
        datum: new Date('2023-10-01'),
        startTijd: '10:00',
        eindTijd: '11:00',
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid training session input, when creating a training session, then the training session is created successfully', () => {
    expect(trainingSession.getPloeg()).toEqual(ploeg);
    expect(trainingSession.getZaal()).toEqual(zaal);
    expect(trainingSession.getDatum()).toEqual(new Date('2023-10-01'));
    expect(trainingSession.getStartTijd()).toEqual('10:00');
    expect(trainingSession.getEindTijd()).toEqual('11:00');
});

test('given an invalid end time, when setting start and end time, then an error is thrown', () => {
    const setInvalidTijden = () => trainingSession.setTijden('11:00', '10:00'); // Eindtijd is voor starttijd
    expect(setInvalidTijden).toThrow('Start time cannot be after or equal to end time');
});

test('given valid start and end time, when setting times, then the times are set successfully', () => {
    trainingSession.setTijden('09:00', '10:00');
    expect(trainingSession.getStartTijd()).toEqual('09:00');
    expect(trainingSession.getEindTijd()).toEqual('10:00');
});

test('given a valid ploeg, when setting ploeg, then the ploeg is set successfully', () => {
    trainingSession.setPloeg(ploeg);
    expect(trainingSession.getPloeg()).toEqual(ploeg);
});

test('given a valid zaal, when setting zaal, then the zaal is set successfully', () => {

    trainingSession.setZaal(zaal);
    expect(trainingSession.getZaal()).toEqual(zaal);
});

test('when displaying session details, then the correct details are returned', () => {
    const expectedDetails = `Training Session:
        Team: Team A
        Hall: Zaal 1
        Date: Sun Oct 01 2023
        Time: 10:00 - 11:00`;
    expect(trainingSession.displaySessionDetails()).toEqual(expectedDetails);
});