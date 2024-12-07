const getAllTrainingSessions = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/training-sessions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
};

const addTrainingSession = async (trainingSession: { datum: string; startTijd: string; eindTijd: string; zaalnaam: string; ploegnaam: string }) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/training-sessions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trainingSession),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een fout opgetreden.');
    }

    return response.json();
};

const TrainingSessionService = {
    getAllTrainingSessions,
    addTrainingSession
}

export default TrainingSessionService;