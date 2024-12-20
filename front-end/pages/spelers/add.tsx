import React, { useEffect, useState } from "react";
import { Ploeg, Speler } from "@/types";
import Header from "@/components/header";
import AddSpeler from "@/components/spelers/AddSpeler";
import Head from "next/head";
import PloegenService from "@/services/PloegService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Add: React.FC = () => {
    const [spelers, setSpelers] = useState<Array<Speler>>([]);
    const [error, setError] = useState<string | null>(null);
    const [ploegen, setPloegen] = useState<Array<Ploeg>>([]);

    const handleSpelerAdded = (speler: Speler) => {
        setSpelers(prevSpelers => [...prevSpelers, speler]);
    };

    const getPloegen = async () => {
       try {
         const response = await PloegenService.getAllPloegen();
         const ploegen = await response.json();
         setPloegen(ploegen);
       } catch (error) {
        setError("Er is een fout opgetreden bij het ophalen van de ploegen.");
        
       }
    };

    useEffect(() => {
        getPloegen()
    }, [])

    return (
        <>
            <Head>
                <title>Add Speler</title>
            </Head>
            <Header />
            
            {error && <p>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-4xl font-bold text-center text-gray-800 mt-8">Add Speler</h1>
                <section>
                    <AddSpeler onSpelerAdded={handleSpelerAdded} ploegen={ploegen} />
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