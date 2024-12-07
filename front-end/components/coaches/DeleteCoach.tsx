import React, { useState } from "react";
import { Coach } from "@/types";
import CoachService from "@/services/CoachService";

type Props = {
    onCoachDeleted: (coachLicentie: string) => void;
    coaches: Array<Coach>;
};

const DeleteCoach: React.FC<Props> = ({ onCoachDeleted, coaches }: Props) => {
    const [coachLicentie, setCoachLicentie] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

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
        } catch (error) {
            setError("Er is een fout opgetreden bij het verwijderen van de coach.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <label htmlFor="coachLicentie">Coach:</label>
                <select
                    id="coachLicentie"
                    name="coachLicentie"
                    value={coachLicentie}
                    onChange={handleChange}
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
            <button type="submit">Verwijder Coach</button>
        </form>
    );
};

export default DeleteCoach;