import zaalService from '../../service/zaal.service';
import zaalDb from '../../repository/zaal.db';
import { Zaal } from '../../model/zaal';
import { ZaalInput } from '../../types';

const zaalInput: ZaalInput = {
    naam: 'Hoofdzaal',
    address: 'Hoofdstraat 1',
    beschikbaarheid: true,
    velden: []
};

const zaal = new Zaal(zaalInput);

let mockGetAllZalen: jest.Mock;
let mockGetZaalByNaam: jest.Mock;
let mockAddZaal: jest.Mock;
let mockUpdateZaal: jest.Mock;
let mockDeleteZaal: jest.Mock;

beforeEach(() => {
    mockGetAllZalen = jest.fn();
    mockGetZaalByNaam = jest.fn();
    mockAddZaal = jest.fn();
    mockUpdateZaal = jest.fn();
    mockDeleteZaal = jest.fn();

    zaalDb.getAllZalen = mockGetAllZalen;
    zaalDb.getZaalByNaam = mockGetZaalByNaam;
    zaalDb.addZaal = mockAddZaal;
    zaalDb.updateZaal = mockUpdateZaal;
    zaalDb.deleteZaal = mockDeleteZaal;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('when getAllZalen is called and zalen exist, then return zalen', async () => {
    // given
    mockGetAllZalen.mockResolvedValue([zaal]); // Zalen bestaan

    // when
    const result = await zaalService.getAllZalen();

    // then
    expect(mockGetAllZalen).toHaveBeenCalled();
    expect(result).toEqual([zaal]);
});

test('when getAllZalen is called and no zalen exist, then throw an error', async () => {
    // given
    mockGetAllZalen.mockResolvedValue([]); // Geen zalen

    // when
    const getNoZalen = async () => await zaalService.getAllZalen();

    // then
    expect(getNoZalen).rejects.toThrow("Geen zalen gevonden.");
});

test('when getZaalByNaam is called and zaal exists, then return zaal', async () => {
    // given
    mockGetZaalByNaam.mockResolvedValue(zaal); // Zaal bestaat

    // when
    const result = await zaalService.getZaalByNaam(zaalInput.naam);

    // then
    expect(mockGetZaalByNaam).toHaveBeenCalledWith(zaalInput.naam);
    expect(result).toEqual(zaal);
});

test('when getZaalByNaam is called and zaal does not exist, then throw an error', async () => {
    // given
    mockGetZaalByNaam.mockResolvedValue(null); // Zaal bestaat niet

    // when
    const getNonExistingZaal = async () => await zaalService.getZaalByNaam('Onbekende Zaal');

    // then
    expect(getNonExistingZaal).rejects.toThrow('Deze zaal kan niet gevonden worden');
});

test('when addZaal is called with a new zaal, then zaal is added successfully', async () => {
    // given
    mockGetZaalByNaam.mockResolvedValue(null); // Zaal bestaat nog niet

    // when
    const result = await zaalService.addZaal(zaalInput);

    // then
    expect(mockGetZaalByNaam).toHaveBeenCalledWith(zaalInput.naam);
    expect(mockAddZaal).toHaveBeenCalledWith(expect.any(Zaal));
    expect(result).toBe(`Zaal: ${zaalInput.naam} succesvol toegevoegd op adres: ${zaalInput.address}`);
});

test('when addZaal is called with an existing zaal, then throw an error', async () => {
    // given
    mockGetZaalByNaam.mockResolvedValue(zaal); // Zaal bestaat al

    // when
    const addExistingZaal = async () => await zaalService.addZaal(zaalInput);

    // then
    expect(addExistingZaal).rejects.toThrow(`De zaal met naam ${zaalInput.naam} bestaat al`);
});

test('when updateZaal is called with an existing zaal, then zaal is updated successfully', async () => {
    // given
    const updatedData = { beschikbaarheid: false };
    const updatedZaal = new Zaal({ ...zaalInput, ...updatedData }); // Maak een bijgewerkte zaal aan
    mockGetZaalByNaam.mockResolvedValue(zaal); // Zaal bestaat
    mockUpdateZaal.mockResolvedValue(updatedZaal); // Simuleer succesvolle update

    // when
    const result = await zaalService.updateZaal(zaalInput.naam, updatedData);

    // then
    expect(mockGetZaalByNaam).toHaveBeenCalledWith(zaalInput.naam);
    expect(mockUpdateZaal).toHaveBeenCalledWith(zaalInput.naam, updatedData);
    expect(result).toEqual(updatedZaal);
});

test('when updateZaal is called with a non-existing zaal, then throw an error', async () => {
    // given
    mockGetZaalByNaam.mockResolvedValue(null); // Zaal bestaat niet

    // when
    const updateNonExistingZaal = async () => await zaalService.updateZaal('Onbekende Zaal', {});

    // then
    expect(updateNonExistingZaal).rejects.toThrow(`De zaal met naam Onbekende Zaal bestaat niet`);
});

test('when deleteZaal is called with an existing zaal, then zaal is deleted successfully', async () => {
    // given
    mockGetZaalByNaam.mockResolvedValue(zaal); // Zaal bestaat

    // when
    await zaalService.deleteZaal(zaalInput.naam);

    // then
    expect(mockGetZaalByNaam).toHaveBeenCalledWith(zaalInput.naam);
    expect(mockDeleteZaal).toHaveBeenCalledWith(zaalInput.naam);
});

test('when deleteZaal is called with a non-existing zaal, then throw an error', async () => {
    // given
    mockGetZaalByNaam.mockResolvedValue(null); // Zaal bestaat niet

    // when
    const deleteNonExistingZaal = async () => await zaalService.deleteZaal('Onbekende Zaal');

    // then
    expect(deleteNonExistingZaal).rejects.toThrow(`De zaal met naam Onbekende Zaal bestaat niet`);
});