import React, { useState } from "react";
import { Ploeg, Speler } from "@/types";
import SpelerService from "@/services/SpelerService";
import { useRouter } from "next/router";

type Props = {
    onSpelerAdded: (speler: Speler) => void;
    ploegen : Array<Ploeg>;
};

const AddSpeler: React.FC<Props> = ({ onSpelerAdded,ploegen }: Props) => {
    const [newSpeler, setNewSpeler] = useState<Speler>({ naam: "", spelerLicentie: "", leeftijd: 0, ploegNaam: ""});
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(`Name: ${name}, Value: ${value}`); // Voeg deze regel toe

        setNewSpeler(prevState => ({
            ...prevState,
            [name]: name === "leeftijd" ? parseInt(value) : value 
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSpeler.naam || !newSpeler.spelerLicentie || !newSpeler.leeftijd) {
            setError("Vul alstublieft alle velden in.");
            return;
        }

        try {
            const addedSpeler = await SpelerService.addSpeler(newSpeler);
            onSpelerAdded(addedSpeler);
            setNewSpeler({ naam: "", spelerLicentie: "", leeftijd: 0, ploegNaam: "" });
            setError(null);
            router.push("/spelers/overview");
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
                <label htmlFor="ploegnaam">Ploeg:</label>
                <select
                    id="ploegnaam"
                    name="ploegnaam"
                    value={newSpeler.ploegNaam || ""}
                    onChange={(e) => setNewSpeler(prevState => ({
                        ...prevState,
                        ploegNaam: e.target.value
                    }))}
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
            <button type="submit">Voeg Speler Toe</button>
        </form>
    );
};

export default AddSpeler;