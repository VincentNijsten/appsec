import coachDb from "../repository/coach.db";
import { Coach } from "../model/coach";
import ploegDb from "../repository/ploeg.db";
import { Ploeg } from "../model/ploeg";
import { off } from "process";
import { CoachInput } from "../types";

const getAllCoaches = ():Coach[] => {
    return coachDb.getAllCoaches();
}

const getCoachByNaam =( coachnaam :string): Coach | null=> {
     const coach =  coachDb.getCoachByNaam({coachnaam});

     if (!coach){
        throw new Error('deze coach kan niet gevonden worden')
     }else{
        return coach
     }

}

const removeCoach = (coachLicentie: string) => {
    try {
        // Zoek de coach op basis van de coachlicentie
        const coachIndex = coachDb.getAllCoaches().findIndex(existingCoach => existingCoach.getCoachlicentie() === coachLicentie);

        // Controleer of de coach bestaat
        if (coachIndex !== -1) {
            coachDb.removeCoach(coachIndex); 
            return "Coach succesvol verwijderd"; 
        } else {
            throw new Error('Coach niet gevonden');
        }
        
    } catch (error) {
        throw new Error('coach verwijderen mislukt');
    }
}

const addCoach = ({naam, coachlicentie}: CoachInput)=>{
    const exists = coachDb.getCoachByCoachLicentie(coachlicentie);
    
    if(exists){
        throw new Error(`de coach met licentie : ${coachlicentie}, bestaal al : ${naam}`);
     }
    

    const newCoach = new Coach({
        naam, 
        coachlicentie
    });
    
    coachDb.addCoach(newCoach)
    return 'succes'
}



export default {
    getAllCoaches,
    getCoachByNaam,
    removeCoach,
    addCoach
}