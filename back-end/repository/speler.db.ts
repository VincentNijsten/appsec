import { Speler } from '../model/speler'; 
import { Ploeg } from '../model/ploeg'; 

// Voorbeeld van ploegen
const ploeg1 = new Ploeg({niveau:'1e promo', ploegnaam:'Heren f', spelers: []});
const ploeg2 = new Ploeg({niveau:'Liga A', ploegnaam:'Team B', spelers:[]});

// Voorbeeld van spelers
const spelers = [
    new Speler({naam:'Jan Jansen',spelerlicentie: '0050766', leeftijd:25, ploeg:undefined}),
 new Speler({naam:'Piet Pietersen', spelerlicentie:'0050767',leeftijd :30, ploeg:undefined}),
 new Speler({naam:'Klaas Klaassen', spelerlicentie:'0050768', leeftijd:22,ploeg:undefined})

];

const getSpelerByLicentie = ({ licentie }: { licentie: string }): Speler | null => {
    try {
        return spelers.find((speler) => speler.getSpelerlicentie()=== licentie) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllSpelers = (): Speler[] =>{
    return spelers;
}

const getSpelerByNaam = ({ naam }: { naam: string }): Speler | undefined=>{
    return spelers.find((speler) => speler.getNaam() === naam);
}

const addSpeler = (speler: Speler)=>{
    spelers.push(speler);
}

export default {
    getSpelerByLicentie,
    getAllSpelers,
    getSpelerByNaam,
    addSpeler
};