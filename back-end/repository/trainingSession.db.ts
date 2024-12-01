import { PrismaClient } from '@prisma/client';
import { TrainingSession } from '../model/trainingSession';

const prisma = new PrismaClient();

// Functie om een trainingssessie op te halen op basis van de ploegnaam
const getTrainingSessionByPloegNaam = async (ploegnaam: string): Promise<TrainingSession | null> => {
    try {
        const session = await prisma.trainingSession.findFirst({
            where: {
                ploegNaam: ploegnaam
            }
        });
        return session ? TrainingSession.from(session) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om alle trainingssessies op te halen
const getAllTrainingSessions = async (): Promise<TrainingSession[]> => {
    const sessions = await prisma.trainingSession.findMany();
    return sessions.map(session => TrainingSession.from(session));
};

// Functie om een trainingssessie toe te voegen
const addTrainingSession = async (trainingSession: {
    ploegNaam: string;
    zaalNaam: string;
    datum: Date;
    startTijd: string;
    eindTijd: string;
}) => {
    const newSession = await prisma.trainingSession.create({
        data: {
            ploegNaam: trainingSession.ploegNaam,
            zaalNaam: trainingSession.zaalNaam,
            datum: trainingSession.datum,
            startTijd: trainingSession.startTijd,
            eindTijd: trainingSession.eindTijd,
        }
    });
    return TrainingSession.from(newSession);
};

// Functie om een trainingssessie te verwijderen op basis van ID
const removeTrainingSession = async (id: string): Promise<boolean> => {
    try {
        const session = await prisma.trainingSession.delete({
            where: { id }
        });
        return !!session;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Functie om trainingssessies op te halen op basis van zaal
const getTrainingSessionsByZaal = async (zaalNaam: string): Promise<TrainingSession[]> => {
    const sessions = await prisma.trainingSession.findMany({
        where: {
            zaalNaam: zaalNaam
        }
    });
    return sessions.map(session => TrainingSession.from(session));
};

export default {
    getTrainingSessionByPloegNaam,
    getAllTrainingSessions,
    addTrainingSession,
    removeTrainingSession,
    getTrainingSessionsByZaal
};