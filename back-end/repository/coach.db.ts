import { Coach } from '../model/coach'; 
import { Ploeg } from '../model/ploeg';
import ploegDb from './ploeg.db';

const coaches: Coach[] = [];


// Voorbeeld van coaches
const coach1 = new Coach({naam:'John Doe',coachlicentie: '0018728'});
const coach2 = new Coach({naam:'Jane Smith', coachlicentie:'0028925'});

coaches.push(coach1);
coaches.push(coach2);


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

const addCoach = (coach :{
   
    naam : string;
    coachlicentie : string
    

})=>{
    const newCoach = new Coach({
       
        naam : coach.naam,
        coachlicentie : coach.coachlicentie
    })

     coaches.push(newCoach);
}

// Functie om een coach op licentie op te halen
const getCoachByCoachLicentie = (coachlicentie: string): Coach | null => {
    return coaches.find(coach => coach.getCoachlicentie() === coachlicentie) || null;
};

// Functie om een coach te verwijderen op basis van licentie
const removeCoach = (coachIndex:number) => {
     coaches.splice(coachIndex, 1);
    };



export default {
    getCoachByNaam,
    getAllCoaches,
    addCoach,
    getCoachByCoachLicentie,
    removeCoach
};