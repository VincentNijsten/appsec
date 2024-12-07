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

const deleteSpeler = async (spelerLicentie: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/spelers/${spelerLicentie}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een fout opgetreden.');
    }

    return response.json();
};



const updateSpeler = async (spelerLicentie: string, spelerData: Partial<Speler>) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/spelers/${spelerLicentie}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spelerData),
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
    deleteSpeler,
    updateSpeler,
};

export default SpelerService;
