const getAllZalen = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/zalen", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const ZaalService = {
    getAllZalen,
};

export default ZaalService;