import { Speler } from "@/types";

const getAllSpelers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/spelers", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const addSpeler = async (speler: Speler) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/spelers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(speler),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een fout opgetreden.');
    }

    return response.json();


};

const SpelerService = {
    getAllSpelers,
    addSpeler,
};

export default SpelerService;
