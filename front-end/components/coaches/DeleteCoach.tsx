import React, { useState } from "react";
import { Coach } from "@/types";
import CoachService from "@/services/CoachService";
import { useRouter } from "next/router";

type Props = {
    onCoachDeleted: (coachLicentie: string) => void;
    coaches: Array<Coach>;
};

const DeleteCoach: React.FC<Props> = ({ onCoachDeleted, coaches }: Props) => {
    const [coachLicentie, setCoachLicentie] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCoachLicentie(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!coachLicentie) {
            setError("Selecteer alstublieft een coach.");
            return;
        }

        try {
            await CoachService.deleteCoach(coachLicentie);
            onCoachDeleted(coachLicentie);
            setCoachLicentie("");
            setError(null);
            router.push("/coaches/overview");
        } catch (err) {
            setError("Er is een fout opgetreden bij het verwijderen van de coach.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <label htmlFor="coachLicentie" className="block text-gray-700 font-medium mb-2">
                    Coach:
                </label>
                <select
                    id="coachLicentie"
                    name="coachLicentie"
                    value={coachLicentie}
                    onChange={handleChange}
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
            <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
            >
                Verwijder Coach
            </button>
        </form>
    );
};

export default DeleteCoach;
