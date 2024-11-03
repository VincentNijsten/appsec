const getAllPloegen = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/ploegen", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
};

const getSpelersInPloeg = async (ploegnaam: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/ploegen/${ploegnaam}/spelers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const PloegenService = {
    getAllPloegen,
    getSpelersInPloeg,
};

export default PloegenService;