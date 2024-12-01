import spelersDb from "../repository/speler.db"; 
import { Speler } from "../model/speler"; 
import { SpelerInput } from "../types";

// Functie om alle spelers op te halen
const getAllSpelers = async (): Promise<Speler[]> => {
    return await spelersDb.getAllSpelers();
}

// Functie om een speler op naam op te halen
const getSpelerByNaam = async (naam: string): Promise<Speler> => {
    const speler = await spelersDb.getSpelerByNaam(naam);

    if (speler === undefined) {
        throw new Error('Deze speler kan niet gevonden worden');
    } else {
        return speler;
    }
}

// Functie om een speler op basis van licentie op te halen
const getSpelerByLicentie = async (licentie: string): Promise<Speler | null> => {
    return await spelersDb.getSpelerByLicentie(licentie);
}

// Functie om een speler toe te voegen
const addSpeler = async ({ naam, spelerLicentie, leeftijd, ploegNaam}: SpelerInput): Promise<string> => {
    const exists = await spelersDb.getSpelerByLicentie(spelerLicentie);
    if (exists) {
        throw new Error(`De speler met de licentie: ${spelerLicentie} bestaat al, ${exists.getNaam()}`);
    }

    const newSpeler = new Speler({ naam, spelerLicentie, leeftijd, ploegNaam });
    await spelersDb.addSpeler(newSpeler); // Zorg ervoor dat deze functie asynchroon is
    return "Speler succesvol toegevoegd";
}

// Exporteer de functies
export default {
    getAllSpelers,
    getSpelerByNaam,
    addSpeler,
    getSpelerByLicentie
};