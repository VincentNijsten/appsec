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
            const added = await addedCoach.json();
            console.log("message" ,added.message);
            onCoachAdded(added);
            if(added.message){
                throw new Error(added.message);

            }
            setNewCoach({ naam: "", coachLicentie: "" });
            setError(null);
            router.push("/coaches/overview");
        } catch (error) {
            if(error instanceof Error){
                setError(error.message);
            }
            else{
                setError("An unknown error occurred");
            }  
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            {error && <p className="text-red-600">{error}</p>}
            <div className="mb-4">
                <label htmlFor="naam" className="block text-gray-700">Naam:</label>
                <input
                    type="text"
                    id="naam"
                    name="naam"
                    value={newCoach.naam}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="coachLicentie" className="block text-gray-700">Coach Licentie:</label>
                <input
                    type="text"
                    id="coachLicentie"
                    name="coachLicentie"
                    value={newCoach.coachLicentie}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Voeg Coach Toe
            </button>
        </form>
    );
};

export default AddCoach;
