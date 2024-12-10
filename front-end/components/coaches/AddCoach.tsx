import React, { useState } from "react";
import { Coach } from "@/types";
import CoachService from "@/services/CoachService";
import { useRouter } from "next/router";

type Props = {
    onCoachAdded: (coach: Coach) => void;
};

const AddCoach: React.FC<Props> = ({ onCoachAdded }: Props) => {
    const [newCoach, setNewCoach] = useState<Coach>({ naam: "", coachLicentie: "" });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCoach(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCoach.naam || !newCoach.coachLicentie) {
            setError("Vul alstublieft alle velden in.");
            return;
        }

        try {
            const addedCoach = await CoachService.addCoach(newCoach);
            onCoachAdded(addedCoach);
            setNewCoach({ naam: "", coachLicentie: "" });
            setError(null);
            router.push("/coaches/overview");
        } catch (error) {
            setError("Er is een fout opgetreden bij het toevoegen van de coach.");
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
                    value={newCoach.naam}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="coachLicentie">Coach Licentie:</label>
                <input
                    type="text"
                    id="coachLicentie"
                    name="coachLicentie"
                    value={newCoach.coachLicentie}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Voeg Coach Toe</button>
        </form>
    );
};

export default AddCoach;