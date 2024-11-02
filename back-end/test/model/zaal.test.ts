import { Zaal } from "../../model/zaal";

describe('Zaal', () => {
    test('given: valid values for hall, when: hall is created, then: hall is created with those values', () => {
        // given
        const validHallData = { address: 'testZaalstraat 1', naam: 'Zaal 1', beschikbaarheid: true };

        // when
        const zaal = new Zaal(validHallData);

        // then
        expect(zaal.getAddress()).toEqual(validHallData.address);
        expect(zaal.getNaam()).toEqual(validHallData.naam);
        expect(zaal.getBeschikbaarheid()).toEqual(validHallData.beschikbaarheid);
    });

    test('given: an existing hall, when: changing the name, then: name is updated correctly', () => {
        // given
        const zaal = new Zaal({ address: 'testZaalstraat 1', naam: 'Zaal 1', beschikbaarheid: true });

        // when
        zaal.setNaam('Zaal 2');

        // then
        expect(zaal.getNaam()).toEqual('Zaal 2');
    });

    test('given: an existing hall, when: setting an empty name, then: an error is thrown', () => {
        // given
        const zaal = new Zaal({ address: 'testZaalstraat 1', naam: 'Zaal 1', beschikbaarheid: true });

        // when
        const setEmptyName = () => zaal.setNaam('');

        // then
        expect(setEmptyName).toThrow('Naam is verplicht.');
    });

    test('given: an existing hall, when: changing the address, then: address is updated correctly', () => {
        // given
        const zaal = new Zaal({ address: 'testZaalstraat 1', naam: 'Zaal 1', beschikbaarheid: true });

        // when
        zaal.setAddress('testZaalstraat 2');

        // then
        expect(zaal.getAddress()).toEqual('testZaalstraat 2');
    });

    test('given: an existing hall, when: changing availability, then: availability is updated correctly', () => {
        // given
        const zaal = new Zaal({ address: 'testZaalstraat 1', naam: 'Zaal 1', beschikbaarheid: true });

        // when
        zaal.setBeschikbaarheid(false);

        // then
        expect(zaal.getBeschikbaarheid()).toEqual(false);
    });
});