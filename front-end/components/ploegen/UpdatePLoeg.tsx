import React, { useState, useEffect } from "react";
import { Coach, Ploeg } from "@/types";
import PloegService from "@/services/PloegService";
import { useRouter } from "next/router";

type Props = {
    onPloegUpdated: (ploeg: Ploeg) => void;
    ploegen: Array<Ploeg>;
    coaches: Array<Coach>;
};

const UpdatePloeg: React.FC<Props> = ({ onPloegUpdated, ploegen , coaches}: Props) => {
    const [selectedPloeg, setSelectedPloeg] = useState<string>("");
    const [ploegData, setPloegData] = useState<Partial<Ploeg>>({});
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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
            router.push("/ploegen/overview");
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
                <select
                    id="niveau"
                    name="niveau"
                    value={ploegData.niveau}
                    onChange={(e) => handleSelectChange(e as React.ChangeEvent<HTMLSelectElement>)}
                    required
                >
                    <option value={ploegData.niveau}>{ploegData.niveau}</option>
                    <option value="Liga A">Liga A</option>
                    <option value="Nationale 1">Nationale 1</option>
                    <option value="Nationale 2">Nationale 2</option>
                    <option value="Nationale 3">Nationale 3</option>
                    <option value="Promo 1">Promo 1</option>
                    <option value="Promo 2">Promo 2</option>
                    <option value="Promo 3">Promo 3</option>
                    <option value="Promo 4">Promo 4</option>
                </select>
            </div>
            <div>
                <label htmlFor="coachLicentie">Coach:</label>
                <select
                    id="coachLicentie"
                    name="coachLicentie"
                    value={String(ploegData.coachLicentie) || ""}
                    onChange={(e) => handleSelectChange(e as React.ChangeEvent<HTMLSelectElement>)}
                    required
                >
                    <option value="">Selecteer een Coach</option>
                    {coaches.map(coach => (
                        <option key={coach.coachLicentie} value={coach.coachLicentie}>
                            {coach.naam}
                        </option>
                    ))}
                </select>
            </div>
                    <button type="submit">Update Ploeg</button>
                </>
            )}
        </form>
    );
};

export default UpdatePloeg;