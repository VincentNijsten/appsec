import React, { useEffect, useState } from "react";
import { Speler } from "@/types";
import Header from "@/components/header";
import SpelerService from "@/services/SpelerService";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import SpelerOverviewTable from "@/components/spelers/SpelersOverviewTable";

const Overview: React.FC = () => {
    const [spelers, setSpelers] = useState<Array<Speler>>([]);
    const [error, setError] = useState<string | null>(null);

    const getSpelers = async () => {
        try {
            const response = await SpelerService.getAllSpelers();
            const spelerss = await response.json();
            setSpelers(spelerss);
        } catch (error) {
            setError("Er is een fout opgetreden bij het ophalen van de spelers.");
        }
    };

    useEffect(() => {
        getSpelers();
    }, []);

    return (
        <>
            <Head>
                <title>Spelers Overview</title>
            </Head>
            <Header />
            
            {error && <p className={styles.error}>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className={styles.tabletitle}>Spelers</h1>
                <section className={styles.tables}>
                    {spelers && <SpelerOverviewTable spelers={spelers} />}
                </section>
            </main>
        </>
    );
};

export default Overview;