import { Ploeg } from '../model/ploeg'; 
import { Speler } from '../model/speler';


const ploegen: Ploeg[] = [];

// Voorbeeld van ploegen
const ploeg1 = new Ploeg({ niveau: '1e promo', ploegnaam: 'Heren f', spelers: [] });
const ploeg2 = new Ploeg({ niveau: 'Liga A', ploegnaam: 'Heren A', spelers: [] });


// Voeg spelers toe aan de ploegen

const spelers : Speler[] = [];


const speler1 =  new Speler({ naam: 'Jan Jansen', spelerlicentie: '0050766', leeftijd: 25});
const speler2 =  new Speler({ naam: 'Piet Pietersen', spelerlicentie: '0050767', leeftijd: 30 });
const speler3 =  new Speler({ naam: 'Klaas Klaassen', spelerlicentie: '0050768', leeftijd: 22});

//spellers toevoegen aan database
spelers.push(speler1);
spelers.push(speler2);
spelers.push(speler3);

//spelers toevoegen aan ploeg
ploeg1.addSpeler(speler1);
ploeg1.addSpeler(speler2);
ploeg2.addSpeler(speler3);




//ploegen toevoegen aan database
ploegen.push(ploeg1);
ploegen.push(ploeg2);

const getAllSpelers = () =>{
    return spelers;
}

const getPloegByNaam = ({ ploegnaam }: { ploegnaam: string }): Ploeg | undefined => {
    try {
        return ploegen.find((ploeg) => ploeg.getPloegnaam() === ploegnaam) || undefined;
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

const getAllPloegen = (): Ploeg[] => {
    return ploegen;
};

const addPloeg = (ploeg: Ploeg) => {
    ploegen.push(ploeg);
};

export default {
    getPloegByNaam,
    getSpelersInPloeg,
    getAllPloegen,
    addPloeg,
    getAllSpelers
};