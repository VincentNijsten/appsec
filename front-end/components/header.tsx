import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from "react";
import { UserType } from "@/types";
import Language from './language/Language';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
    const { t } = useTranslation();

    // session storage lezen
    useEffect(() => {
        const storedUser = sessionStorage.getItem("loggedInUser");
        if (storedUser) {
            try {
                setLoggedInUser(JSON.parse(storedUser));
            } catch (error) {
                console.log("Failed to parse the user", error);
            }
        }
    }, []);

    // logout click functie
    const handleClick = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
    };

    return (
        <header className="bg-black text-white">
            <div className="container mx-auto flex flex-col items-center p-4 space-y-4">
                {/* Title in the Center */}
                <span className="text-3xl font-bold tracking-wide">VHL</span>

                {/* Navigation Menu */}
                <nav className="flex flex-wrap justify-center space-x-6">
                    <Link href="/" className="hover:text-gray-400 transition duration-300">
                        {t("header.title")}
                    </Link>

                    
                    {/* role = player*/}
                    {loggedInUser?.role === 'player' && (
                        <>
                            <Link href="/spelers/overview" className="hover:text-gray-400 transition duration-300">
                                {t("header.spelers.spelers")}
                            </Link>
                            <Link href="/ploegen/overview" className="hover:text-gray-400 transition duration-300">
                                {t("header.ploegen.ploegen")}
                            </Link>
                        </>
                    )}

                    {/* role = coach */}
                    { loggedInUser?.role === 'coach' && (
                        <>
                        {/* Seplers*/}
                            <div className="relative group">
                                <button className="hover:text-gray-400 transition duration-300">
                                    {t("header.spelers.spelers")}
                                </button>
                                <div className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:flex flex-col bg-black border border-gray-700 mt-2 rounded shadow-lg w-40">
                                    <Link href="/spelers/overview" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                        {t("header.spelers.overview")}
                                    </Link>
                                    <Link href="/spelers/add" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                        {t("header.spelers.add")}
                                    </Link>
                                </div>
                            </div>
                        {/*  Coaches */}
                            <div className="relative group">
                                <button className="hover:text-gray-400 transition duration-300">
                                    {t("header.coaches.coaches")}
                                </button>
                                <div className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:flex flex-col bg-black border border-gray-700 mt-2 rounded shadow-lg w-40">
                                    <Link href="/coaches/overview" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                        {t("header.coaches.overview")}
                                    </Link>
                                </div>
                            </div>
                        {/* Ploegen */}
                            <div className="relative group">
                                <button className="hover:text-gray-400 transition duration-300">
                                    {t("header.ploegen.ploegen")}
                                </button>
                                <div className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:flex flex-col bg-black border border-gray-700 mt-2 rounded shadow-lg w-40">
                                    <Link href="/ploegen/overview" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                        {t("header.ploegen.overview")}
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}

                    {/* role = admin */}
                    {loggedInUser?.role === 'admin' && (
                        <>
                        {/* Spelers*/}
                            <div className="relative group">
                                <button className="hover:text-gray-400 transition duration-300">
                                    {t("header.spelers.spelers")}
                                </button>
                                <div className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:flex flex-col bg-black border border-gray-700 mt-2 rounded shadow-lg w-40">
                                    <Link href="/spelers/overview" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                        {t("header.spelers.overview")}
                                    </Link>
                                    <Link href="/spelers/add" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                        {t("header.spelers.add")}
                                    </Link>
                                    <Link href="/spelers/update" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                        {t("header.spelers.update")}
                                    </Link>
                                    <Link href="/spelers/delete" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                        {t("header.spelers.delete")}
                                    </Link>
                                </div>
                            </div>
                        {/* coaches */}
                            <div className="relative group">
                                <button className="hover:text-gray-400 transition duration-300">
                                    {t("header.coaches.coaches")}
                                </button>
                                <div className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:flex flex-col bg-black border border-gray-700 mt-2 rounded shadow-lg w-40">
                                    <Link href="/coaches/overview" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                        {t("header.coaches.overview")}
                                    </Link>
                                        <>
                                            <Link href="/coaches/add" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                                {t("header.coaches.add")}
                                            </Link>
                                            <Link href="/coaches/update" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                                {t("header.coaches.update")}
                                            </Link>
                                            <Link href="/coaches/delete" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                                {t("header.coaches.delete")}
                                            </Link>
                                        </>
                                </div>
                            </div>
                        {/* ploegen */}
                            <div className="relative group">
                                <button className="hover:text-gray-400 transition duration-300">
                                    {t("header.ploegen.ploegen")}
                                </button>
                                <div className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:flex flex-col bg-black border border-gray-700 mt-2 rounded shadow-lg w-40">
                                    <Link href="/ploegen/overview" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                        {t("header.ploegen.overview")}
                                    </Link>
                                    <Link href="/ploegen/add" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                        {t("header.ploegen.add")}
                                    </Link>
                                    <Link href="/ploegen/update" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                        {t("header.ploegen.update")}
                                    </Link>
                                    <Link href="/ploegen/delete" className="px-4 py-2 hover:bg-gray-700 transition duration-300">
                                        {t("header.ploegen.delete")}
                                    </Link>
                                </div>
                            </div>
                        {/* zalen */}
                            <Link href="/zalen" className="hover:text-gray-400 transition duration-300">
                                {t("header.zalen")}
                            </Link>
                        {/* training sessions */}
                            <Link href="/trainingsessions" className="hover:text-gray-400 transition duration-300">
                                {t("header.training-sessions")}
                            </Link>
                        </>
                    )}

                    {!loggedInUser && (
                        <Link href="/login" className="hover:text-gray-400 transition duration-300">
                            {t("header.login")}
                        </Link>
                    )}

                    {loggedInUser && (
                        <a href="/login" onClick={handleClick} className="hover:text-gray-400 transition duration-300">
                            {t("header.logout")}
                        </a>
                    )}
                    <Language />
                </nav>
            </div>
        </header>
    );
};

export default Header;
