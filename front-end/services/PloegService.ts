import { Ploeg } from "@/types";

const getAllPloegen = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/ploegen", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
};

const getSpelersInPloeg = async (ploegnaam: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/ploegen/${ploegnaam}/spelers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const addPloeg = async (ploeg: { ploegnaam: string; niveau: string; coachLicentie?: string | null }) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/ploegen", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ploeg),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een fout opgetreden.');
    }

    return response.json();
};
const deletePloeg = async (ploegnaam: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ploegen/${ploegnaam}`, {
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

const updatePloeg = async (ploegnaam: string, ploegData: Partial<Ploeg>) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ploegen/${ploegnaam}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ploegData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een fout opgetreden.');
    }

    return response.json();
};


const PloegenService = {
    getAllPloegen,
    getSpelersInPloeg,
    addPloeg,
    deletePloeg,
    updatePloeg
};

export default PloegenService;