import { Ploeg } from '../model/ploeg'; // Zorg ervoor dat je het juiste pad naar de Ploeg klasse gebruikt
import { Speler } from '../model/speler'; // Zorg ervoor dat je het juiste pad naar de Speler klasse gebruikt

// Voorbeeld van spelers
const speler1 = new Speler({naam:'Jan Jansen',spelerlicentie: '0050766', leeftijd:25, ploeg:undefined});
const speler2 = new Speler({naam:'Piet Pietersen', spelerlicentie:'0050767',leeftijd :30, ploeg:undefined});
const speler3 = new Speler({naam:'Klaas Klaassen', spelerlicentie:'0050768', leeftijd:22,ploeg:undefined});

// Voorbeeld van ploegen
const ploeg1 = new Ploeg({niveau:'1e promo', ploegnaam:'Heren f', spelers: []});
const ploeg2 = new Ploeg({niveau:'Liga A', ploegnaam:'Team B', spelers:[]});
const ploegen = [ploeg1,ploeg2];
// Voeg spelers toe aan de ploegen
ploeg1.addSpeler(speler1);
ploeg1.addSpeler(speler3);
ploeg2.addSpeler(speler2);

// Koppel de spelers aan hun ploegen
speler1.setPloeg(ploeg1);
speler2.setPloeg(ploeg2);
speler3.setPloeg(ploeg1);

const getPloegByNaam = ({ ploegnaam }: { ploegnaam: string }): Ploeg | null => {
    try {
        return [ploeg1, ploeg2].find((ploeg) => ploeg.getPloegnaam() === ploegnaam) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getSpelersInPloeg = ({ ploegnaam }: { ploegnaam: string }): Speler[] => {
    try {
        const ploeg = getPloegByNaam({ ploegnaam });
        return ploeg ? ploeg.getSpelers() : [];
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllPloegen = ():Ploeg[]=>{
    return ploegen;
}

const addPloeg = (ploeg:Ploeg) => {
    ploegen.push(ploeg);
}

export default {
    getPloegByNaam,
    getSpelersInPloeg,
    getAllPloegen,
    addPloeg
};