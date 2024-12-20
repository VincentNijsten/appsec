import React, { useState } from "react";
import TrainingSessionService from "@/services/TrainingSessionService";
import { TrainingSession, Ploeg, Zaal } from "@/types";

type Props = {
    onTrainingSessionAdded: (trainingSession: TrainingSession) => void;
    ploegen: Array<Ploeg>;
    zalen: Array<Zaal>;
};

const AddTrainingSession: React.FC<Props> = ({ onTrainingSessionAdded, ploegen, zalen }: Props) => {
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
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500">{error}</p>}
                <div>
                    <label htmlFor="datum" className="block text-sm font-medium text-gray-700">Datum:</label>
                    <input
                        type="date"
                        id="datum"
                        name="datum"
                        value={newTrainingSession.datum}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="startTijd" className="block text-sm font-medium text-gray-700">Start Tijd:</label>
                    <input
                        type="time"
                        id="startTijd"
                        name="startTijd"
                        value={newTrainingSession.startTijd}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="eindTijd" className="block text-sm font-medium text-gray-700">Eind Tijd:</label>
                    <input
                        type="time"
                        id="eindTijd"
                        name="eindTijd"
                        value={newTrainingSession.eindTijd}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="zaalnaam" className="block text-sm font-medium text-gray-700">Zaal:</label>
                    <select
                        id="zaalnaam"
                        name="zaalnaam"
                        value={newTrainingSession.zaalnaam}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    >
                        <option value="">Selecteer een Zaal</option>
                        {zalen && zalen.length > 0 ? (
                            zalen.map(zaal => (
                                <option key={zaal.naam} value={zaal.naam}>
                                    {zaal.naam}
                                </option>
                            ))
                        ) : (
                            <option value="">Geen zalen beschikbaar</option>
                        )}
                    </select>
                </div>
                <div>
                    <label htmlFor="ploegnaam" className="block text-sm font-medium text-gray-700">Ploeg:</label>
                    <select
                        id="ploegnaam"
                        name="ploegnaam"
                        value={newTrainingSession.ploegnaam}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    >
                        <option value="">Selecteer een ploeg</option>
                        {ploegen && ploegen.length > 0 ? (
                            ploegen.map(ploeg => (
                                <option key={ploeg.ploegnaam} value={ploeg.ploegnaam}>
                                    {ploeg.ploegnaam}
                                </option>
                            ))
                        ) : (
                            <option value="">Geen ploegen beschikbaar</option>
                        )}
                    </select>
                </div>
                <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md shadow hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50">Voeg Trainingssessie Toe</button>
            </form>
        </div>
    );
};

export default AddTrainingSession;
