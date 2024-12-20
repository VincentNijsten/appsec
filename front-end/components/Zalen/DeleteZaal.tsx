import React, { useState } from "react";
import ZaalService from "@/services/ZaalService";
import { Zaal } from "@/types";

type Props = {
    onZaalDeleted: (naam: string) => void;
    zalen: Array<Zaal>;
};

const DeleteZaal: React.FC<Props> = ({ onZaalDeleted, zalen = [] }: Props) => {
    const [selectedZaal, setSelectedZaal] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedZaal(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedZaal) {
            setError("Selecteer alstublieft een zaal.");
            return;
        }

        try {
            await ZaalService.deleteZaal(selectedZaal);
            onZaalDeleted(selectedZaal);
            setSelectedZaal("");
            setError(null);
        } catch (error) {
            setError("Er is een fout opgetreden bij het verwijderen van de zaal.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <label htmlFor="zaal" className="block text-gray-700">Zaal:</label>
                <select
                    id="zaal"
                    name="zaal"
                    value={selectedZaal}
                    onChange={handleSelectChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                >
                    <option value="">Selecteer een zaal</option>
                    {zalen.map(zaal => (
                        <option key={zaal.naam} value={zaal.naam}>
                            {zaal.naam}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-indigo-600">
                Verwijder Zaal
            </button>
        </form>
    );
};

export default DeleteZaal;
