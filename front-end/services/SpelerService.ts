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
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/spelers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(speler),
    });
};

const SpelerService = {
    getAllSpelers,
    addSpeler,
};

export default SpelerService;
