import spelerService from '../../service/speler.service';
import spelersDb from '../../repository/speler.db';
import ploegDb from '../../repository/ploeg.db';
import { Speler } from '../../model/speler';

jest.mock('../../repository/speler.db');
jest.mock('../../repository/ploeg.db');

const mockGetSpelerByLicentie = spelersDb.getSpelerByLicentie as jest.Mock;
const mockGetPloegByNaam = ploegDb.getPloegByNaam as jest.Mock;
const mockAddSpeler = spelersDb.addSpeler as jest.Mock;
const mockGetSpelerByNaam = spelersDb.getSpelerByNaam as jest.Mock;

describe('spelerService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const spelerInput = {
        naam: 'John Doe',
        spelerLicentie: '1234567',
        leeftijd: 25,
        ploegNaam: 'Team A'
    };

    const speler = new Speler(spelerInput);

    test('given an existing speler, when addSpeler is called, then an error is thrown', async () => {
        // given
        mockGetSpelerByLicentie.mockResolvedValue(speler);

        // when & then
        await expect(spelerService.addSpeler(spelerInput)).rejects.toThrow(`De speler met de licentie: ${spelerInput.spelerLicentie} bestaat al, ${speler.getNaam()}`);
        expect(mockGetSpelerByLicentie).toHaveBeenCalledWith(spelerInput.spelerLicentie);
    });

    test('given a non-existing ploeg, when addSpeler is called, then an error is thrown', async () => {
        // given
        mockGetSpelerByLicentie.mockResolvedValue(null); // Speler bestaat nog niet
        mockGetPloegByNaam.mockResolvedValue(null); // Ploeg bestaat niet

        // when
        const addSpelerWithNonExistingPloeg = spelerService.addSpeler(spelerInput);

        // then
        await expect(addSpelerWithNonExistingPloeg).rejects.toThrow(`De ploeg met de naam: ${spelerInput.ploegNaam} bestaat niet`);
        expect(mockGetSpelerByLicentie).toHaveBeenCalledWith(spelerInput.spelerLicentie);
        expect(mockGetPloegByNaam).toHaveBeenCalledWith(spelerInput.ploegNaam);
    });

    test('given a valid speler, when addSpeler is called, then the speler is added successfully', async () => {
        // given
        mockGetSpelerByLicentie.mockResolvedValue(null); // Speler bestaat nog niet
        mockGetPloegByNaam.mockResolvedValue({ naam: spelerInput.ploegNaam }); // Ploeg bestaat
        mockAddSpeler.mockResolvedValue(speler);

        // when
        const result = await spelerService.addSpeler(spelerInput);

        // then
        expect(mockGetSpelerByLicentie).toHaveBeenCalledWith(spelerInput.spelerLicentie);
        expect(mockGetPloegByNaam).toHaveBeenCalledWith(spelerInput.ploegNaam);
        expect(mockAddSpeler).toHaveBeenCalledWith(expect.any(Speler));
        expect(result).toBe("Speler succesvol toegevoegd");
    });

    test('given a valid speler name, when getSpelerByNaam is called, then the speler is returned', async () => {
        // given
        mockGetSpelerByNaam.mockResolvedValue(speler); // Speler wordt gevonden

        // when
        const result = await spelerService.getSpelerByNaam(spelerInput.naam);

        // then
        expect(mockGetSpelerByNaam).toHaveBeenCalledWith(spelerInput.naam);
        expect(result).toEqual(speler);
    });

    test('given an invalid speler name, when getSpelerByNaam is called, then an error is thrown', async () => {
        // given
        mockGetSpelerByNaam.mockResolvedValue(undefined); // Speler wordt niet gevonden

        // when & then
        await expect(spelerService.getSpelerByNaam(spelerInput.naam)).rejects.toThrow('Deze speler kan niet gevonden worden');
        expect(mockGetSpelerByNaam).toHaveBeenCalledWith(spelerInput.naam);
    });
});