import { Coach } from '../model/coach'; 
import database from './database';
import { Coach as CoachPrisma } from '@prisma/client';

const getCoachByNaam = async ({ coachnaam }: { coachnaam: string }): Promise<Coach | null> => {
    try {
        const coachPrisma = await database.coach.findFirst({
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

const getAllCoaches = async (): Promise<Coach[]> => {
    try {
        const coachPrisma = await database.coach.findMany();
        return coachPrisma.map((coachPrisma) => Coach.from(coachPrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addCoach = async (coach: { naam: string; coachLicentie: string }): Promise<Coach> => {
    try {
        const newCoachPrisma = await database.coach.create({
            data: {
                naam: coach.naam,
                coachLicentie: coach.coachLicentie,
            },
        });
        return Coach.from(newCoachPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om een coach op licentie op te halen
const getCoachByCoachLicentie = async (coachlicentie: string): Promise<Coach | null> => {
    try {
        const coachPrisma = await database.coach.findUnique({
            where: {
                coachLicentie: coachlicentie,
            },
        });
        return coachPrisma ? Coach.from(coachPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om een coach te verwijderen op basis van licentie
const removeCoach = async (coachlicentie: string): Promise<void> => {
    try {
        await database.coach.delete({
            where: {
                coachLicentie: coachlicentie,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om een coach bij te werken
const updateCoach = async (coachLicentie: string, coachData: Partial<Coach>): Promise<Coach> => {
    try {
        const updatedCoachPrisma = await database.coach.update({
            where: {
                coachLicentie: coachLicentie,
            },
            data: {
                naam: coachData.naam,
            },
        });
        return Coach.from(updatedCoachPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};



export default {
    getCoachByNaam,
    getAllCoaches,
    addCoach,
    getCoachByCoachLicentie,
    removeCoach,
    updateCoach,
};