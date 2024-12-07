import { Zaal } from "@/types";

const getAllZalen = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/zalen", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};
const addZaal = async (zaal: { naam: string; address: string; beschikbaarheid: boolean }) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/zalen", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(zaal),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een fout opgetreden.');
    }

    return response.json();
};

const updateZaal = async (naam: string, zaalData: Partial<Zaal>) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/zalen/${naam}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(zaalData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een fout opgetreden.');
    }

    return response.json();
};

const deleteZaal = async (naam: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/zalen/${naam}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een fout opgetreden.');
    }

    return response.json();
};


const ZaalService = {
    getAllZalen,
    addZaal,
    updateZaal,
    deleteZaal
};

export default ZaalService;