import React, { useState, useEffect } from "react";
import { Ploeg, Speler } from "@/types";
import SpelerService from "@/services/SpelerService";
import { useRouter } from "next/router";

type Props = {
    onSpelerUpdated: (speler: Speler) => void;
    spelers: Array<Speler>;
    ploegen : Array<Ploeg>;
};

const UpdateSpeler: React.FC<Props> = ({ onSpelerUpdated, spelers, ploegen }: Props) => {
    const [selectedSpeler, setSelectedSpeler] = useState<string>("");
    const [spelerData, setSpelerData] = useState<Partial<Speler>>({});
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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
           const updatedSpeler =  await SpelerService.updateSpeler(selectedSpeler, spelerData);
            onSpelerUpdated({ ...updatedSpeler } as Speler);
            setSelectedSpeler("");
            setSpelerData({});
            setError(null);
            router.push("/spelers/overview");
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
                        <label htmlFor="ploegNaam">Ploeg:</label>
                        <select
                            id="ploegNaam"
                            name="ploegNaam"
                            value={spelerData.ploegNaam || ""}
                            onChange={(e) => setSpelerData(prevState => ({
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
                    <button type="submit">Update Speler</button>
                </>
            )}
        </form>
    );
};

export default UpdateSpeler;