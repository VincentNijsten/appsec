import { Coach } from '../../model/coach';

describe('Coach', () => {
    test('given: valid values for coach, when: coach is created, then: coach is created with those values', () => {
        // given
        const validCoachData = {
            naam: 'John Doe',
            coachLicentie: '1234567',
        };

        // when
        const coach = new Coach(validCoachData);

        // then
        expect(coach.getNaam()).toEqual(validCoachData.naam);
        expect(coach.getCoachlicentie()).toEqual(validCoachData.coachLicentie);
    });

    test('given: an existing coach, when: updating the coach name, then: the name is updated', () => {
        // given
        const coach = new Coach({
            naam: 'John Doe',
            coachLicentie: '1234567',
        });

        // when
        coach.setNaam('Jane Doe');

        // then
        expect(coach.getNaam()).toEqual('Jane Doe');
    });

    test('given: an invalid coach name, when: setting the name, then: an error is thrown', () => {
        // given
        const coach = new Coach({
            naam: 'John Doe',
            coachLicentie: '1234567',
        });

        // when
        const setInvalidName = () => coach.setNaam('');

        // then
        expect(setInvalidName).toThrow('Naam van de coach is verplicht.');
    });

    test('given: an invalid coach license, when: setting the license, then: an error is thrown', () => {
        // given
        const coach = new Coach({
            naam: 'John Doe',
            coachLicentie: '1234567',
        });

        // when
        const setInvalidLicense = () => coach.setCoachlicentie('12345'); // Te kort

        // then
        expect(setInvalidLicense).toThrow('Coachlicentie moet uit zeven cijfers bestaan.');
    });

    test('given: a coach with an invalid license, when: creating the coach, then: an error is thrown', () => {
        // when
        const createInvalidCoach = () => new Coach({
            naam: 'John Doe',
            coachLicentie: '12345', // Te kort
        });

        // then
        expect(createInvalidCoach).toThrow('Coachlicentie moet uit zeven cijfers bestaan.');
    });
});