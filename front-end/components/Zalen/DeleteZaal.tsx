import React, { useState } from "react";
import ZaalService from "@/services/ZaalService";
import { Zaal } from "@/types";

type Props = {
    onZaalDeleted: (naam: string) => void;
    zalen: Array<Zaal>;
};

const DeleteZaal: React.FC<Props> = ({ onZaalDeleted, zalen }: Props) => {
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
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <label htmlFor="zaal">Zaal:</label>
                <select
                    id="zaal"
                    name="zaal"
                    value={selectedZaal}
                    onChange={handleSelectChange}
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
            <button type="submit">Verwijder Zaal</button>
        </form>
    );
};

export default DeleteZaal;