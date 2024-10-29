import { Coach } from '../model/coach'; 
import { Ploeg } from '../model/ploeg'; 
import ploegDb from './ploeg.db';

// Voorbeeld van coaches
const coach1 = new Coach({naam:'John Doe',coachlicentie: '0018728',ploeg: undefined});
const coach2 = new Coach({naam:'Jane Smith', coachlicentie:'0028925',ploeg: undefined});

const coaches = [coach1,coach2];
// ploegen
const ploegen = ploegDb.getAllPloegen();

// Koppel coaches aan ploegen
coach1.setPloeg(ploegen[0]); 
coach2.setPloeg(ploegen[1]);


// werkt voor bestaande coaches maar als ik er een toevoeg werkt het nog niet en ik heb gee nidee wrm 
const getCoachByNaam = ({ coachnaam }: { coachnaam: string }): Coach | null => {
    try {
        return coaches.find((coach) => coach.getNaam().toLowerCase() === coachnaam.toLowerCase()) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllCoaches = (): Coach[] =>{
    return coaches;
}

const addCoach = (coach: Coach)=>{
     coaches.push(coach);
}



export default {
    getCoachByNaam,
    getAllCoaches,
    addCoach
};