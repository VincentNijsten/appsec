import React, { useState } from "react";
import { Speler } from "@/types";
import SpelerService from "@/services/SpelerService";

type Props = {
    onSpelerAdded: (speler: Speler) => void;
};

const AddSpeler: React.FC<Props> = ({ onSpelerAdded }: Props) => {
    const [newSpeler, setNewSpeler] = useState<Speler>({ naam: "", spelerLicentie: "", leeftijd: 0, ploegNaam: ""});
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewSpeler(prevState => ({
            ...prevState,
            [name]: name === "leeftijd" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSpeler.naam || !newSpeler.spelerLicentie || !newSpeler.leeftijd) {
            setError("Vul alstublieft alle velden in.");
            return;
        }

        try {
            await SpelerService.addSpeler(newSpeler);
            onSpelerAdded(newSpeler);
            setNewSpeler({ naam: "", spelerLicentie: "", leeftijd: 0, ploegNaam: "" });
            setError(null);
        } catch (error) {
            setError("Er is een fout opgetreden bij het toevoegen van de speler.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <label htmlFor="naam">Naam:</label>
                <input
                    type="text"
                    id="naam"
                    name="naam"
                    value={newSpeler.naam}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="spelerLicentie">Speler Licentie:</label>
                <input
                    type="text"
                    id="spelerLicentie"
                    name="spelerLicentie"
                    value={newSpeler.spelerLicentie}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="leeftijd">Leeftijd:</label>
                <input
                    type="number"
                    id="leeftijd"
                    name="leeftijd"
                    value={newSpeler.leeftijd}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="ploegNaam">Ploeg Naam:</label>
                <input
                    type="text"
                    id="ploegNaam"
                    name="ploegNaam"
                    value={newSpeler.ploegNaam}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Voeg Speler Toe</button>
        </form>
    );
};

export default AddSpeler;