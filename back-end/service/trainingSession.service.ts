import trainingSessionsDb from "../repository/trainingSession.db"; 
import { TrainingSession } from "../model/trainingSession"; 
import { Ploeg } from "../model/ploeg";
import { Zaal } from "../model/zaal";
import ploegDb from "../repository/ploeg.db";
import zaalDb from "../repository/zaal.db";

// Functie om alle trainingssessies op te halen
const getAllTrainingSessions = (): TrainingSession[] => {
    if(trainingSessionsDb.getAllTrainingSessions().length === 0) {
        throw new Error("No training sessions");
    }
    return trainingSessionsDb.getAllTrainingSessions();
}

// Functie om een trainingssessie op basis van ploegnaam op te halen
const getTrainingSessionByPloegNaam = (ploegnaam: string): TrainingSession | null => {
    const session = trainingSessionsDb.getTrainingSessionByPloegNaam({ ploegnaam });

    if (session == null) {
        throw new Error('Deze trainingssessie kan niet gevonden worden');
    } else {
        return session;
    }
}
// Functie om een trainingssessie toe te voegen
const addTrainingSession = (trainingSessionData: {
    ploegnaam: string;
    zaalnaam: string;
    datum: Date;
    startTijd: string;
    eindTijd: string;
}) => {
    const ploeg = ploegDb.getAllPloegen().find(p => p.getPloegnaam() === trainingSessionData.ploegnaam);
    const zaal = zaalDb.getAllZalen().find(z => z.getNaam() === trainingSessionData.zaalnaam);

    if (!ploeg) {
        throw new Error(`Ploeg met naam ${trainingSessionData.ploegnaam} niet gevonden.`);
    }

    if (!zaal) {
        throw new Error(`Zaal met naam ${trainingSessionData.zaalnaam} niet gevonden.`);
    }

    // Zet de start- en eindtijden om naar Date objecten
    const startTijd = new Date(`${trainingSessionData.datum.toISOString().split('T')[0]}T${trainingSessionData.startTijd}`);
    const eindTijd = new Date(`${trainingSessionData.datum.toISOString().split('T')[0]}T${trainingSessionData.eindTijd}`);

    // Controleer of de zaal al bezet is in de opgegeven tijd
    const bestaandeTrainingen = trainingSessionsDb.getTrainingSessionsByZaal(zaal);
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

    // Maak een nieuwe instantie van TrainingSession
    const newSession = new TrainingSession({
        ploeg: ploeg,
        zaal: zaal,
        datum: trainingSessionData.datum,
        startTijd: trainingSessionData.startTijd,
        eindTijd: trainingSessionData.eindTijd
    });

    // Voeg de nieuwe sessie toe aan de database
    trainingSessionsDb.addTrainingSession(newSession);

    return "Training succesvol toegevoegd";
};




// Functie om een trainingssessie te verwijderen op basis van index
const removeTrainingSession = (index: number): string => {
    const success = trainingSessionsDb.removeTrainingSession(index);
    if (success) {
        return "Training sessie succesvol verwijderd";
    } else {
        throw new Error('Kon de trainingssessie niet verwijderen');
    }
}

// Exporteer de functies
export default {
    getAllTrainingSessions,
    getTrainingSessionByPloegNaam,
    addTrainingSession,
    removeTrainingSession
}