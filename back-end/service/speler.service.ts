import spelersDb from "../repository/speler.db"; 
import { Speler } from "../model/speler"; 
import { SpelerInput } from "../types";
import ploegDb from "../repository/ploeg.db";

// Functie om alle spelers op te halen
const getAllSpelers = async (): Promise<Speler[]> => {
    return await spelersDb.getAllSpelers();
}

// Functie om een speler op naam op te halen
const getSpelerByNaam = async (naam: string): Promise<{speler?:Speler; message?:string}> => {
   try {
     const speler = await spelersDb.getSpelerByNaam(naam);
 
     if (!speler) {
         return {message:`Speler met naam: ${naam} kan niet gevonden worden`}
     } else {
         return {speler};
     }
   } catch (error) {
    return { message: error instanceof Error ? error.message : 'An unknown error occurred' };

    
   }
}

// Functie om een speler op basis van licentie op te halen
const getSpelerByLicentie = async (licentie: string): Promise<Speler | null> => {
    return await spelersDb.getSpelerByLicentie(licentie);
}

// Functie om een speler toe te voegen
const addSpeler = async ({ naam, spelerLicentie, leeftijd, ploegNaam}: SpelerInput): Promise<{speler?:Speler;message?:string}> => {
try {
        const exists = await spelersDb.getSpelerByLicentie(spelerLicentie);
        if (exists) {
            return { message:`De speler met de licentie: ${spelerLicentie} bestaat al, ${exists.getNaam()}`};
        }
    
        const ploegExists = await ploegDb.getPloegByNaam(ploegNaam);
        if (!ploegExists) {
            return { message:`De ploeg met de naam: ${ploegNaam} bestaat niet`};
        }
    
        if (leeftijd < 0 || leeftijd > 100) {
            return { message:'De leeftijd van de speler moet tussen 0 en 100 zijn'};
        }
    
        const newSpeler = new Speler({ naam, spelerLicentie, leeftijd, ploegNaam });
        await spelersDb.addSpeler(newSpeler); 
        return {speler: newSpeler};
} catch (error) {
    return { message: error instanceof Error ? error.message : 'An unknown error occurred' };
    
}
}

const removeSpeler = async (spelerLicentie: string): Promise<string> => {
    try {
        // Zoek de coach op basis van de coachlicentie
        const speler = await spelersDb.getSpelerByLicentie(spelerLicentie);

        // Controleer of de coach bestaat
        if (speler) {
            await spelersDb.deleteSpeler(spelerLicentie); 
            return "Speler succesvol verwijderd"; 
        } else {
            throw new Error('Speler niet gevonden');
        }
        
    } catch (error) {
        throw new Error('Speler verwijderen mislukt');
    }
};

// Functie om een speler bij te werken
const updateSpeler = async (licentie: string, spelerData: Partial<Speler>): Promise<{speler?:Speler;message?:string}> => {
    try {
      const exists = await spelersDb.getSpelerByLicentie(licentie);
            if (!exists) {
              return { message:`De speler met licentie ${licentie} bestaat niet`};
          }
         const updatedPlayer= await spelersDb.updateSpeler(licentie, spelerData);
         return {speler: updatedPlayer};
    } catch (error) {
        return { message: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
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