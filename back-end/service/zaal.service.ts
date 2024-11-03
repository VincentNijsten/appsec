import zaalDb from "../repository/zaal.db"; // Zorg ervoor dat je het juiste pad naar je zaal.db.ts bestand gebruikt
import { Zaal } from "../model/zaal"; // Zorg ervoor dat je het juiste pad naar de Zaal klasse gebruikt
import { ZaalInput } from "../types";

// Functie om alle zalen op te halen
const getAllZalen = (): Zaal[] => {
    return zaalDb.getAllZalen();
}

// Functie om een zaal op naam op te halen
const getZaalByNaam = (naam: string): Zaal | null => {
    const zaal = zaalDb.getZaalByNaam({ naam });

    if (zaal == null) {
        throw new Error('Deze zaal kan niet gevonden worden');
    } else {
        return zaal;
    }
}

// Functie om een zaal toe te voegen
const addZaal = ({naam,address,beschikbaarheid}:ZaalInput) => {
    const exist = zaalDb.getZaalByNaam({naam});
    if(exist){
        throw new Error(`de zaal met naam ${naam} bestaat al`);
    }

    const newZaal = new Zaal({naam, address, beschikbaarheid});
    zaalDb.addZaal(newZaal);
    return `Zaal: ${naam} succesvol toegevoegd op addres: ${address}`;
}

// Exporteer de functies
export default {
    getAllZalen,
    getZaalByNaam,
    addZaal
}