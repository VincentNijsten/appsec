import React, { useState } from "react";
import { Coach, Ploeg } from "@/types";
import PloegService from "@/services/PloegService";
import { useRouter } from "next/router";

type Props = {
    onPloegAdded: (ploeg: Ploeg) => void;
    coaches: Array<Coach>;
};

const AddPloeg: React.FC<Props> = ({ onPloegAdded, coaches }: Props) => {
    const [newPloeg, setNewPloeg] = useState<{ ploegnaam: string; niveau: string; coachLicentie?: string | null }>({
        ploegnaam: "",
        niveau: "",
        coachLicentie: null,
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewPloeg(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPloeg.ploegnaam || !newPloeg.niveau) {
            setError("Vul alstublieft alle velden in.");
            return;
        }

        try {
            const addedPloeg = await PloegService.addPloeg(newPloeg);
            const added =   await addedPloeg.json();
            if(added.message){
                throw new Error(added.message);

            }
            onPloegAdded(added);
            setNewPloeg({ ploegnaam: "", niveau: "", coachLicentie: null });
            setError(null);
            router.push("/ploegen/overview");
        } catch (error) {
            if(error instanceof Error){
                setError(error.message);
            }
            else{
                setError("An unknown error occurred");
            }         }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <label htmlFor="ploegnaam" className="block text-gray-700 font-medium mb-2">
                    Ploegnaam:
                </label>
                <input
                    type="text"
                    id="ploegnaam"
                    name="ploegnaam"
                    value={newPloeg.ploegnaam}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="niveau" className="block text-gray-700 font-medium mb-2">
                    Niveau:
                </label>
                <select
                    id="niveau"
                    name="niveau"
                    value={newPloeg.niveau}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
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
            <div className="mb-4">
                <label htmlFor="coachLicentie" className="block text-gray-700 font-medium mb-2">
                    Coach:
                </label>
                <select
                    id="coachLicentie"
                    name="coachLicentie"
                    value={newPloeg.coachLicentie || ""}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                    required
                >
                    <option value="">Selecteer een Coach</option>
                    {coaches.map(coach => (
                        <option key={coach.coachLicentie} value={coach.coachLicentie}>
                            {coach.naam}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
                Voeg Ploeg Toe
            </button>
        </form>
    );
};

export default AddPloeg;
