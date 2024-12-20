import trainingSessionsDb from "../repository/trainingSession.db";
import { TrainingSession } from "../model/trainingSession";
import { Ploeg } from "../model/ploeg";
import zaalDb from "../repository/zaal.db";
import { TrainingSessionInput } from "../types";

// Functie om alle trainingssessies op te halen
const getAllTrainingSessions = async (): Promise<TrainingSession[]> => {
    const sessions = await trainingSessionsDb.getAllTrainingSessions();
    if (sessions.length === 0) {
        throw new Error("No training sessions");
    }
    return sessions;
}

// Functie om een trainingssessie op basis van ploegnaam op te halen
const getTrainingSessionByPloegNaam = async (ploegnaam: string): Promise<{trainingSession?: TrainingSession; message?:string}> => {
    try {
        const session = await trainingSessionsDb.getTrainingSessionByPloegNaam(ploegnaam);
    
        if (session == null) {
            return {message:'Deze trainingssessie kan niet gevonden worden'};
        } else {
            return {trainingSession: session};
        }
    } catch (error) {
        return { message: error instanceof Error ? error.message : 'An unknown error occurred' };

        
    }
}

// Functie om een trainingssessie toe te voegen
const addTrainingSession = async (trainingSessionData: {
    id: string,
    zaalNaam: string;
    datum: Date;
    startTijd: string;
    eindTijd: string;
    ploegen: Ploeg[];
}):Promise<{trainingSession?:TrainingSession;message?:string}> => {
    try {
        const zaal = await zaalDb.getAllZalen().then(zalen => zalen.find(z => z.getNaam() === trainingSessionData.zaalNaam));
        if (!zaal) {
            throw new Error(`Zaal met naam ${trainingSessionData.zaalNaam} niet gevonden.`);
        }
    
        // Zet de start- en eindtijden om naar Date objecten
        const startTijd = new Date(`${trainingSessionData.datum.toISOString().split('T')[0]}T${trainingSessionData.startTijd}`);
        const eindTijd = new Date(`${trainingSessionData.datum.toISOString().split('T')[0]}T${trainingSessionData.eindTijd}`);
    
        // Controleer of de zaal al bezet is in de opgegeven tijd
        const bestaandeTrainingen = await trainingSessionsDb.getTrainingSessionsByZaal(zaal.getNaam());
        for (const training of bestaandeTrainingen) {
            const trainingStart = new Date(training.datum);
            const trainingEind = new Date(training.datum);
            trainingStart.setHours(parseInt(training.startTijd.split(':')[0]), parseInt(training.startTijd.split(':')[1]));
            trainingEind.setHours(parseInt(training.eindTijd.split(':')[0]), parseInt(training.eindTijd.split(':')[1]));
    
            // Controleer op overlap
            if ((startTijd < trainingEind && eindTijd > trainingStart)) {
                throw new Error(`Er is al een training op dat moment bezig in ${zaal.getNaam()}.`);
            }
        }
    
        const ploegen = trainingSessionData.ploegen;
        if(ploegen.length === 0 || !ploegen) {
            throw new Error('Er moet minstens 1 ploeg aan de trainingssessie worden toegevoegd');
        }
    
        // Maak een nieuwe instantie van TrainingSession
        const newSession = new TrainingSession({
            id: trainingSessionData.id,
            zaalNaam: zaal.getNaam(),
            datum: trainingSessionData.datum,
            startTijd: trainingSessionData.startTijd,
            eindTijd: trainingSessionData.eindTijd,
            ploegen: ploegen
        });
    
        // Voeg de nieuwe sessie toe aan de database
        await trainingSessionsDb.addTrainingSession(newSession);
    
        return {trainingSession:newSession};
    } catch (error) {
        return { message: error instanceof Error ? error.message : 'An unknown error occurred' };

        
    }
};

// Functie om een trainingssessie te verwijderen op basis van ID
const removeTrainingSession = async (id: string): Promise<{trainingSession?:TrainingSession, message?: string}> => {
   try {
     const success = await trainingSessionsDb.removeTrainingSession(id);
     if (success) {
         return {message: "Trainingssessie succesvol verwijderd"};
     } else {
         throw new Error('Kon de trainingssessie niet verwijderen');
     }
   } catch (error) {
        return { message: error instanceof Error ? error.message : 'An unknown error occurred' };

    
   }
}


const removePloegFromTrainingSession = async (ploegnaam: string): Promise<{trainingSession?:TrainingSession; message?:string}> => {
 try {
       const success = await trainingSessionsDb.removePloegFromTrainingSession(ploegnaam);
       if (success) {
           return {message: "Ploeg succesvol verwijderd"};
       } else {
           throw new Error('Kon de ploeg niet verwijderen');
       }
 } catch (error) {
    return { message: error instanceof Error ? error.message : 'An unknown error occurred' };

    
 }
}

// Exporteer de functies
export default {
    getAllTrainingSessions,
    getTrainingSessionByPloegNaam,
    addTrainingSession,
    removeTrainingSession,
    removePloegFromTrainingSession
}