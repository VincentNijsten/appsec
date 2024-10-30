import { TrainingSession } from '../model/trainingSession';
import { Zaal } from '../model/zaal';
import { Ploeg } from '../model/ploeg';
import ploegDb from './ploeg.db';
import zaalDb from './zaal.db';

const trainingSessions: TrainingSession[] = [];
const ploegen = ploegDb.getAllPloegen();
const ploeg1 = ploegen[0];

const zalen = zaalDb.getAllZalen();
const zaal1 = zalen[0];
const newDate = new Date('2024-12-15');

const training1 = new TrainingSession({ ploeg: ploeg1, zaal: zaal1, datum: newDate, startTijd: "10:00", eindTijd: "12:00" });
trainingSessions.push(training1);

// Functie om een trainingssessie op te halen op basis van de ploegnaam
const getTrainingSessionByPloegNaam = ({ ploegnaam }: { ploegnaam: string }): TrainingSession | null => {
    try {
        return trainingSessions.find((session) => session.getPloeg().getPloegnaam().toLowerCase() === ploegnaam.toLowerCase()) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Functie om alle trainingssessies op te halen
const getAllTrainingSessions = (): TrainingSession[] => {
    return trainingSessions;
};


const getTrainingSessionsByZaal = (zaal: Zaal) =>{
    return trainingSessions.filter(session => session.zaal === zaal);
}
// Functie om een trainingssessie toe te voegen
const addTrainingSession = (trainingSession: {
    ploeg: Ploeg;
    zaal: Zaal;
    datum: Date;
    startTijd: string;
    eindTijd: string;
}) => {

    const newSession = new TrainingSession({
        ploeg: trainingSession.ploeg,
        zaal: trainingSession.zaal,
        datum: trainingSession.datum,
        startTijd: trainingSession.startTijd,
        eindTijd: trainingSession.eindTijd,
    });

    trainingSessions.push(newSession);
    
}

// Functie om een trainingssessie te verwijderen op basis van index
const removeTrainingSession = (index: number): boolean => {
    if (index < 0 || index >= trainingSessions.length) {
        return false; 
    }
    trainingSessions.splice(index, 1);
    return true;
};




export default {
    getTrainingSessionByPloegNaam,
    getAllTrainingSessions,
    addTrainingSession,
    removeTrainingSession,
    getTrainingSessionsByZaal
};