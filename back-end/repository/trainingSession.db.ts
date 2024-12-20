import { PrismaClient } from '@prisma/client';
import { TrainingSession } from '../model/trainingSession';

const prisma = new PrismaClient();

// Functie om een trainingssessie op te halen op basis van de ploegnaam
const getTrainingSessionByPloegNaam = async (ploegnaam: string): Promise<TrainingSession | null> => {
    try {
        const session = await prisma.trainingSession.findFirst({
            where: {
                ploegen: {
                    some: {
                        ploegnaam: ploegnaam}
                }
            },
            include: {
                ploegen: true
            },
           
        });
        return session ? TrainingSession.from(session) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om alle trainingssessies op te halen
const getAllTrainingSessions = async (): Promise<TrainingSession[]> => {
    const sessions = await prisma.trainingSession.findMany({
        include: {
            ploegen: true
        }
    });
    return sessions.map(session => TrainingSession.from(session));
};

// Functie om een trainingssessie toe te voegen
const addTrainingSession = async ({ zaalNaam, datum, startTijd, eindTijd, ploegen }: TrainingSession): Promise<TrainingSession> => {
  

    try {
        const newSession = await prisma.trainingSession.create({
            data: {
                
                zaalNaam: zaalNaam,
                datum: datum,
                startTijd: startTijd,
                eindTijd: eindTijd,
                ploegen: {
                    connect: ploegen.map((ploeg) => ({ ploegnaam: ploeg.ploegnaam }))
                }
            },
            include: {
                ploegen: true
            }
        });
        return TrainingSession.from(newSession);
    } catch (error) {
        console.error('Fout bij het toevoegen van trainingssessie:', error);
        throw new Error('Kan trainingssessie niet toevoegen. Zie serverlog voor details.');
    }
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
        },
        include: {ploegen: true}
    });
    return sessions.map(session => TrainingSession.from(session));
};


const removePloegFromTrainingSession = async (ploegnaam: string): Promise<boolean> => {
    try {
        // Zoek alle trainingssessies die de ploeg bevatten
        const sessions = await prisma.trainingSession.findMany({
            where: {
                ploegen: {
                    some: {
                        ploegnaam: ploegnaam
                    }
                }
            }
        });

        // Als er geen sessies zijn gevonden, retourneer false
        if (sessions.length === 0) {
            return false;
        }

        // Verwijder de ploeg uit elke trainingssessie
        await Promise.all(sessions.map(session => 
            prisma.trainingSession.update({
                where: { id: session.id }, // Zorg ervoor dat je de juiste identificatie gebruikt
                data: {
                    ploegen: {
                        disconnect: { ploegnaam: ploegnaam }
                    }
                }
            })
        ));

        return true; // Succesvol verwijderd
    } catch (error) {
        console.error(error);
        return false; // Fout opgetreden
    }
};


export default {
    getTrainingSessionByPloegNaam,
    getAllTrainingSessions,
    addTrainingSession,
    removeTrainingSession,
    getTrainingSessionsByZaal,
    removePloegFromTrainingSession
};