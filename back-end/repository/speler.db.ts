import { Speler } from '../model/speler'; 
import ploegDb from './ploeg.db'; 

// Voorbeeld van ploegen ophalen
const ploeg1 = ploegDb.getPloegByNaam({ ploegnaam: 'Heren f' });
const ploeg2 = ploegDb.getPloegByNaam({ ploegnaam: 'Heren A' });

// Voorbeeld van spelers
const spelers = ploegDb.getAllSpelers();

const getSpelerByLicentie = (licentie: string ): Speler | null => {
    try {
        return spelers.find((speler) => speler.getSpelerlicentie() === licentie) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllSpelers = (): Speler[] => {
    return spelers;
};

const getSpelerByNaam = ({ naam }: { naam: string }): Speler | undefined => {
    return spelers.find((speler) => speler.getNaam() === naam);
};

const addSpeler = (speler: Speler) => {
    spelers.push(speler);
};

export default {
    getSpelerByLicentie,
    getAllSpelers,
    getSpelerByNaam,
    addSpeler
};
