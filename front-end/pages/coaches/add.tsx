import React, { useState } from "react";
import { Coach } from "@/types";
import Header from "@/components/header";
import CoachService from "@/services/CoachService";
import AddCoach from "@/components/coaches/AddCoach";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Add: React.FC = () => {
    const [coaches, setCoaches] = useState<Array<Coach>>([]);
    const [error, setError] = useState<string | null>(null);

    const handleCoachAdded = (coach: Coach) => {
        setCoaches(prevCoaches => [...prevCoaches, coach]);
    };

    return (
        <>
            <Head>
                <title>Add Coach</title>
            </Head>
            <Header />
            
            {error && <p>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-4xl font-bold text-center text-gray-800 mt-8">Add Coach</h1>
                <section>
                    <AddCoach onCoachAdded={handleCoachAdded} />
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

export default Add;