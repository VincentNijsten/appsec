import React, { useState } from "react";
import ZaalService from "@/services/ZaalService";
import { Zaal } from "@/types";

type Props = {
    onZaalAdded: (zaal: Zaal) => void;
};

const AddZaal: React.FC<Props> = ({ onZaalAdded }: Props) => {
    const [newZaal, setNewZaal] = useState<{ naam: string; address: string; beschikbaarheid: boolean }>({
        naam: "",
        address: "",
        beschikbaarheid: false,
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setNewZaal(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newZaal.naam || !newZaal.address) {
            setError("Vul alstublieft alle velden in.");
            return;
        }

        try {
            const addedZaal = await ZaalService.addZaal(newZaal);
            const added = await addedZaal.json();
            onZaalAdded(added);
            setNewZaal({ naam: "", address: "", beschikbaarheid: false });
            setError(null);
        } catch (error) {
            if(error instanceof Error){
                setError(error.message);
            }
            else{
                setError("An unknown error occurred");
            }         }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <label htmlFor="naam" className="block text-gray-700">Naam:</label>
                <input
                    type="text"
                    id="naam"
                    name="naam"
                    value={newZaal.naam}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700">Adres:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={newZaal.address}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="beschikbaarheid" className="block text-gray-700">Beschikbaarheid:</label>
                <input
                    type="checkbox"
                    id="beschikbaarheid"
                    name="beschikbaarheid"
                    checked={newZaal.beschikbaarheid}
                    onChange={handleChange}
                    className="mt-2"
                />
            </div>
            <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-indigo-600">
                Voeg Zaal Toe
            </button>
        </form>
    );
};

export default AddZaal;
