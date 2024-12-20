import React, { useState, useEffect } from "react";
import { Ploeg, Speler } from "@/types";
import SpelerService from "@/services/SpelerService";
import { useRouter } from "next/router";

type Props = {
    onSpelerUpdated: (speler: Speler) => void;
    spelers: Array<Speler>;
    ploegen: Array<Ploeg>;
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            const updatedSpeler = await SpelerService.updateSpeler(selectedSpeler, spelerData);
            onSpelerUpdated({ ...updatedSpeler } as unknown as Speler);
            setSelectedSpeler("");
            setSpelerData({});
            setError(null);
            router.push("/spelers/overview");
        } catch (error) {
            setError("Er is een fout opgetreden bij het bijwerken van de speler.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
            {error && (
                <p className="mb-4 text-sm text-red-600">{error}</p>
            )}
            <div className="mb-4">
                <label htmlFor="speler" className="block text-sm font-medium text-gray-700">
                    Speler
                </label>
                <select
                    id="speler"
                    name="speler"
                    value={selectedSpeler}
                    onChange={handleSelectChange}
                    required
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
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
                    <div className="mb-4">
                        <label htmlFor="naam" className="block text-sm font-medium text-gray-700">
                            Naam
                        </label>
                        <input
                            type="text"
                            id="naam"
                            name="naam"
                            value={spelerData.naam || ""}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="spelerLicentie" className="block text-sm font-medium text-gray-700">
                            Speler Licentie
                        </label>
                        <input
                            type="text"
                            id="spelerLicentie"
                            name="spelerLicentie"
                            value={spelerData.spelerLicentie || ""}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="leeftijd" className="block text-sm font-medium text-gray-700">
                            Leeftijd
                        </label>
                        <input
                            type="number"
                            id="leeftijd"
                            name="leeftijd"
                            value={spelerData.leeftijd || ""}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ploegNaam" className="block text-sm font-medium text-gray-700">
                            Ploeg
                        </label>
                        <select
                            id="ploegNaam"
                            name="ploegNaam"
                            value={spelerData.ploegNaam || ""}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                        >
                            <option value="">Selecteer een ploeg</option>
                            {ploegen.map(ploeg => (
                                <option key={ploeg.ploegnaam} value={ploeg.ploegnaam}>
                                    {ploeg.ploegnaam}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-black text-white font-medium rounded-md shadow-md hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
                    >
                        Update Speler
                    </button>
                </>
            )}
        </form>
    );
};


export default UpdateSpeler;
