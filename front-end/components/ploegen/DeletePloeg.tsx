import React, { useState } from "react";
import { Ploeg } from "@/types";
import PloegService from "@/services/PloegService";

type Props = {
    onPloegDeleted: (ploegnaam: string) => void;
    ploegen: Array<Ploeg>;
};

const DeletePloeg: React.FC<Props> = ({ onPloegDeleted, ploegen }: Props) => {
    const [selectedPloeg, setSelectedPloeg] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPloeg(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPloeg) {
            setError("Selecteer alstublieft een ploeg.");
            return;
        }

        try {
            await PloegService.deletePloeg(selectedPloeg);
            onPloegDeleted(selectedPloeg);
            setSelectedPloeg("");
            setError(null);
        } catch (error) {
            setError("Er is een fout opgetreden bij het verwijderen van de ploeg.");
        }
    };

    return (
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
    );
};

export default DeletePloeg;