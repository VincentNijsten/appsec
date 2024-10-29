import coachDb from "../repository/coach.db";
import { Coach } from "../model/coach";

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

const addCoach=( coach :Coach): string =>{
    coachDb.addCoach(coach);
    return "coach successfully added"


}

export default {
    getAllCoaches,
    getCoachByNaam,
    addCoach
}