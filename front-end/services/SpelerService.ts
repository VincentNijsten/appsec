// SpelerService.ts
const getAllSpelers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/spelers", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const SpelerService = {
    getAllSpelers,
};

export default SpelerService;
