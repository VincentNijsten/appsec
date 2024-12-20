import ploegDb from "../repository/ploeg.db"; 
import { Ploeg } from "../model/ploeg"; 
import { Speler } from "../model/speler";
import spelerDb from "../repository/speler.db";
import spelerService from "./speler.service";
import coachDb from "../repository/coach.db";
import { PloegInput } from "../types";
import trainingSessionDb from "../repository/trainingSession.db";
import trainingSessionService from "./trainingSession.service";

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




// Functie om een ploeg te verwijderen
const verwijderPloeg = async (ploegnaam: string): Promise<void> => {
    const exists = await ploegDb.getPloegByNaam(ploegnaam);
    const trainingExists = await trainingSessionService.getTrainingSessionByPloegNaam(ploegnaam);
    if (trainingExists) {
        trainingSessionService.removePloegFromTrainingSession(ploegnaam);

    }
    if (!exists) {
        throw new Error(`De ploeg met naam ${ploegnaam} bestaat niet`);
    }
    await ploegDb.verwijderPloeg(ploegnaam);
}


// Functie om een ploeg bij te werken
const updatePloeg = async (ploegnaam: string, ploegData: Partial<Ploeg>): Promise<Ploeg> => {
    const exists = await ploegDb.getPloegByNaam(ploegnaam);
    if (!exists) {
        throw new Error(`De ploeg met naam ${ploegnaam} bestaat niet`);
    }
    return await ploegDb.updatePloeg(ploegnaam, ploegData);
}


// Exporteer de functies
export default {
    getAllPloegen,
    getPloegByNaam,
    addPloeg,
    verwijderPloeg,
    updatePloeg,
};