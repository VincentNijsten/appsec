import React, { useEffect, useState } from "react";
import { Ploeg, Speler } from "@/types";
import Header from "@/components/header";
import SpelerService from "@/services/SpelerService";
import UpdateSpeler from "@/components/spelers/UpdateSpeler";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Ploegen from "../ploegen";
import PloegService from "@/services/PloegService";

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
            
            {error && <p className={styles.error}>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className={styles.tabletitle}>Update Speler</h1>
                <section className={styles.formcontainer}>
                    <UpdateSpeler onSpelerUpdated={handleSpelerUpdated} spelers={spelers} ploegen={ploegen} />
                </section>
            </main>
        </>
    );
};

export default Update;