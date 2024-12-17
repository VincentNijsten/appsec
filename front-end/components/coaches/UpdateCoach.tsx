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
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <label htmlFor="coach">Coach:</label>
                <select
                    id="coach"
                    name="coach"
                    value={selectedCoach}
                    onChange={handleSelectChange}
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
                    <div>
                        <label htmlFor="naam">Naam:</label>
                        <input
                            type="text"
                            id="naam"
                            name="naam"
                            value={coachData.naam || ""}
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
                            value={coachData.coachLicentie || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Update Coach</button>
                </>
            )}
        </form>
    );
};

export default UpdateCoach;