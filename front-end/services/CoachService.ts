import { Coach } from "@/types";

const getAllCoaches = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/coaches", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
};

const addCoach = async (coach: Coach) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/coaches", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(coach),
    });

    

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een onbekende fout opgetreden.');
    }

    return response;
};

const deleteCoach = async (coachlicentie: string) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/coaches/${coachlicentie}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
};

const updateCoach = async (coachLicentie: string, coachData: Partial<Coach>) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coaches/${coachLicentie}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(coachData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een fout opgetreden.');
    }

    return response.json();
};


const getCoachByLicentie = async (coachLicentie: string) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/coaches/${coachLicentie}`, {
        method: "GET",
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
}


const getCoachByNaam = async (coachNaam: string) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/coaches/${coachNaam}`, {
        method: "GET",
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
}


const CoachService = {
    getAllCoaches,
    addCoach,
    deleteCoach,
    updateCoach,
    getCoachByLicentie,
    getCoachByNaam
};

export default CoachService;