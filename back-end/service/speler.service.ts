import spelersDb from "../repository/speler.db"; // Zorg ervoor dat je het juiste pad naar je spelers.db.ts bestand gebruikt
import { Speler } from "../model/speler"; // Zorg ervoor dat je het juiste pad naar de Speler klasse gebruikt

// Functie om alle spelers op te halen
const getAllSpelers = (): Speler[] => {
    return spelersDb.getAllSpelers();
}

// Functie om een speler op naam op te halen
const getSpelerByNaam = (naam: string): Speler | undefined => {
    const speler = spelersDb.getSpelerByNaam({ naam });

    if (speler == undefined) {
        throw new Error('Deze speler kan niet gevonden worden');
    } else {
        return speler;
    }
}

const getSpelerByLicentie = (licentie: string): Speler | null => {
    return spelersDb.getSpelerByLicentie(licentie);
}

// Functie om een speler toe te voegen
const addSpeler = (speler: Speler): string => {
    spelersDb.addSpeler(speler);
    return "Speler succesvol toegevoegd";
}

// Exporteer de functies
export default {
    getAllSpelers,
    getSpelerByNaam,
    addSpeler,
    getSpelerByLicentie
}