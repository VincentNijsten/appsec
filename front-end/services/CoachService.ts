import { Coach } from "@/types";

const getAllCoaches = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/coaches", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const addCoach = async (coach: Coach) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/coaches", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(coach),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een fout opgetreden.');
    }

    return response.json();
};

const deleteCoach = async (coachlicentie: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/coaches/${coachlicentie}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    });
};

const updateCoach = async (coachLicentie: string, coachData: Partial<Coach>) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coaches/${coachLicentie}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(coachData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een fout opgetreden.');
    }

    return response.json();
};


const CoachService = {
    getAllCoaches,
    addCoach,
    deleteCoach,
    updateCoach
};

export default CoachService;