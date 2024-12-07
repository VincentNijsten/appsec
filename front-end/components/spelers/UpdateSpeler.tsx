import React, { useState, useEffect } from "react";
import { Speler } from "@/types";
import SpelerService from "@/services/SpelerService";

type Props = {
    onSpelerUpdated: (speler: Speler) => void;
    spelers: Array<Speler>;
};

const UpdateSpeler: React.FC<Props> = ({ onSpelerUpdated, spelers }: Props) => {
    const [selectedSpeler, setSelectedSpeler] = useState<string>("");
    const [spelerData, setSpelerData] = useState<Partial<Speler>>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (selectedSpeler) {
            const speler = spelers.find(speler => speler.spelerLicentie === selectedSpeler);
            if (speler) {
                setSpelerData(speler);
            }
        }
    }, [selectedSpeler, spelers]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSpeler(e.target.value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSpelerData(prevState => ({
            ...prevState,
            [name]: name === "leeftijd" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSpeler) {
            setError("Selecteer alstublieft een speler.");
            return;
        }

        try {
            await SpelerService.updateSpeler(selectedSpeler, spelerData);
            onSpelerUpdated({ ...spelerData, spelerLicentie: selectedSpeler } as Speler);
            setSelectedSpeler("");
            setSpelerData({});
            setError(null);
        } catch (error) {
            setError("Er is een fout opgetreden bij het bijwerken van de speler.");
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
            {selectedSpeler && (
                <>
                    <div>
                        <label htmlFor="naam">Naam:</label>
                        <input
                            type="text"
                            id="naam"
                            name="naam"
                            value={spelerData.naam || ""}
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
                            value={spelerData.spelerLicentie || ""}
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
                            value={spelerData.leeftijd || ""}
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
                            value={spelerData.ploegNaam || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Update Speler</button>
                </>
            )}
        </form>
    );
};

export default UpdateSpeler;