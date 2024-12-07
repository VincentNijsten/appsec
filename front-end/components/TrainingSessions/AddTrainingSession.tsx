import React, { useState } from "react";
import TrainingSessionService from "@/services/TrainingSessionService";
import { TrainingSession } from "@/types";

type Props = {
    onTrainingSessionAdded: (trainingSession: TrainingSession) => void;
};

const AddTrainingSession: React.FC<Props> = ({ onTrainingSessionAdded }: Props) => {
    const [newTrainingSession, setNewTrainingSession] = useState<{ datum: string; startTijd: string; eindTijd: string; zaalnaam: string; ploegnaam: string }>({
        datum: "",
        startTijd: "",
        eindTijd: "",
        zaalnaam: "",
        ploegnaam: "",
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewTrainingSession(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTrainingSession.datum || !newTrainingSession.startTijd || !newTrainingSession.eindTijd || !newTrainingSession.zaalnaam || !newTrainingSession.ploegnaam) {
            setError("Vul alstublieft alle velden in.");
            return;
        }

        try {
            const addedTrainingSession = await TrainingSessionService.addTrainingSession(newTrainingSession);
            onTrainingSessionAdded(addedTrainingSession);
            setNewTrainingSession({ datum: "", startTijd: "", eindTijd: "", zaalnaam: "", ploegnaam: "" });
            setError(null);
        } catch (error) {
            setError("Er is een fout opgetreden bij het toevoegen van de trainingssessie.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <label htmlFor="datum">Datum:</label>
                <input
                    type="date"
                    id="datum"
                    name="datum"
                    value={newTrainingSession.datum}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="startTijd">Start Tijd:</label>
                <input
                    type="time"
                    id="startTijd"
                    name="startTijd"
                    value={newTrainingSession.startTijd}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="eindTijd">Eind Tijd:</label>
                <input
                    type="time"
                    id="eindTijd"
                    name="eindTijd"
                    value={newTrainingSession.eindTijd}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="zaalnaam">Zaal:</label>
                <input
                    type="text"
                    id="zaalnaam"
                    name="zaalnaam"
                    value={newTrainingSession.zaalnaam}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="ploegnaam">Ploeg:</label>
                <input
                    type="text"
                    id="ploegnaam"
                    name="ploegnaam"
                    value={newTrainingSession.ploegnaam}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Voeg Trainingssessie Toe</button>
        </form>
    );
};

export default AddTrainingSession;