import { Speler } from '../../model/speler';
import spelerDb from '../../repository/speler.db';
import spelerService from '../../service/speler.service';

let speler: Speler;

let mockGetSpelerBySpelerlicentie : jest.Mock;


beforeEach(() => {
    mockGetSpelerBySpelerlicentie = jest.fn();
    spelerDb.getSpelerByLicentie = mockGetSpelerBySpelerlicentie;

    const spelerInput = {
        naam: 'Speler 1',
        spelerlicentie: '1234567',
        leeftijd: 22,
    };
    speler = new Speler(spelerInput);
});


afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid speler input, when creating a speler, then the speler is created successfully', () => {
    expect(speler.getNaam()).toEqual('Speler 1');
    expect(speler.getSpelerlicentie()).toEqual('1234567');
    expect(speler.getLeeftijd()).toEqual(22);
});

test('given an invalid naam, when setting naam, then an error is thrown', () => {
    const setNaam = () => speler.setNaam('');
    expect(setNaam).toThrow('Naam van de speler is verplicht.');
});

test('given an invalid spelerlicentie, when setting spelerlicentie, then an error is thrown', () => {
    const setSpelerlicentie = () => speler.setSpelerlicentie('12345'); // Te kort
    expect(setSpelerlicentie).toThrow('Coachlicentie moet uit zeven cijfers bestaan.');
});

test('given an invalid leeftijd, when setting leeftijd, then an error is thrown', () => {
    const setLeeftijdNegatief = () => speler.setLeeftijd(-1);
    const setLeeftijdTeHoog = () => speler.setLeeftijd(121);

    expect(setLeeftijdNegatief).toThrow('Leeftijd moet een geldig getal zijn tussen 0 en 120.');
    expect(setLeeftijdTeHoog).toThrow('Leeftijd moet een geldig getal zijn tussen 0 en 120.');
});

test('given a valid leeftijd, when setting leeftijd, then the leeftijd is set successfully', () => {
    speler.setLeeftijd(30);
    expect(speler.getLeeftijd()).toEqual(30);
});


test('given a speler that already exists, when adding a speler, then an error is thrown', () => {
    // given
    mockGetSpelerBySpelerlicentie.mockReturnValue(speler); 
    
    // when
    const addSpeler = () => spelerService.addSpeler(speler);
    
    // then
    expect(addSpeler).toThrow(`de speler met de licentie: ${speler.spelerlicentie} bestaal al, ${speler.getNaam()}`);
});