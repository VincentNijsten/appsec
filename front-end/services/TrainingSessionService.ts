const getAllTrainingSessions = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/training-sessions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
};

const TrainingSessionService = {
    getAllTrainingSessions,
}

export default TrainingSessionService;