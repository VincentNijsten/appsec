import React, { useState } from "react";
import { Ploeg, Speler } from "@/types";
import SpelerService from "@/services/SpelerService";
import { useRouter } from "next/router";

type Props = {
    onSpelerAdded: (speler: Speler) => void;
    ploegen: Array<Ploeg>;
};

const AddSpeler: React.FC<Props> = ({ onSpelerAdded, ploegen }: Props) => {
    const [newSpeler, setNewSpeler] = useState<Speler>({ naam: "", spelerLicentie: "", leeftijd: 0, ploegNaam: "" });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setNewSpeler((prevState) => ({
            ...prevState,
            [name]: name === "leeftijd" ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSpeler.naam || !newSpeler.spelerLicentie || !newSpeler.leeftijd || !newSpeler.ploegNaam) {
            setError("Vul alstublieft alle velden in.");
            return;
        }

        try {
            const addedSpeler = await SpelerService.addSpeler(newSpeler);
            const added = await addedSpeler.json();
            console.log(added.message);
            if(added.message){
                throw new Error(added.message);

            }
            onSpelerAdded(added);
            setNewSpeler({ naam: "", spelerLicentie: "", leeftijd: 0, ploegNaam: "" });
            setError(null);
            router.push("/spelers/overview");
        } catch (error) {
            if(error instanceof Error){
                setError(error.message);
            }
            else{
                setError("An unknown error occurred");
            }        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Voeg een nieuwe speler toe</h2>
            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Naam */}
                <div>
                    <label htmlFor="naam" className="block text-sm font-medium text-gray-700">
                        Naam
                    </label>
                    <input
                        type="text"
                        id="naam"
                        name="naam"
                        value={newSpeler.naam}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        required
                    />
                </div>

                {/* Speler Licentie */}
                <div>
                    <label htmlFor="spelerLicentie" className="block text-sm font-medium text-gray-700">
                        Speler Licentie
                    </label>
                    <input
                        type="text"
                        id="spelerLicentie"
                        name="spelerLicentie"
                        value={newSpeler.spelerLicentie}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        required
                    />
                </div>

                {/* Leeftijd */}
                <div>
                    <label htmlFor="leeftijd" className="block text-sm font-medium text-gray-700">
                        Leeftijd
                    </label>
                    <input
                        type="number"
                        id="leeftijd"
                        name="leeftijd"
                        value={newSpeler.leeftijd}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        required
                    />
                </div>

                {/* Ploeg */}
                <div>
                    <label htmlFor="ploegnaam" className="block text-sm font-medium text-gray-700">
                        Ploeg
                    </label>
                    <select
                        id="ploegnaam"
                        name="ploegnaam"
                        value={newSpeler.ploegNaam || ""}
                        onChange={(e) =>
                            setNewSpeler((prevState) => ({
                                ...prevState,
                                ploegNaam: e.target.value,
                            }))
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        required
                    >
                        <option value="">Selecteer een ploeg</option>
                        {ploegen.map((ploeg) => (
                            <option key={ploeg.ploegnaam} value={ploeg.ploegnaam}>
                                {ploeg.ploegnaam}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-black text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Voeg Speler Toe
                </button>
            </form>
        </div>
    );
};

export default AddSpeler;
