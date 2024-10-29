import zaalDb from "../repository/zaal.db"; // Zorg ervoor dat je het juiste pad naar je zaal.db.ts bestand gebruikt
import { Zaal } from "../model/zaal"; // Zorg ervoor dat je het juiste pad naar de Zaal klasse gebruikt

// Functie om alle zalen op te halen
const getAllZalen = (): Zaal[] => {
    return zaalDb.getAllZalen();
}

// Functie om een zaal op naam op te halen
const getZaalByNaam = (zaalnaam: string): Zaal | null => {
    const zaal = zaalDb.getZaalByNaam({ zaalnaam });

    if (zaal == null) {
        throw new Error('Deze zaal kan niet gevonden worden');
    } else {
        return zaal;
    }
}

// Functie om een zaal toe te voegen
const addZaal = (zaal: Zaal): string => {
    zaalDb.addZaal(zaal);
    return `Zaal ${zaal.getNaam()} succesvol toegevoegd.`;
}

// Exporteer de functies
export default {
    getAllZalen,
    getZaalByNaam,
    addZaal
}