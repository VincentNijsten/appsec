import React, { useEffect, useState } from "react";
import { Coach, Ploeg } from "@/types";
import Header from "@/components/header";
import PloegService from "@/services/PloegService";
import AddPloeg from "@/components/ploegen/AddPloeg";
import Head from "next/head";
import CoachService from "@/services/CoachService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Add: React.FC = () => {
    const [ploegen, setPloegen] = useState<Array<Ploeg>>([]);
    const [error, setError] = useState<string | null>(null);
    const [coaches, setCoaches] = useState<Array<Coach>>([]);

    const handlePloegAdded = (ploeg: Ploeg) => {
        setPloegen(prevPloegen => [...prevPloegen, ploeg]);
    };


    const getCoaches = async () => {
       try {
         const response = await CoachService.getAllCoaches();
         const coaches = await response.json();
         setCoaches(coaches);
       } catch (error) {
        setError("Er is een fout opgetreden bij het ophalen van de coaches.");
        
       }
    }

    useEffect(() => {
        getCoaches();
    })

    return (
        <>
            <Head>
                <title>Add Ploeg</title>
            </Head>
            <Header />
            
            {error && <p>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-4xl font-bold text-center text-gray-800 mt-8">Add Ploeg</h1>
                <section>
                    <AddPloeg onPloegAdded={handlePloegAdded} coaches={coaches} />
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