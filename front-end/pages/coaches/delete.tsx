import React, { useEffect, useState } from "react";
import { Coach } from "@/types";
import Header from "@/components/header";
import CoachService from "@/services/CoachService";
import DeleteCoach from "@/components/coaches/DeleteCoach";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Delete: React.FC = () => {
    const [coaches, setCoaches] = useState<Array<Coach>>([]);
    const [error, setError] = useState<string | null>(null);

    const getCoaches = async () => {
        try {
            const response = await CoachService.getAllCoaches();
            const coachess = await response.json();
            setCoaches(coachess);
        } catch (error) {
            setError("Er is een fout opgetreden bij het ophalen van de coaches.");
        }
    };

    const handleCoachDeleted = (coachLicentie: string) => {
        setCoaches(prevCoaches => prevCoaches.filter(coach => coach.coachLicentie !== coachLicentie));
    };

    useEffect(() => {
        getCoaches();
    }, []);

    return (
        <>
            <Head>
                <title>Delete Coach</title>
            </Head>
            <Header />
            
            {error && <p>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-4xl font-bold text-center text-gray-800 mt-8">Delete Coach</h1>
                <section>
                    <DeleteCoach onCoachDeleted={handleCoachDeleted} coaches={coaches} />
                </section>
            </main>
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

export default Delete;