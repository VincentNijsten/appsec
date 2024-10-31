import coachDb from "../repository/coach.db";
import { Coach } from "../model/coach";
import ploegDb from "../repository/ploeg.db";
import { Ploeg } from "../model/ploeg";

const getAllCoaches = ():Coach[] => {
    return coachDb.getAllCoaches();
}

const getCoachByNaam =( coachnaam :string): Coach | null=> {
     const coach =  coachDb.getCoachByNaam({coachnaam});

     if ( coach == null ){
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

const addCoach = (coach:Coach)=>{
    
    coachDb.addCoach(coach)
    return 'succes'
}



export default {
    getAllCoaches,
    getCoachByNaam,
    removeCoach,
    addCoach
}