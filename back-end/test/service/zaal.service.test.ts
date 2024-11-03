import zaalService from '../../service/zaal.service';
import zaalDb from '../../repository/zaal.db';
import { Zaal } from '../../model/zaal';

jest.mock('../../repository/zaal.db'); 

describe('Zaal Service', () => {
    const zaalInput = {
        naam: 'Zaal 1',
        address: 'Straatnaam 1',
        beschikbaarheid: true,
    };
    
    const zaal = new Zaal(zaalInput);

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    test('getAllZalen should return all zalen', () => {
        // Given
        (zaalDb.getAllZalen as jest.Mock).mockReturnValue([zaal]);

        // When
        const result = zaalService.getAllZalen();

        // Then
        expect(result).toEqual([zaal]);
        expect(zaalDb.getAllZalen).toHaveBeenCalled();
    });

    test('getZaalByNaam should return a zaal if it exists', () => {
        // Given
        (zaalDb.getZaalByNaam as jest.Mock).mockReturnValue(zaal);

        // When
        const result = zaalService.getZaalByNaam('Zaal 1');

        // Then
        expect(result).toEqual(zaal);
        expect(zaalDb.getZaalByNaam).toHaveBeenCalledWith({ naam: 'Zaal 1' });
    });

    test('getZaalByNaam should throw an error if the zaal does not exist', () => {
        // Given
        (zaalDb.getZaalByNaam as jest.Mock).mockReturnValue(null);

        // When
        const getZaal = () => zaalService.getZaalByNaam('Onbekend');

        // Then
        expect(getZaal).toThrow('Deze zaal kan niet gevonden worden');
    });

    test('addZaal should add a zaal and return a success message', () => {
        // Given
        (zaalDb.addZaal as jest.Mock).mockReturnValue(undefined); 

        // When
        const result = zaalService.addZaal(zaal);

        // Then
        expect(result).toEqual(`Zaal: ${zaal.naam} succesvol toegevoegd op addres: ${zaal.address}`);
        expect(zaalDb.addZaal).toHaveBeenCalledWith(zaal);
    });
    
});