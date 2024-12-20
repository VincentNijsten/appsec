import React, { useState } from "react";
import TrainingSessionService from "@/services/TrainingSessionService";
import {  Ploeg, Zaal } from "@/types";



const AddTrainingSession = ({ onTrainingSessionAdded, ploegenLijst, zalenLijst }: { onTrainingSessionAdded: (session: any) => void, ploegenLijst: Ploeg[], zalenLijst: Zaal[] }) => {
    const [newTrainingSession, setNewTrainingSession] = useState({
        datum: "",
        startTijd: "",
        eindTijd: "",
        zaalNaam: "",
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
        if (!newTrainingSession.datum || !newTrainingSession.startTijd || !newTrainingSession.eindTijd || !newTrainingSession.zaalNaam || newTrainingSession.ploegen.length === 0) {
            setError("Vul alstublieft alle velden in.");
            return;
        }

        try {
            const response = await TrainingSessionService.addTrainingSession({
                ...newTrainingSession,
                ploegen: newTrainingSession.ploegen.map(ploegnaam => ploegenLijst.find(ploeg => ploeg.ploegnaam === ploegnaam)!)
            });
            const addedTrainingSession = await response.json();
            onTrainingSessionAdded(addedTrainingSession);
            setNewTrainingSession({ datum: "", startTijd: "", eindTijd: "", zaalNaam: "", ploegen: [] });
            setError(null);
        } catch (error) {
            if(error instanceof Error){
                setError(error.message);
            }
            else{
                setError("An unknown error occurred");
            }
        }
    };

    return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Voeg een nieuwe Training toe</h2>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
            {/* input voor datum */}
            <div>
            <label htmlFor="newTrainingSession.datum" className="block text-sm font-medium text-gray-700">
                Datum
            </label>
            <input
             type="date"
             name="datum" 
             value={newTrainingSession.datum} 
             onChange={handleChange}
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
             required
             />
            </div>

            {/* input voor startUur */}
            <div>

            <label htmlFor="newTrainingSession.StartUur" className="block text-sm font-medium text-gray-700">
                Start
            </label>
            <input
             type="time" 
             name="startTijd" 
             value={newTrainingSession.startTijd} 
             onChange={handleChange} 
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
             required
             />
            </div>

            {/* input voor eindUur */}
            <div>

            
            <label htmlFor="newTrainingSession.endUur" className="block text-sm font-medium text-gray-700">
                Eind
            </label>
            <input
             type="time" 
             name="eindTijd" 
             value={newTrainingSession.eindTijd} 
             onChange={handleChange} 
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
             required
             />
            </div>
            {/* input voor zaal */}
            <div>
            <label htmlFor="newTrainingSession.zaalnaam" className="block text-sm font-medium text-gray-700">
                Zaal
            </label>
            <select
             name="zaalNaam" 
             value={newTrainingSession.zaalNaam} 
             onChange={handleChange} 
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
             required
             >
                <option
                 value="">Selecteer een zaal
                </option>
                {zalenLijst.map(zaal => (
                    <option
                     key={zaal.naam} 
                     value={zaal.naam}
                     >{zaal.naam}
                    </option>
                ))}
            
            </select>
            </div>

            {/* input voor ploegen */}
            <div>
            <label htmlFor="newTrainingSession.ploegen" className="block text-sm font-medium text-gray-700">
                Ploegen
            </label>
            <select
             multiple name="ploegen" 
             value={newTrainingSession.ploegen} 
             onChange={handlePloegenChange} 
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
             required
             >
                {ploegenLijst.map(ploeg => (
                    <option
                     key={ploeg.ploegnaam} 
                     value={ploeg.ploegnaam}
                     >{ploeg.ploegnaam}
                    </option>
                ))}
            </select>
            </div>

            {/* submit button */}
            <button
             type="submit" 
             className="w-full bg-black text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

             >
                Voeg Trainingssessie Toe
            </button>
        </form>
    </div>
    );
};


export default AddTrainingSession;
