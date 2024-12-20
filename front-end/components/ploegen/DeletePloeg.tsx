import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PloegService from "@/services/PloegService";
import TrainingSessionService from "@/services/TrainingSessionService";
import { Ploeg, TrainingSession } from "@/types";

type Props = {
    onPloegDeleted: (ploegnaam: string) => void;
    ploegen: Array<Ploeg>;
};

const DeletePloeg: React.FC<Props> = ({ onPloegDeleted, ploegen }: Props) => {
    const [selectedPloeg, setSelectedPloeg] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [trainingSessions, setTrainingSessions] = useState<Array<TrainingSession>>([]);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (selectedPloeg) {
            getTrainingSessions(selectedPloeg);
        }
    }, [selectedPloeg]);

    const getTrainingSessions = async (ploegnaam: string) => {
        try {
            const response = await TrainingSessionService.getTrainingSessionsByPloeg(ploegnaam);
            const sessions = await response.json();
            setTrainingSessions(sessions);
        } catch (error) {
            setError("Er is een fout opgetreden bij het ophalen van de trainingssessies.");
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPloeg(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPloeg) {
            setError("Selecteer alstublieft een ploeg.");
            return;
        }

        if (trainingSessions.length > 0) {
            setShowConfirmation(true);
        } else {
            await deletePloeg();
        }
    };

    const deletePloeg = async () => {
        try {
            await PloegService.deletePloeg(selectedPloeg);
            onPloegDeleted(selectedPloeg);
            setSelectedPloeg("");
            setError(null);
            router.push("/ploegen/overview");
        } catch (error) {
            setError("Er is een fout opgetreden bij het verwijderen van de ploeg.");
        }
    };

    const handleConfirmation = async (confirm: boolean) => {
        setShowConfirmation(false);
        if (confirm) {
            await deletePloeg();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="ploeg" className="block text-gray-700 font-medium mb-2">
                        Ploeg:
                    </label>
                    <select
                        id="ploeg"
                        name="ploeg"
                        value={selectedPloeg}
                        onChange={handleSelectChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                        required
                    >
                        <option value="">Selecteer een ploeg</option>
                        {ploegen.map(ploeg => (
                            <option key={ploeg.ploegnaam} value={ploeg.ploegnaam}>
                                {ploeg.ploegnaam}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                >
                    Verwijder Ploeg
                </button>
            </form>

            {showConfirmation && (
                <div className="confirmation-dialog bg-gray-100 p-4 rounded-md shadow-md">
                    <p>Deze ploeg heeft nog geplande trainingssessies. Weet je zeker dat je deze ploeg wilt verwijderen?</p>
                    <div className="mt-4">
                        <button
                            onClick={() => handleConfirmation(true)}
                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition mr-2"
                        >
                            Ja
                        </button>
                        <button
                            onClick={() => handleConfirmation(false)}
                            className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition"
                        >
                            Nee
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeletePloeg;
