import zaalDb from "../repository/zaal.db"; 
import { Zaal } from "../model/zaal"; 
import { ZaalInput } from "../types";

// Functie om alle zalen op te halen
const getAllZalen = async (): Promise<Zaal[]> => {
    const zalen = await zaalDb.getAllZalen();
    if (zalen.length === 0) {
        throw new Error("Geen zalen gevonden.");
    }
    return zalen;
}

// Functie om een zaal op naam op te halen
const getZaalByNaam = async (naam: string): Promise<Zaal | null> => {
    const zaal = await zaalDb.getZaalByNaam(naam);

    if (zaal == null) {
        throw new Error('Deze zaal kan niet gevonden worden');
    } else {
        return zaal;
    }
}

// Functie om een zaal toe te voegen
const addZaal = async ({ naam, address, beschikbaarheid }: ZaalInput): Promise<string> => {
    const exist = await zaalDb.getZaalByNaam(naam);
    if (exist) {
        throw new Error(`De zaal met naam ${naam} bestaat al`);
    }

    const newZaal = new Zaal({ naam, address, beschikbaarheid });
    await zaalDb.addZaal(newZaal);
    return `Zaal: ${naam} succesvol toegevoegd op adres: ${address}`;
}


// Functie om een zaal bij te werken
const updateZaal = async (naam: string, zaalData: Partial<Zaal>): Promise<Zaal> => {
    const exist = await zaalDb.getZaalByNaam(naam);
    if (!exist) {
        throw new Error(`De zaal met naam ${naam} bestaat niet`);
    }

    return await zaalDb.updateZaal(naam, zaalData);
}

// Functie om een zaal te verwijderen
const deleteZaal = async (naam: string): Promise<void> => {
    const exist = await zaalDb.getZaalByNaam(naam);
    if (!exist) {
        throw new Error(`De zaal met naam ${naam} bestaat niet`);
    }

    await zaalDb.deleteZaal(naam);
}


export default {
    getAllZalen,
    getZaalByNaam,
    addZaal,
    updateZaal,
    deleteZaal
}