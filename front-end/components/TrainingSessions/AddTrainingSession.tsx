import React, { useState } from 'react';
import styles from '@/styles/addTraining.module.css';
import TrainingSessionService from '@/services/TrainingSessionService';
import { Ploeg, Zaal } from '@/types';

const AddTrainingSession = ({ onTrainingSessionAdded, ploegenLijst, zalenLijst }: { onTrainingSessionAdded: (session: any) => void, ploegenLijst: Ploeg[], zalenLijst: Zaal[] }) => {
    const [newTrainingSession, setNewTrainingSession] = useState({
        datum: "",
        startTijd: "",
        eindTijd: "",
        zaalnaam: "",
        ploegen: [] as string[],
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewTrainingSession(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePloegenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setNewTrainingSession(prevState => ({
            ...prevState,
            ploegen: selectedOptions
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTrainingSession.datum || !newTrainingSession.startTijd || !newTrainingSession.eindTijd || !newTrainingSession.zaalnaam || newTrainingSession.ploegen.length === 0) {
            setError("Vul alstublieft alle velden in.");
            return;
        }

        try {
            const addedTrainingSession = await TrainingSessionService.addTrainingSession({
                ...newTrainingSession,
                ploegen: newTrainingSession.ploegen.map(ploegnaam => ploegenLijst.find(ploeg => ploeg.ploegnaam === ploegnaam)!)
            });
            onTrainingSessionAdded(addedTrainingSession);
            setNewTrainingSession({ datum: "", startTijd: "", eindTijd: "", zaalnaam: "", ploegen: [] });
            setError(null);
        } catch (error) {
            setError("Er is een fout opgetreden bij het toevoegen van de trainingssessie.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="newTrainingSession.datum">Datum</label>
            <input type="date" name="datum" value={newTrainingSession.datum} onChange={handleChange} className={styles.input} />
            <label htmlFor="newTrainingSession.StartUur">Start</label>
            <input type="time" name="startTijd" value={newTrainingSession.startTijd} onChange={handleChange} className={styles.input}/>
            <label htmlFor="newTrainingSession.endUur">Eind</label>
            <input type="time" name="eindTijd" value={newTrainingSession.eindTijd} onChange={handleChange} className={styles.input}/>
            <label htmlFor="newTrainingSession.zaalnaam">Zaal</label>
            <select name="zaalnaam" value={newTrainingSession.zaalnaam} onChange={handleChange} className={styles.select}>
                <option value="">Selecteer een zaal</option>
                {zalenLijst.map(zaal => (
                    <option key={zaal.naam} value={zaal.naam}>{zaal.naam}</option>
                ))}
            </select>
            <label htmlFor="newTrainingSession.ploegen">Ploegen</label>
            <select multiple name="ploegen" value={newTrainingSession.ploegen} onChange={handlePloegenChange} className={styles.select}>
                {ploegenLijst.map(ploeg => (
                    <option key={ploeg.ploegnaam} value={ploeg.ploegnaam}>{ploeg.ploegnaam}</option>
                ))}
            </select>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.button}>Voeg Trainingssessie Toe</button>
        </form>
    );
};

export default AddTrainingSession;