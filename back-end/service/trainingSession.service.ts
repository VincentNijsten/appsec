import trainingSessionsDb from "../repository/trainingSession.db";
import { TrainingSession } from "../model/trainingSession";
import { Ploeg } from "../model/ploeg";
import zaalDb from "../repository/zaal.db";

// Functie om alle trainingssessies op te halen
const getAllTrainingSessions = async (): Promise<TrainingSession[]> => {
    const sessions = await trainingSessionsDb.getAllTrainingSessions();
    if (sessions.length === 0) {
        throw new Error("No training sessions");
    }
    return sessions;
}

// Functie om een trainingssessie op basis van ploegnaam op te halen
const getTrainingSessionByPloegNaam = async (ploegnaam: string): Promise<TrainingSession | null> => {
    const session = await trainingSessionsDb.getTrainingSessionByPloegNaam(ploegnaam);

    if (session == null) {
        throw new Error('Deze trainingssessie kan niet gevonden worden');
    } else {
        return session;
    }
}

// Functie om een trainingssessie toe te voegen
const addTrainingSession = async (trainingSessionData: {
    id: string,
    zaalnaam: string;
    datum: Date;
    startTijd: string;
    eindTijd: string;
    ploegen: Ploeg[];
}) => {
    const zaal = await zaalDb.getAllZalen().then(zalen => zalen.find(z => z.getNaam() === trainingSessionData.zaalnaam));

  

    if (!zaal) {
        throw new Error(`Zaal met naam ${trainingSessionData.zaalnaam} niet gevonden.`);
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

    return "Training succesvol toegevoegd";
};

// Functie om een trainingssessie te verwijderen op basis van ID
const removeTrainingSession = async (id: string): Promise<string> => {
    const success = await trainingSessionsDb.removeTrainingSession(id);
    if (success) {
        return "Training sessie succesvol verwijderd";
    } else {
        throw new Error('Kon de trainingssessie niet verwijderen');
    }
}


const removePloegFromTrainingSession = async (ploegnaam: string): Promise<string> => {
    const success = await trainingSessionsDb.removePloegFromTrainingSession(ploegnaam);
    if (success) {
        return "Ploeg succesvol verwijderd";
    } else {
        throw new Error('Kon de ploeg niet verwijderen');
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