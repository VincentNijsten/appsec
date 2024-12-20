import coachDb from "../repository/coach.db";
import { Coach } from "../model/coach";
import { CoachInput } from "../types";

const getAllCoaches = async (): Promise<Coach[]> => {
    return await coachDb.getAllCoaches();
};

const getCoachByNaam = async (coachnaam: string): Promise<Coach | null> => {
    const coach = await coachDb.getCoachByNaam({ coachnaam });

    if (!coach) {
        throw new Error('Deze coach kan niet gevonden worden');
    } else {
        return coach;
    }
};

const removeCoach = async (coachLicentie: string): Promise<string> => {
    try {
        // Zoek de coach op basis van de coachlicentie
        const coach = await coachDb.getCoachByCoachLicentie(coachLicentie);

        // Controleer of de coach bestaat
        if (coach) {
            await coachDb.removeCoach(coachLicentie); 
            return "Coach succesvol verwijderd"; 
        } else {
            throw new Error('Coach niet gevonden');
        }
        
    } catch (error) {
        throw new Error('Coach verwijderen mislukt');
    }
};

const addCoach = async ({ naam, coachLicentie }: CoachInput): Promise<{coach?:Coach;message?:string}> => {
    try {
        const exists = await coachDb.getCoachByCoachLicentie(coachLicentie);
        
        if (exists) {
            return {message:`De coach met licentie: ${coachLicentie}, bestaat al: ${naam}`};
        }
    
        const newCoach = new Coach({
            naam, 
            coachLicentie: coachLicentie
        });
        
        await coachDb.addCoach(newCoach);
        return {coach: newCoach};
    } catch (error) {
        return { message: error instanceof Error ? error.message : 'An unknown error occurred' };
        
    }
};

// Functie om een coach bij te werken
const updateCoach = async (coachLicentie: string, coachData: Partial<Coach>): Promise<string> => {
    try {
        // Zoek de coach op basis van de coachlicentie
        const coach = await coachDb.getCoachByCoachLicentie(coachLicentie);

        // Controleer of de coach bestaat
        if (coach) {
            await coachDb.updateCoach(coachLicentie, coachData); 
            return "Coach succesvol bijgewerkt"; 
        } else {
            throw new Error('Coach niet gevonden');
        }
        
    } catch (error) {
        throw new Error('Coach bijwerken mislukt');
    }
}

const getCoachByCoachLicentie = async (coachLicentie: string): Promise<{coach?:Coach;message?:string}> => {
    try {
        const coach = await coachDb.getCoachByCoachLicentie(coachLicentie);
        if(!coach) {
            return {message: `Coach met licentie: ${coachLicentie} niet gevonden`};
        }else {
            return {coach};
        }
    } catch (error) {
        return { message: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
}


export default {
    getAllCoaches,
    getCoachByNaam,
    removeCoach,
    addCoach,
    updateCoach,
    getCoachByCoachLicentie
};