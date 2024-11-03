import spelersDb from "../repository/speler.db"; // Zorg ervoor dat je het juiste pad naar je spelers.db.ts bestand gebruikt
import { Speler } from "../model/speler"; // Zorg ervoor dat je het juiste pad naar de Speler klasse gebruikt
import { SpelerInput } from "../types";

// Functie om alle spelers op te halen
const getAllSpelers = (): Speler[] => {
    return spelersDb.getAllSpelers();
}

// Functie om een speler op naam op te halen
const getSpelerByNaam = (naam: string): Speler | undefined => {
    const speler = spelersDb.getSpelerByNaam({ naam });

    if (speler == undefined) {
        throw new Error('Deze speler kan niet gevonden worden');
    } else {
        return speler;
    }
}

const getSpelerByLicentie = (licentie: string): Speler | null => {
    return spelersDb.getSpelerByLicentie(licentie);
}

// Functie om een speler toe te voegen
const addSpeler = ({naam,spelerlicentie,leeftijd}:SpelerInput) => {
    const exists = spelersDb.getSpelerByLicentie(spelerlicentie);
    if(exists) {
        throw new Error(`de speler met de licentie: ${spelerlicentie} bestaal al, ${exists.getNaam()}`);
    }

    const newSpeler = new Speler({naam, spelerlicentie, leeftijd});
    spelersDb.addSpeler(newSpeler);
    return "Speler succesvol toegevoegd";
}

// Exporteer de functies
export default {
    getAllSpelers,
    getSpelerByNaam,
    addSpeler,
    getSpelerByLicentie
}