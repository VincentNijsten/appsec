import { Coach } from "../../model/coach";

describe('Coach', () => {
    test('given: valid values for coach, when: coach is created, then: coach is created with those values', () => {
        // given
        const validCoachData = { naam: 'Jan', coachlicentie: '1234567' };

        // when
        const coach = new Coach(validCoachData);

        // then
        expect(coach.getNaam()).toEqual(validCoachData.naam);
        expect(coach.getCoachlicentie()).toEqual(validCoachData.coachlicentie);
    });

    test('given: an existing coach, when: changing the name, then: name is updated correctly', () => {
        // given
        const coach = new Coach({ naam: 'Jan', coachlicentie: '1234567' });

        // when
        coach.setNaam('Piet');

        // then
        expect(coach.getNaam()).toEqual('Piet');
    });

    test('given: an existing coach, when: setting an empty name, then: an error is thrown', () => {
        // given
        const coach = new Coach({ naam: 'Jan', coachlicentie: '1234567' });

        // when
        const setEmptyName = () => coach.setNaam('');

        // then
        expect(setEmptyName).toThrow('Naam van de coach is verplicht.');
    });

    test('given: an existing coach, when: setting a coach license that does not match the regex, then: an error is thrown', () => {
        // given
        const coach = new Coach({ naam: 'Jan', coachlicentie: '1234567' });

        // when
        const setInvalidLicense = () => coach.setCoachlicentie('12345');

        // then
        expect(setInvalidLicense).toThrow('Coachlicentie moet uit zeven cijfers bestaan.');
    });

    test('given: an existing coach, when: setting a valid coach license, then: license is updated correctly', () => {
        // given
        const coach = new Coach({ naam: 'Jan', coachlicentie: '1234567' });

        // when
        coach.setCoachlicentie('7654321');

        // then
        expect(coach.getCoachlicentie()).toEqual('7654321');
    });
});