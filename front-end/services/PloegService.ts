const getAllPloegen = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/ploegen", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
};

const PloegenService = {
    getAllPloegen,
};

export default PloegenService;