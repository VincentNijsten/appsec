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
            console.log(sessions);
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
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div>
                    <label htmlFor="ploeg">Ploeg:</label>
                    <select
                        id="ploeg"
                        name="ploeg"
                        value={selectedPloeg}
                        onChange={handleSelectChange}
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
                <button type="submit">Verwijder Ploeg</button>
            </form>

            {showConfirmation && (
                <div className="confirmation-dialog">
                    <p>Deze ploeg heeft nog geplande trainingssessies. Weet je zeker dat je deze ploeg wilt verwijderen?</p>
                    <button onClick={() => handleConfirmation(true)}>Ja</button>
                    <button onClick={() => handleConfirmation(false)}>Nee</button>
                </div>
            )}
        </>
    );
};

export default DeletePloeg;