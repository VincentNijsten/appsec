import spelersDb from "../repository/speler.db"; 
import { Speler } from "../model/speler"; 
import { SpelerInput } from "../types";
import ploegDb from "../repository/ploeg.db";

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

    const ploegExists = await ploegDb.getPloegByNaam(ploegNaam);
    if (!ploegExists) {
        throw new Error(`De ploeg met de naam: ${ploegNaam} bestaat niet`);
    }

    if (leeftijd < 0 || leeftijd > 100) {
        throw new Error('De leeftijd van de speler moet tussen 0 en 100 zijn');
    }

    const newSpeler = new Speler({ naam, spelerLicentie, leeftijd, ploegNaam });
    await spelersDb.addSpeler(newSpeler); 
    return "Speler succesvol toegevoegd";
}

const removeSpeler = async (spelerLicentie: string): Promise<string> => {
    try {
        // Zoek de coach op basis van de coachlicentie
        const speler = await spelersDb.getSpelerByLicentie(spelerLicentie);

        // Controleer of de coach bestaat
        if (speler) {
            await spelersDb.deleteSpeler(spelerLicentie); 
            return "Coach succesvol verwijderd"; 
        } else {
            throw new Error('Coach niet gevonden');
        }
        
    } catch (error) {
        throw new Error('Coach verwijderen mislukt');
    }
};

// Functie om een speler bij te werken
const updateSpeler = async (licentie: string, spelerData: Partial<Speler>): Promise<Speler> => {
    const exists = await spelersDb.getSpelerByLicentie(licentie);
    if (!exists) {
        throw new Error(`De speler met licentie ${licentie} bestaat niet`);
    }
    return await spelersDb.updateSpeler(licentie, spelerData);
}


// Exporteer de functies
export default {
    getAllSpelers,
    getSpelerByNaam,
    addSpeler,
    getSpelerByLicentie,
    removeSpeler,
    updateSpeler,
};