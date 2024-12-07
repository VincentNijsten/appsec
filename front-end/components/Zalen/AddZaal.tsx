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
            onZaalAdded(addedZaal);
            setNewZaal({ naam: "", address: "", beschikbaarheid: false });
            setError(null);
        } catch (error) {
            setError("Er is een fout opgetreden bij het toevoegen van de zaal.");
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
                    value={newZaal.naam}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="address">Adres:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={newZaal.address}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="beschikbaarheid">Beschikbaarheid:</label>
                <input
                    type="checkbox"
                    id="beschikbaarheid"
                    name="beschikbaarheid"
                    checked={newZaal.beschikbaarheid}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Voeg Zaal Toe</button>
        </form>
    );
};

export default AddZaal;