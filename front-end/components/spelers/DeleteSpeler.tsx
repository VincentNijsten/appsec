import React, { useState } from "react";
import { Speler } from "@/types";
import SpelerService from "@/services/SpelerService";
import { useRouter } from "next/router";

type Props = {
    onSpelerDeleted: (spelerLicentie: string) => void;
    spelers: Array<Speler>;
};

const DeleteSpeler: React.FC<Props> = ({ onSpelerDeleted, spelers }: Props) => {
    const [selectedSpeler, setSelectedSpeler] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSpeler(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSpeler) {
            setError("Selecteer alstublieft een speler.");
            return;
        }

        try {
            const deletedSpeler = await SpelerService.deleteSpeler(selectedSpeler);
            onSpelerDeleted(deletedSpeler);
            setSelectedSpeler("");
            setError(null);
            router.push("/spelers/overview");
        } catch (error) {
            setError("Er is een fout opgetreden bij het verwijderen van de speler.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <label htmlFor="speler">Speler:</label>
                <select
                    id="speler"
                    name="speler"
                    value={selectedSpeler}
                    onChange={handleSelectChange}
                    required
                >
                    <option value="">Selecteer een speler</option>
                    {spelers.map(speler => (
                        <option key={speler.spelerLicentie} value={speler.spelerLicentie}>
                            {speler.naam}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Verwijder Speler</button>
        </form>
    );
};

export default DeleteSpeler;