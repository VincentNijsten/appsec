import React, { useEffect, useState } from "react";
import { Coach } from "@/types";
import Header from "@/components/header";
import CoachService from "@/services/CoachService";
import CoachOverviewTable from "@/components/coaches/CoachOverviewTable";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

const Overview: React.FC = () => {
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

    useEffect(() => {
        getCoaches();
    }, []);

    return (
        <>
            <Head>
                <title>Coaches Overview</title>
            </Head>
            <Header />
            
            {error && <p className={styles.error}>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className={styles.tabletitle}>Coaches</h1>
                <section className={styles.tables}>
                    {coaches && <CoachOverviewTable coaches={coaches} />}
                </section>
            </main>
        </>
    );
};

export default Overview;