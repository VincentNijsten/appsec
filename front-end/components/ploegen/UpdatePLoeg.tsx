import React, { useState, useEffect } from "react";
import { Coach, Ploeg } from "@/types";
import PloegService from "@/services/PloegService";
import { useRouter } from "next/router";

type Props = {
    onPloegUpdated: (ploeg: Ploeg) => void;
    ploegen: Array<Ploeg>;
    coaches: Array<Coach>;
};

const UpdatePloeg: React.FC<Props> = ({ onPloegUpdated, ploegen, coaches }: Props) => {
    const [selectedPloeg, setSelectedPloeg] = useState<string>("");
    const [ploegData, setPloegData] = useState<Partial<Ploeg>>({});
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (selectedPloeg) {
            const ploeg = ploegen.find(ploeg => ploeg.ploegnaam === selectedPloeg);
            if (ploeg) {
                setPloegData(ploeg);
            }
        }
    }, [selectedPloeg, ploegen]);

    const handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void = (e) => {
        setSelectedPloeg(e.target.value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPloegData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPloeg) {
            setError("Selecteer alstublieft een ploeg.");
            return;
        }

        try {
            const updatedPloeg = await PloegService.updatePloeg(selectedPloeg, ploegData);
            onPloegUpdated(updatedPloeg);
            setSelectedPloeg("");
            setPloegData({});
            setError(null);
            router.push("/ploegen/overview");
        } catch (error) {
            setError("Er is een fout opgetreden bij het bijwerken van de ploeg.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <label htmlFor="ploeg" className="block text-sm font-medium text-gray-700">Ploeg:</label>
                <select
                    id="ploeg"
                    name="ploeg"
                    value={selectedPloeg}
                    onChange={handleSelectChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
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

            {selectedPloeg && (
                <>
                    <div className="mb-4">
                        <label htmlFor="niveau" className="block font-medium text-gray-700 mb-2">Niveau:</label>
                        <select
                            id="niveau"
                            name="niveau"
                            value={ploegData.niveau || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        >
                            <option value="">Selecteer Niveau</option>
                            <option value="Liga A">Liga A</option>
                            <option value="Nationale 1">Nationale 1</option>
                            <option value="Nationale 2">Nationale 2</option>
                            <option value="Nationale 3">Nationale 3</option>
                            <option value="Promo 1">Promo 1</option>
                            <option value="Promo 2">Promo 2</option>
                            <option value="Promo 3">Promo 3</option>
                            <option value="Promo 4">Promo 4</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="coachLicentie" className="block text-sm font-medium text-gray-700">Coach:</label>
                        <select
                            id="coachLicentie"
                            name="coachLicentie"
                            value={String(ploegData.coachLicentie) || ""}
                            onChange={handleChange}
                            className="w-full mt-2 p-2 mb-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value="">Selecteer een coach</option>
                            {coaches.map(coache => (
                                <option key={coache.coachLicentie} value={coache.naam}>
                                    {coache.naam}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                    >
                        Update Ploeg
                    </button>
                </>
            )}
        </form>
    );
};

export default UpdatePloeg;
