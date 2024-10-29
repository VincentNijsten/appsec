import { Coach } from '../model/coach'; // Zorg ervoor dat je het juiste pad naar de Coach klasse gebruikt
import { Ploeg } from '../model/ploeg'; // Zorg ervoor dat je het juiste pad naar de Ploeg klasse gebruikt

// Voorbeeld van coaches
const coach1 = new Coach({naam:'John Doe',coachlicentie: '0018728',ploeg: undefined});
const coach2 = new Coach({naam:'Jane Smith', coachlicentie:'0028925',ploeg: undefined});

const coaches = [coach1,coach2];
// Voorbeeld van ploegen
const ploeg1 = new Ploeg({niveau:'1e promo', ploegnaam:'Heren f', spelers: []});
const ploeg2 = new Ploeg({niveau:'Liga A', ploegnaam:'Team B', spelers:[]});

// Koppel coaches aan ploegen
coach1.setPloeg(ploeg1);
coach2.setPloeg(ploeg2);



const getCoachByNaam = ({ coachnaam }: { coachnaam: string }): Coach | null => {
    try {
        return [coach1, coach2].find((coach) => coach.getNaam() === coachnaam) || null;
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