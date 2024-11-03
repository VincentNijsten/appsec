const getAllCoaches = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/coaches", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const CoachService = {
    getAllCoaches,
};

export default CoachService;