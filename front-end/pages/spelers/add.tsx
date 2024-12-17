import React, { useEffect, useState } from "react";
import { Ploeg, Speler } from "@/types";
import Header from "@/components/header";
import SpelerService from "@/services/SpelerService";
import AddSpeler from "@/components/spelers/AddSpeler";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import PloegenService from "@/services/PloegService";

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
            
            {error && <p className={styles.error}>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className={styles.tabletitle}>Add Speler</h1>
                <section className={styles.formcontainer}>
                    <AddSpeler onSpelerAdded={handleSpelerAdded} ploegen={ploegen} />
                </section>
            </main>
        </>
    );
};

export default Add;