import React, { useEffect, useState } from "react";
import { Ploeg, Speler } from "@/types";
import Header from "@/components/header";
import SpelerService from "@/services/SpelerService";
import UpdateSpeler from "@/components/spelers/UpdateSpeler";
import Head from "next/head";
import PloegService from "@/services/PloegService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Update: React.FC = () => {
    const [spelers, setSpelers] = useState<Array<Speler>>([]);
    const [error, setError] = useState<string | null>(null);
    const [ploegen, setPloegen] = useState<Array<Ploeg>>([]);


    const getSpelers = async () => {
        try {
            const response = await SpelerService.getAllSpelers();
            const spelerss = await response.json();
            setSpelers(spelerss);
        } catch (error) {
            setError("Er is een fout opgetreden bij het ophalen van de spelers.");
        }
    };

    const getPloegen = async () => {
        try {
            const response = await PloegService.getAllPloegen();
            const ploegenn = await response.json();
            setPloegen(ploegenn);
        } catch (error) {
            setError("Er is een fout opgetreden bij het ophalen van de ploegen.");
        }
    };

    const handleSpelerUpdated = (updatedSpeler: Speler) => {
        setSpelers(prevSpelers => prevSpelers.map(speler => speler.spelerLicentie === updatedSpeler.spelerLicentie ? updatedSpeler : speler));
    };

    useEffect(() => {
        getSpelers();
        getPloegen();
    }, []);

    return (
        <>
            <Head>
                <title>Update Speler</title>
            </Head>
            <Header />
            
            {error && <p>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-4xl font-bold text-center text-gray-800 mt-8">Update Speler</h1>
                <section>
                    <UpdateSpeler onSpelerUpdated={handleSpelerUpdated} spelers={spelers} ploegen={ploegen} />
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

export default Update;