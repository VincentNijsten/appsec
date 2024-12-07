import React, { useState, useEffect } from "react";
import { Ploeg } from "@/types";
import PloegService from "@/services/PloegService";

type Props = {
    onPloegUpdated: (ploeg: Ploeg) => void;
    ploegen: Array<Ploeg>;
};

const UpdatePloeg: React.FC<Props> = ({ onPloegUpdated, ploegen }: Props) => {
    const [selectedPloeg, setSelectedPloeg] = useState<string>("");
    const [ploegData, setPloegData] = useState<Partial<Ploeg>>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (selectedPloeg) {
            const ploeg = ploegen.find(ploeg => ploeg.ploegnaam === selectedPloeg);
            if (ploeg) {
                setPloegData(ploeg);
            }
        }
    }, [selectedPloeg, ploegen]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPloeg(e.target.value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPloegData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPloeg) {
            setError("Selecteer alstublieft een ploeg.");
            return;
        }

        try {
            const updatedPloeg = await PloegService.updatePloeg(selectedPloeg, ploegData);
            onPloegUpdated(updatedPloeg);
            setSelectedPloeg("");
            setPloegData({});
            setError(null);
        } catch (error) {
            setError("Er is een fout opgetreden bij het bijwerken van de ploeg.");
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
            {selectedPloeg && (
                <>
                    <div>
                        <label htmlFor="niveau">Niveau:</label>
                        <input
                            type="text"
                            id="niveau"
                            name="niveau"
                            value={ploegData.niveau || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="coachLicentie">Coach Licentie:</label>
                        <input
                            type="text"
                            id="coachLicentie"
                            name="coachLicentie"
                            value={String(ploegData.coachLicentie) || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Update Ploeg</button>
                </>
            )}
        </form>
    );
};

export default UpdatePloeg;