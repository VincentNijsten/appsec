import { Ploeg } from "@/types";

const getAllTrainingSessions = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/training-sessions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een fout opgetreden.');
    }

    return response
};

const addTrainingSession = async (trainingSession: { datum: string; startTijd: string; eindTijd: string; zaalNaam: string; ploegen: Ploeg[] }) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/training-sessions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(trainingSession),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData || 'Er is een onbekende fout opgetreden.');
    }

    return response;
};

const getTrainingSessionsByPloeg = async (ploegnaam: string) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/training-sessions/${ploegnaam}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een fout opgetreden.');
    }
    return response
};

const TrainingSessionService = {
    getAllTrainingSessions,
    addTrainingSession,
    getTrainingSessionsByPloeg
}

export default TrainingSessionService;