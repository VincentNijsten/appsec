import { Speler } from "../../model/speler";

describe('Speler', () => {
    test('given: valid values for player, when: player is created, then: player is created with those values', () => {
        // given
        const validPlayerData = { naam: 'John Doe', spelerlicentie: '1234567', leeftijd: 25 };

        // when
        const speler = new Speler(validPlayerData);

        // then
        expect(speler.getNaam()).toEqual(validPlayerData.naam);
        expect(speler.getSpelerlicentie()).toEqual(validPlayerData.spelerlicentie);
        expect(speler.getLeeftijd()).toEqual(validPlayerData.leeftijd);
    });

    test('given: an existing player, when: changing the name, then: name is updated correctly', () => {
        // given
        const speler = new Speler({ naam: 'John Doe', spelerlicentie: '1234567', leeftijd: 25 });

        // when
        speler.setNaam('Jane Doe');

        // then
        expect(speler.getNaam()).toEqual('Jane Doe');
    });

    test('given: an existing player, when: setting an empty name, then: an error is thrown', () => {
        // given
        const speler = new Speler({ naam: 'John Doe', spelerlicentie: '1234567', leeftijd: 25 });

        // when
        const setEmptyName = () => speler.setNaam('');

        // then
        expect(setEmptyName).toThrow('Naam van de speler is verplicht.');
    });

    test('given: an existing player, when: setting an invalid player license, then: an error is thrown', () => {
        // given
        const speler = new Speler({ naam: 'John Doe', spelerlicentie: '1234567', leeftijd: 25 });

        // when
        const setInvalidLicense = () => speler.setSpelerlicentie('12345');

        // then
        expect(setInvalidLicense).toThrow('Coachlicentie moet uit zeven cijfers bestaan.');
    });

    test('given: an existing player, when: setting a valid player license, then: license is updated correctly', () => {
        // given
        const speler = new Speler({ naam: 'John Doe', spelerlicentie: '1234567', leeftijd: 25 });

        // when
        speler.setSpelerlicentie('7654321');

        // then
        expect(speler.getSpelerlicentie()).toEqual('7654321');
    });

    test('given: an existing player, when: setting an invalid age, then: an error is thrown', () => {
        // given
        const speler = new Speler({ naam: 'John Doe', spelerlicentie: '1234567', leeftijd: 25 });

        // when
        const setInvalidAge = () => speler.setLeeftijd(150);

        // then
        expect(setInvalidAge).toThrow('Leeftijd moet een geldig getal zijn tussen 0 en 120.');
    });

    test('given: an existing player, when: setting a valid age, then: age is updated correctly', () => {
        // given
        const speler = new Speler({ naam: 'John Doe', spelerlicentie: '1234567', leeftijd: 25 });

        // when
        speler.setLeeftijd(30);

        // then
        expect(speler.getLeeftijd()).toEqual(30);
    });
});