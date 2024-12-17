import React, { useState, useEffect } from "react";
import ZaalService from "@/services/ZaalService";
import { Zaal } from "@/types";

type Props = {
    onZaalUpdated: (zaal: Zaal) => void;
    zalen: Array<Zaal>;
};

const UpdateZaal: React.FC<Props> = ({ onZaalUpdated, zalen }: Props) => {
    const [selectedZaal, setSelectedZaal] = useState<string>("");
    const [zaalData, setZaalData] = useState<Partial<Zaal>>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (selectedZaal) {
            const zaal = zalen.find(zaal => zaal.naam === selectedZaal);
            if (zaal) {
                setZaalData(zaal);
            }
        }
    }, [selectedZaal, zalen]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedZaal(e.target.value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setZaalData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedZaal) {
            setError("Selecteer alstublieft een zaal.");
            return;
        }

        try {
            const updatedZaal = await ZaalService.updateZaal(selectedZaal, zaalData);
            onZaalUpdated(updatedZaal);
            setSelectedZaal("");
            setZaalData({});
            setError(null);
        } catch (error) {
            setError("Er is een fout opgetreden bij het bijwerken van de zaal.");
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
            {selectedZaal && (
                <>
                    <div>
                        <label htmlFor="address">Adres:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={zaalData.address || ""}
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
                            checked={zaalData.beschikbaarheid || false}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Update Zaal</button>
                </>
            )}
        </form>
    );
};

export default UpdateZaal;