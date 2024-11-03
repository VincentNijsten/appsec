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
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/coaches", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(coach),
    });
};

const deleteCoach = async (coachlicentie: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/coaches/${coachlicentie}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    });
};

const CoachService = {
    getAllCoaches,
    addCoach,
    deleteCoach,
};

export default CoachService;