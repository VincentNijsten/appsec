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
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Verwijder een speler</h2>
            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Select veld */}
                <div>
                    <label htmlFor="speler" className="block text-sm font-medium text-gray-700">
                        Speler
                    </label>
                    <select
                        id="speler"
                        name="speler"
                        value={selectedSpeler}
                        onChange={handleSelectChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        required
                    >
                        <option value="">Selecteer een speler</option>
                        {spelers.map((speler) => (
                            <option key={speler.spelerLicentie} value={speler.spelerLicentie}>
                                {speler.naam}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Verwijderknop */}
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white font-medium py-2 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Verwijder Speler
                </button>
            </form>
        </div>
    );
};

export default DeleteSpeler;
