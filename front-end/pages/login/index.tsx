import React, { useState } from "react";
import classNames from "classnames";
import Header from "@/components/header";
import { StatusMessage } from "@/types/index";
import router from "next/router";
import UserService from "@/services/UserService";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const { t } = useTranslation("common");

    const clearErrors = () => {
        setEmailError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let isValid = true;

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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();

        if (!validate()) {
            return;
        }

        const user = { email, password };
        const response = await UserService.loginUser(user);

        if (response.status === 200) {
            const user = await response.json();

            sessionStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    token: user.token,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role,
                })
            );

            setStatusMessages([
                {
                    message: "Login successful. Redirecting to homepage...",
                    type: "success",
                },
            ]);

            setTimeout(() => {
                router.push("/");
            }, 2000);
        } else {
            const errorMessage = await response.json();
            setStatusMessages([
                {
                    message: errorMessage.message,
                    type: "error",
                },
            ]);
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-md rounded px-8 py-6 max-w-md w-full">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        {t("login.login")}
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
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                {t("login.email")}
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder={t("login.placeholderEmail")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                            />
                            {emailError && (
                                <p className="text-sm text-red-600 mt-1">{emailError}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                {t("login.password")}
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder={t("login.placeholderPassword")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                            />
                            {passwordError && (
                                <p className="text-sm text-red-600 mt-1">{passwordError}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
                            >
                                {t("login.login")}
                            </button>
                        </div>
                    </form>

                    <p className="mt-4 text-sm text-center text-gray-600">
                        {t("login.account")}
                        <a
                            href="/signup"
                            className="text-black hover:underline hover:text-blue-700"
                        >
                        {t("login.register")}
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
  
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
    };
  };

export default Login
