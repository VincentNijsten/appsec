import { PrismaClient } from '@prisma/client';
import { Coach } from '../model/coach';
import { Ploeg } from '../model/ploeg';
import { Speler } from '../model/speler';

const prisma = new PrismaClient();

// Functie om een coach op naam op te halen
const getCoachByNaam = async (coachnaam: string): Promise<Coach | null> => {
    try {
        const coachPrisma = await prisma.coach.findFirst({
            where: {
                naam: coachnaam,
            },
        });
        return coachPrisma ? Coach.from(coachPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om alle coaches op te halen
const getAllCoaches = async (): Promise<Coach[]> => {
    try {
        const coachPrisma = await prisma.coach.findMany();
        return coachPrisma.map((coachPrisma) => Coach.from(coachPrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om een coach toe te voegen
// Functie om een coach aan een ploeg toe te voegen
const addCoach = async (coachLicentie: string, ploegNaam: string) => {
    try {
        // Zoek de ploeg op basis van de ploegnaam
        const ploeg = await prisma.ploeg.findUnique({
            where: {
                ploegnaam: ploegNaam,
            },
        });

        // Controleer of de ploeg bestaat
        if (!ploeg) {
            throw new Error(`Ploeg met naam ${ploegNaam} niet gevonden`);
        }

        // Update de ploeg met de coachlicentie
        const updatedPloeg = await prisma.ploeg.update({
            where: {
                ploegnaam: ploegNaam,
            },
            data: {
                coachLicentie: coachLicentie,
            },
        });

        return Ploeg.from(updatedPloeg);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. Zie serverlog voor details.');
    }
};

// Functie om een ploeg toe te voegen
const addPloeg = async (ploeg: { ploegnaam: string; niveau: string; coachLicentie?: string | null }): Promise<Ploeg> => {
    try {
        const newPloegPrisma = await prisma.ploeg.create({
            data: {
                ploegnaam: ploeg.ploegnaam,
                niveau: ploeg.niveau,
                coachLicentie: ploeg.coachLicentie || null,
            },
        });
        return Ploeg.from(newPloegPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om een speler toe te voegen
const addSpeler = async (speler: { naam: string; spelerlicentie: string; leeftijd: number }): Promise<Speler> => {
    try {
        const newSpelerPrisma = await prisma.speler.create({
            data: {
                naam: speler.naam,
                spelerLicentie: speler.spelerlicentie,
                leeftijd: speler.leeftijd,
            },
        });
        return Speler.from(newSpelerPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om een speler aan een ploeg toe te voegen
const addSpelerToPloeg = async (spelerLicentie: string, ploegnaam: string) => {
    try {
        await prisma.speler.update({
            where: { spelerLicentie: spelerLicentie },
            data: {
                ploegNaam: ploegnaam,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om een ploeg op naam op te halen
const getPloegByNaam = async (ploegnaam: string): Promise<Ploeg | null> => {
    try {
        const ploegPrisma = await prisma.ploeg.findUnique({
            where: {
                ploegnaam: ploegnaam,
            },
        });
        return ploegPrisma ? Ploeg.from(ploegPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om alle ploegen op te halen
const getAllPloegen = async (): Promise<Ploeg[]> => {
    try {
        const ploegPrisma = await prisma.ploeg.findMany();
        return ploegPrisma.map((ploegPrisma) => Ploeg.from(ploegPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getCoachByNaam,
    getAllCoaches,
    addCoach,
    addPloeg,
    addSpeler,
    addSpelerToPloeg,
    getPloegByNaam,
    getAllPloegen,
};