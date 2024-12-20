import { Speler } from '../../model/speler';

describe('Speler', () => {
    test('given: valid values for speler, when: speler is created, then: speler is created with those values', () => {
        // given
        const validSpelerData = {
            naam: 'Jan Janssen',
            spelerLicentie: '1234567',
            leeftijd: 25,
            ploegNaam: 'Heren A',
        };

        // when
        const speler = new Speler(validSpelerData);

        // then
        expect(speler.getNaam()).toEqual(validSpelerData.naam);
        expect(speler.getspelerLicentie()).toEqual(validSpelerData.spelerLicentie);
        expect(speler.getLeeftijd()).toEqual(validSpelerData.leeftijd);
        expect(speler.ploegNaam).toEqual(validSpelerData.ploegNaam);
    });

    test('given: an existing speler, when: updating the naam, then: the name is updated', () => {
        // given
        const speler = new Speler({
            naam: 'Jan Janssen',
            spelerLicentie: '1234567',
            leeftijd: 25,
            ploegNaam: 'Heren A',
        });

        // when
        speler.setNaam('Piet Pietersen');

        // then
        expect(speler.getNaam()).toEqual('Piet Pietersen');
    });

    test('given: an invalid naam, when: setting the naam, then: an error is thrown', () => {
        // given
        const speler = new Speler({
            naam: 'Jan Janssen',
            spelerLicentie: '1234567',
            leeftijd: 25,
            ploegNaam: 'Heren A',
        });

        // when
        const setInvalidName = () => speler.setNaam('');

        // then
        expect(setInvalidName).toThrow('Naam van de speler is verplicht.');
    });

    test('given: an invalid spelerLicentie, when: setting the spelerLicentie, then: an error is thrown', () => {
        // given
        const speler = new Speler({
            naam: 'Jan Janssen',
            spelerLicentie: '1234567',
            leeftijd: 25,
            ploegNaam: 'Heren A',
        });

        // when
        const setInvalidLicense = () => speler.setspelerLicentie('12345'); // Te kort

        // then
        expect(setInvalidLicense).toThrow('SpelerLicentie moet uit zeven cijfers bestaan.');
    });

    test('given: an invalid leeftijd, when: setting the leeftijd, then: an error is thrown', () => {
        // given
        const speler = new Speler({
            naam: 'Jan Janssen',
            spelerLicentie: '1234567',
            leeftijd: 25,
            ploegNaam: 'Heren A',
        });

        // when
        const setInvalidAge = () => speler.setLeeftijd(150); // Ongeldig

        // then
        expect(setInvalidAge).toThrow('Leeftijd moet een geldig getal zijn tussen 0 en 120.');
    });

    test('given: a speler with null ploegNaam, when: creating the speler, then: the ploegNaam is null', () => {
        // when
        const speler = new Speler({
            naam: 'Jan Janssen',
            spelerLicentie: '1234567',
            leeftijd: 25,
            ploegNaam: null,
        });

        // then
        expect(speler.ploegNaam).toBeNull();
    });
});