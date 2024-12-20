import ploegDb from "../repository/ploeg.db"; 
import { Ploeg } from "../model/ploeg"; 
import { Speler } from "../model/speler";
import spelerDb from "../repository/speler.db";
import spelerService from "./speler.service";
import coachDb from "../repository/coach.db";
import { PloegInput } from "../types";
import trainingSessionDb from "../repository/trainingSession.db";
import trainingSessionService from "./trainingSession.service";
import { el } from "date-fns/locale";

// Functie om alle ploegen op te halen
const getAllPloegen = async (): Promise<Ploeg[]> => {
    return await ploegDb.getAllPloegen();
}

// Functie om een ploeg op naam op te halen
const getPloegByNaam = async (ploegnaam: string): Promise<{ploeg?:Ploeg; message?:string}> => {
 try {
       const ploeg = await ploegDb.getPloegByNaam(ploegnaam);
   
       if (ploeg) {
        return {ploeg: ploeg};
       } else {
        return {message:`Ploeg met naam: ${ploegnaam} kan niet gevonden worden`}
    }
 } catch (error) {
    return { message: error instanceof Error ? error.message : 'An unknown error occurred' };

    
 }
}

const getPloegByCoachLicentie = async (coachLicentie: string): Promise<{ploeg?:Ploeg;message?:string}> => {
  try {
      const coach = await coachDb.getCoachByCoachLicentie(coachLicentie);
      if(!coach) {
          return {message: `Coach met licentie: ${coachLicentie} niet gevonden`};
      }else {
          const ploeg = await ploegDb.getPloegByCoachLicentie(coachLicentie);
          if (!ploeg) {
              return {message: `Ploeg met coachlicentie: ${coachLicentie} niet gevonden`};
          } else {
              return {ploeg};
          }
      }
  } catch (error) {
        return { message: error instanceof Error ? error.message : 'An unknown error occurred' };
    
  }
}

// Functie om een ploeg toe te voegen
const addPloeg = async ({ ploegnaam, niveau, coachLicentie }: PloegInput): Promise<{ploeg?:Ploeg;message?:string}> => {
   try {
     const exists = await ploegDb.getPloegByNaam(ploegnaam);
     if (exists) {
         return {message:`De ploeg met naam ${ploegnaam} bestaat al`};
     }
     if (coachLicentie === null) {
         return { message: 'Coach licentie is null' };
     }
     const coach = await ploegDb.getPloegByCoachLicentie(coachLicentie);
        if (coach) {
            return {message:`Coach met licentie ${coachLicentie} coacht al een andere ploeg, een coach kan maar 1 ploeg coachen`};
        }
     
     const newPloeg = new Ploeg({
         ploegnaam, 
         niveau, 
         coachLicentie
     });
 
      await ploegDb.addPloeg(newPloeg);
     return {ploeg: newPloeg};
   } catch (error) {
    return { message: error instanceof Error ? error.message : 'An unknown error occurred' };
    
   }
}




// Functie om een ploeg te verwijderen
const verwijderPloeg = async (ploegnaam: string): Promise<{ploeg?:Ploeg; message?:string} > => {
try {
        const exists = await ploegDb.getPloegByNaam(ploegnaam);
        const trainingExists = await trainingSessionService.getTrainingSessionByPloegNaam(ploegnaam);
        if (trainingExists) {
            trainingSessionService.removePloegFromTrainingSession(ploegnaam);
    
        }
        if (!exists) {
            return {message :`De ploeg met naam ${ploegnaam} bestaat niet`};
        }
        const deletedPloeg = await ploegDb.verwijderPloeg(ploegnaam);
        if (deletedPloeg === null) {
            return { message: 'De ploeg kon niet worden verwijderd' };
        }
        return { ploeg: deletedPloeg };
} catch (error) {
    return { message: error instanceof Error ? error.message : 'An unknown error occurred' };

    
}
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
    getPloegByCoachLicentie
};