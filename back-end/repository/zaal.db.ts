import { Zaal } from '../model/zaal'; // Zorg ervoor dat je het juiste pad naar de Zaal klasse gebruikt

// Voorbeeld van zalen
const zaal1 = new Zaal({naam:'haasrode zaal 1', address:'schapenstraat 141 3000', beschikbaarheid:true}); 
const zaal2 = new Zaal({naam:'haasrode zaal 2', address:'schapenstraat 141 3000', beschikbaarheid:false}); 

// Functie om een zaal op naam te vinden
const getZaalByNaam = ({ zaalnaam }: { zaalnaam: string }): Zaal | null => {
    try {
        return [zaal1, zaal2].find((zaal) => zaal.getNaam() === zaalnaam) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om alle zalen op te halen
const getAllZalen = (): Zaal[] => {
    try {
        return [zaal1, zaal2]; // Retourneer de lijst van zalen
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om een zaal toe te voegen
const addZaal = (zaal: Zaal): void => {
    try {
        console.log(`Zaal ${zaal.getNaam()} toegevoegd.`);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getZaalByNaam,
    getAllZalen,
    addZaal,
};