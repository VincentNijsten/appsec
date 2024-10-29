import ploegDb from "../repository/ploeg.db"; 
import { Ploeg } from "../model/ploeg"; 
import { Speler } from "../model/speler";

// Functie om alle ploegen op te halen
const getAllPloegen = (): Ploeg[] => {
    return ploegDb.getAllPloegen();
}

// Functie om een ploeg op naam op te halen
const getPloegByNaam = (ploegnaam: string): Ploeg | null => {
    const ploeg = ploegDb.getPloegByNaam({ ploegnaam });

    if (ploeg == null) {
        throw new Error('Deze ploeg kan niet gevonden worden');
    } else {
        return ploeg;
    }
}

const getSpelersInPloeg = (ploegnaam: string):Speler[]=>{
    return ploegDb.getSpelersInPloeg({ploegnaam});
}

// Functie om een ploeg toe te voegen
const addPloeg = (ploeg: Ploeg): string => {
    ploegDb.addPloeg(ploeg);
    return "Ploeg succesvol toegevoegd";
}



// Exporteer de functies
export default {
    getAllPloegen,
    getPloegByNaam,
    addPloeg,
    getSpelersInPloeg
}