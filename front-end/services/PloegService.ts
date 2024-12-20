import { Ploeg } from "@/types";
import { get } from "http";

const getAllPloegen = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/ploegen", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
};

const getSpelersInPloeg = async (ploegnaam: string) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/ploegen/${ploegnaam}/spelers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
};

const addPloeg = async (ploeg: { ploegnaam: string; niveau: string; coachLicentie?: string | null }) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/ploegen", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(ploeg),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een fout opgetreden.');
    }

    return response;
};
const deletePloeg = async (ploegnaam: string) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ploegen/${ploegnaam}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || 'Er is een fout opgetreden.');
    }

    return response;
};

const updatePloeg = async (ploegnaam: string, ploegData: Partial<Ploeg>) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ploegen/${ploegnaam}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(ploegData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || 'Er is een fout opgetreden.');
    }

    return response.json();
};

const getPloegByNaam = async (ploegnaam: string) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    const response =  await fetch(process.env.NEXT_PUBLIC_API_URL + `/ploegen/${ploegnaam}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
    console.log("response ServiceWorker",response);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || 'Er is een fout opgetreden.');
    }

    return response;
}

const getPloegByCoachLicenties = async (coachLicentie: string) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;
    const response =  await fetch(process.env.NEXT_PUBLIC_API_URL + `/ploegen/coach/${coachLicentie}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
    console.log("response ServiceWorker",response);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || 'Er is een fout opgetreden.');
    }

    return response;
}


const PloegenService = {
    getAllPloegen,
    getSpelersInPloeg,
    addPloeg,
    deletePloeg,
    updatePloeg,
    getPloegByNaam,
    getPloegByCoachLicenties
};

export default PloegenService;