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
const verwijderPloeg = async (ploegnaam: string): Promise<void> => {
    try {
       

        // Verwijder de ploeg
        await prisma.ploeg.delete({
            where: { ploegnaam: ploegnaam },
        });
        console.log(`Ploeg ${ploegnaam} verwijderd.`);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. Zie serverlog voor details.');
    }
};

// Functie om een ploeg bij te werken
const updatePloeg = async (ploegnaam: string, ploegData: Partial<Ploeg>): Promise<Ploeg> => {
    try {
        const updatedPloegPrisma = await prisma.ploeg.update({
            where: { ploegnaam: ploegnaam },
            data: {
                niveau: ploegData.niveau,
                coachLicentie: ploegData.coachLicentie || null,
            },
        });
        return Ploeg.from(updatedPloegPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getCoachByNaam,
    getAllCoaches,
    addPloeg,
    updatePloeg,
    getPloegByNaam,
    getAllPloegen,
    verwijderPloeg,
};