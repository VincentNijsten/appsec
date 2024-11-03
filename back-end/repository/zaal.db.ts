import { Zaal } from '../model/zaal'; // Zorg ervoor dat je het juiste pad naar de Zaal klasse gebruikt


const zalen : Zaal[] = [];



// Voorbeeld van zalen
const zaal1 = new Zaal({naam:'haasrode zaal 1', address:'schapenstraat 141', beschikbaarheid:true}); 
const zaal2 = new Zaal({naam:'haasrode zaal 2', address:'schapenstraat 141', beschikbaarheid:false}); 

zalen.push(zaal1);
zalen.push(zaal2);

// Functie om een zaal op naam te vinden
const getZaalByNaam = ({ naam }: { naam: string }): Zaal | null => {
    try {
        return zalen.find((zaal) => zaal.getNaam() === naam) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om alle zalen op te halen
const getAllZalen = (): Zaal[] => {
    
    try {
        return zalen; // Retourneer de lijst van zalen
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