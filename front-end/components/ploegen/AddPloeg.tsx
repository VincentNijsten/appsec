import React, { useState } from "react";
import { Ploeg } from "@/types";
import PloegService from "@/services/PloegService";

type Props = {
    onPloegAdded: (ploeg: Ploeg) => void;
};

const AddPloeg: React.FC<Props> = ({ onPloegAdded }: Props) => {
    const [newPloeg, setNewPloeg] = useState<{ ploegnaam: string; niveau: string; coachLicentie?: string | null }>({
        ploegnaam: "",
        niveau: "",
        coachLicentie: null,
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewPloeg(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPloeg.ploegnaam || !newPloeg.niveau) {
            setError("Vul alstublieft alle velden in.");
            return;
        }

        try {
            const addedPloeg = await PloegService.addPloeg(newPloeg);
            onPloegAdded(addedPloeg);
            setNewPloeg({ ploegnaam: "", niveau: "", coachLicentie: null });
            setError(null);
        } catch (error) {
            setError("Er is een fout opgetreden bij het toevoegen van de ploeg.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <label htmlFor="ploegnaam">Ploegnaam:</label>
                <input
                    type="text"
                    id="ploegnaam"
                    name="ploegnaam"
                    value={newPloeg.ploegnaam}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="niveau">Niveau:</label>
                <input
                    type="text"
                    id="niveau"
                    name="niveau"
                    value={newPloeg.niveau}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="coachLicentie">Coach Licentie (optioneel):</label>
                <input
                    type="text"
                    id="coachLicentie"
                    name="coachLicentie"
                    value={newPloeg.coachLicentie || ""}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Voeg Ploeg Toe</button>
        </form>
    );
};

export default AddPloeg;