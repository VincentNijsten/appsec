import React, { useState } from "react";
import classNames from "classnames";
import Header from "@/components/header";
import router from "next/router";
import UserService from "@/services/UserService";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Role, User } from "@/types";
import { StatusMessage } from "@/types/index";


const LoginRegister: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<Role>('player')

    const [firstNameError, setFirstNameError] = useState<string | null>(null);
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    
    const { t } = useTranslation("common");

    // Clear errors
    const clearErrors = () => {
        setFirstNameError(null)
        setLastNameError(null)
        setEmailError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    // validate 
    const validate = (): boolean => {
        let isValid = true;

        if (!firstName || firstName.trim() === "") {
            setFirstNameError("Email is required");
            isValid = false;
        }
        
        if (!lastName || lastName.trim() === "") {
            setLastNameError("Email is required");
            isValid = false;
        }
        if (!email || email.trim() === "") {
            setEmailError("Email is required");
            isValid = false;
        }

        if (!password || password.trim() === "") {
            setPasswordError("Password is required");
            isValid = false;
        }

        return isValid;
    };

    // Submit handler
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
    
        if (!validate()) {
            return;
        }
    
        try {   
            // Voeg gebruiker toe als er geen bestaande gebruiker is
            await UserService.addUser({ firstName, lastName, email, password, role });
    
            // Navigeer of herlaad
            router.push("/login");

        } catch (error: any) {
            setStatusMessages([
                { message: "Er is een fout opgetreden.", type: "error" },
            ]);
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded px-8 py-6 max-w-md w-full">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Registreer
                    </h1>

                    {statusMessages.length > 0 && (
                        <div className="mb-4">
                            <ul className="space-y-2">
                                {statusMessages.map(({ message, type }, index) => (
                                    <li
                                        key={index}
                                            className={classNames("text-sm px-4 py-2 rounded", {
                                                "bg-red-100 text-red-800": type === "error",
                                                "bg-green-100 text-green-800": type === "success",
                                            })}
                                    >
                                        {message}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Voornaam */}
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Voornaam
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="Voornaam"
                                value={firstName}
                                onChange={(e) =>
                                    setFirstName(e.target.value)
                                }
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                            />
                            {firstNameError && (
                                <p className="text-sm text-red-600 mt-1">{firstNameError}</p>
                            )}
                        </div>

                        {/* Achternaam */}
                        <div>
                            <label
                                htmlFor="lastName"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Achternaam
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Achternaam"
                                value={lastName}
                                onChange={(e) =>
                                    setLastName(e.target.value)
                                }
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                            />
                            {lastNameError && (
                                <p className="text-sm text-red-600 mt-1">{lastNameError}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                E-mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="E-mailadres"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                            />
                            {emailError && (
                                <p className="text-sm text-red-600 mt-1">{emailError}</p>
                            )}
                        </div>

                        {/* Wachtwoord */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Wachtwoord
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Wachtwoord"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                            />
                            {passwordError && (
                                <p className="text-sm text-red-600 mt-1">{passwordError}</p>
                            )}
                        </div>

                        {/* Rol */}
                        <div>
                            <label
                                htmlFor="role"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Rol
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={role}
                                onChange={(e) =>
                                    setRole(e.target.value as Role)
                                }
                                className="w-full px-3 py-2 border rounded bg-white focus:outline-none focus:ring focus:ring-blue-200"
                            >
                                <option value="user">Speler</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
                            >
                                Registreer
                            </button>
                        </div>
                    </form>

                    <p className="mt-4 text-sm text-center text-gray-600">
                        Heb je al een account?
                        <a
                            href="/login"
                            className="text-blue-600 hover:underline"
                        >
                            Log hier in
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default LoginRegister;
