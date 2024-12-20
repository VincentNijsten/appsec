import React, { useState, useEffect } from "react";
import { Coach } from "@/types";
import CoachService from "@/services/CoachService";
import { useRouter } from "next/router";

type Props = {
    onCoachUpdated: (coach: Coach) => void;
    coaches: Array<Coach>;
};

const UpdateCoach: React.FC<Props> = ({ onCoachUpdated, coaches }: Props) => {
    const [selectedCoach, setSelectedCoach] = useState<string>("");
    const [coachData, setCoachData] = useState<Partial<Coach>>({});
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (selectedCoach) {
            const coach = coaches.find(coach => coach.coachLicentie === selectedCoach);
            if (coach) {
                setCoachData(coach);
            }
        }
    }, [selectedCoach, coaches]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCoach(e.target.value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCoachData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCoach) {
            setError("Selecteer alstublieft een coach.");
            return;
        }

        try {
            const updatedCoach = await CoachService.updateCoach(selectedCoach, coachData);
            onCoachUpdated({ ...updatedCoach } as Coach);
            setSelectedCoach("");
            setCoachData({});
            setError(null);
            router.push("/coaches/overview");
        } catch (error) {
            setError("Er is een fout opgetreden bij het bijwerken van de coach.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <label htmlFor="coach" className="block text-gray-700 font-medium mb-2">
                    Coach:
                </label>
                <select
                    id="coach"
                    name="coach"
                    value={selectedCoach}
                    onChange={handleSelectChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                    required
                >
                    <option value="">Selecteer een coach</option>
                    {coaches.map(coach => (
                        <option key={coach.coachLicentie} value={coach.coachLicentie}>
                            {coach.naam}
                        </option>
                    ))}
                </select>
            </div>
            {selectedCoach && (
                <>
                    <div className="mb-4">
                        <label htmlFor="naam" className="block text-gray-700 font-medium mb-2">
                            Naam:
                        </label>
                        <input
                            type="text"
                            id="naam"
                            name="naam"
                            value={coachData.naam || ""}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="coachLicentie" className="block text-gray-700 font-medium mb-2">
                            Coach Licentie:
                        </label>
                        <input
                            type="text"
                            id="coachLicentie"
                            name="coachLicentie"
                            value={coachData.coachLicentie || ""}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                    >
                        Update Coach
                    </button>
                </>
            )}
        </form>
    );
};

export default UpdateCoach;
