import React, { useState } from "react";
import { Coach, Ploeg } from "@/types";
import PloegService from "@/services/PloegService";
import { useRouter } from "next/router";

type Props = {
    onPloegAdded: (ploeg: Ploeg) => void;
    coaches: Array<Coach>;
};

const AddPloeg: React.FC<Props> = ({ onPloegAdded, coaches }: Props) => {
    const [newPloeg, setNewPloeg] = useState<{ ploegnaam: string; niveau: string; coachLicentie?: string | null }>({
        ploegnaam: "",
        niveau: "",
        coachLicentie: null,
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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
            router.push("/ploegen/overview");
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
                <select
                    id="niveau"
                    name="niveau"
                    value={newPloeg.niveau}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecteer Niveau</option>
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
                    value={newPloeg.coachLicentie || ""}
                    onChange={handleChange}
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
            <button type="submit">Voeg Ploeg Toe</button>
        </form>
    );
};

export default AddPloeg;