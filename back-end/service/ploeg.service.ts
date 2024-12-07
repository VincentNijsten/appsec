import ploegDb from "../repository/ploeg.db"; 
import { Ploeg } from "../model/ploeg"; 
import { Speler } from "../model/speler";
import spelerDb from "../repository/speler.db";
import spelerService from "./speler.service";
import coachDb from "../repository/coach.db";
import { PloegInput } from "../types";

// Functie om alle ploegen op te halen
const getAllPloegen = async (): Promise<Ploeg[]> => {
    return await ploegDb.getAllPloegen();
}

// Functie om een ploeg op naam op te halen
const getPloegByNaam = async (ploegnaam: string): Promise<Ploeg | null> => {
    const ploeg = await ploegDb.getPloegByNaam(ploegnaam);

    if (ploeg == null) {
        throw new Error('Deze ploeg kan niet gevonden worden');
    } else {
        return ploeg;
    }
}

// Functie om een ploeg toe te voegen
const addPloeg = async ({ ploegnaam, niveau, coachLicentie }: PloegInput): Promise<string> => {
    const exists = await ploegDb.getPloegByNaam(ploegnaam);
    if (exists) {
        throw new Error(`De ploeg met naam ${ploegnaam} bestaat al`);
    }
    const newPloeg = new Ploeg({
        ploegnaam, 
        niveau, 
        coachLicentie
    });

    await ploegDb.addPloeg(newPloeg);
    return `${ploegnaam} is succesvol toegevoegd`;
}

// Functie om een speler aan een ploeg toe te voegen
const addSpelerToPloeg = async (ploegnaam: string, spelerslicentie: string): Promise<string> => {
    const ploeg = await ploegDb.getPloegByNaam(ploegnaam);
    const speler = await spelerService.getSpelerByLicentie(spelerslicentie);

    if (!ploeg) {
        throw new Error('Ploeg niet gevonden');
    }
    if (!speler) {
        throw new Error('Speler niet gevonden');
    }

    // Controleer of de speler al in een andere ploeg speelt
    if (speler.ploegNaam && speler.ploegNaam !== ploegnaam) {
        throw new Error(`De speler ${speler.naam} speelt al in de ploeg ${speler.ploegNaam}`);
    }

    // Update de ploegnaam van de speler
    speler.ploegNaam = ploegnaam;

    // Update de speler in de database
    await spelerDb.updateSpeler(speler.spelerLicentie, speler); 

    return `Speler ${speler.naam} is succesvol toegevoegd aan ploeg ${ploegnaam}`;
};

// Functie om een coach aan een ploeg toe te voegen
const addCoach = async (coachLicentie: string, ploegnaam: string): Promise<string> => {
    const ploeg = await ploegDb.getPloegByNaam(ploegnaam);
    const coach = await coachDb.getCoachByCoachLicentie(coachLicentie);
    
    if (!ploeg) {
        throw new Error('Ploeg niet gevonden');
    }
    if (!coach) {
        throw new Error('Coach niet gevonden');
    }
    
    await ploegDb.addCoach(coachLicentie, ploegnaam);
    return `Coach: ${coach.naam} is succesvol toegevoegd aan ploeg: ${ploegnaam}`;
};
// Functie om een ploeg te verwijderen
const verwijderPloeg = async (ploegnaam: string): Promise<void> => {
    const exists = await ploegDb.getPloegByNaam(ploegnaam);
    if (!exists) {
        throw new Error(`De ploeg met naam ${ploegnaam} bestaat niet`);
    }
    await ploegDb.verwijderPloeg(ploegnaam);
}


// Exporteer de functies
export default {
    getAllPloegen,
    getPloegByNaam,
    addPloeg,
    addSpelerToPloeg,
    addCoach,
    verwijderPloeg,
};