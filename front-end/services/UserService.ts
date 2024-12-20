import { User } from "@/types";

const getUserByEmail = async (email: string) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    const response =  await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/email?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Er is een fout opgetreden.');
    }

    return response;
}

const loginUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const addUser = async (user: User) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Er is een fout opgetreden")
    }

    return response.json()
};

const UserService = {
    getUserByEmail,
    loginUser,
    addUser,
};

export default UserService;