import React, { useEffect, useState } from "react";
import { Coach, Ploeg } from "@/types";
import Header from "@/components/header";
import PloegService from "@/services/PloegService";
import AddPloeg from "@/components/ploegen/AddPloeg";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import CoachService from "@/services/CoachService";

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
            
            {error && <p className={styles.error}>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className={styles.tabletitle}>Add Ploeg</h1>
                <section className={styles.formcontainer}>
                    <AddPloeg onPloegAdded={handlePloegAdded} coaches={coaches} />
                </section>
            </main>
        </>
    );
};

export default Add;