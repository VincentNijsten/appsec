import { PrismaClient } from '@prisma/client';
import { Speler } from '../model/speler';

const prisma = new PrismaClient();

// Functie om een speler op basis van licentie op te halen
const getSpelerByLicentie = async (licentie: string): Promise<Speler | null> => {
    try {
        const spelerPrisma = await prisma.speler.findUnique({
            where: {
                spelerLicentie: licentie,
            },
        });
        return spelerPrisma ? Speler.from(spelerPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. Zie serverlog voor details.');
    }
};

// Functie om alle spelers op te halen
const getAllSpelers = async (): Promise<Speler[]> => {
    try {
        const spelersPrisma = await prisma.speler.findMany();
        return spelersPrisma.map((spelerPrisma) => Speler.from(spelerPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. Zie serverlog voor details.');
    }
};

// Functie om een speler op basis van naam op te halen
const getSpelerByNaam = async (naam: string): Promise<Speler | undefined> => {
    try {
        const spelerPrisma = await prisma.speler.findFirst({
            where: {
                naam: naam,
            },
        });
        return spelerPrisma ? Speler.from(spelerPrisma) : undefined;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. Zie serverlog voor details.');
    }
};

// Functie om een speler toe te voegen
const addSpeler = async (speler: Speler): Promise<Speler> => {
    try {
        const newSpelerPrisma = await prisma.speler.create({
            data: {
                naam: speler.naam,
                spelerLicentie: speler.spelerLicentie,
                leeftijd: speler.leeftijd,
                ploegNaam: speler.ploegNaam, 
            },
        });
        return Speler.from(newSpelerPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. Zie serverlog voor details.');
    }
};

// Functie om een speler bij te werken
const updateSpeler = async (licentie: string, spelerData: Partial<Speler>): Promise<Speler> => {
    try {
        const updatedSpelerPrisma = await prisma.speler.update({
            where: {
                spelerLicentie: licentie,
            },
            data: {
                naam: spelerData.naam,
                leeftijd: spelerData.leeftijd,
                ploegNaam: spelerData.ploegNaam,
            },
        });
        return Speler.from(updatedSpelerPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. Zie serverlog voor details.');
    }
};

// Functie om een speler te verwijderen
const deleteSpeler = async (licentie: string): Promise<void> => {
    try {
        await prisma.speler.delete({
            where: {
                spelerLicentie: licentie,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. Zie serverlog voor details.');
    }
};


export default {
    getSpelerByLicentie,
    getAllSpelers,
    getSpelerByNaam,
    addSpeler,
    updateSpeler, 
    deleteSpeler,
};