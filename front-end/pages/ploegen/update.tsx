import React, { useEffect, useState } from "react";
import { Coach, Ploeg } from "@/types";
import Header from "@/components/header";
import PloegService from "@/services/PloegService";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import UpdatePloeg from "@/components/ploegen/UpdatePLoeg";
import CoachService from "@/services/CoachService";

const Update: React.FC = () => {
    const [ploegen, setPloegen] = useState<Array<Ploeg>>([]);
    const [error, setError] = useState<string | null>(null);
    const [coaches, setCoaches] = useState<Array<Coach>>([]);

    const getPloegen = async () => {
        try {
            const response = await PloegService.getAllPloegen();
            const ploegenn = await response.json();
            setPloegen(ploegenn);
        } catch (error) {
            setError("Er is een fout opgetreden bij het ophalen van de ploegen.");
        }
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

    const handlePloegUpdated = (updatedPloeg: Ploeg) => {
        setPloegen(prevPloegen => prevPloegen.map(ploeg => ploeg.ploegnaam === updatedPloeg.ploegnaam ? updatedPloeg : ploeg));
    };

    useEffect(() => {
        getPloegen(),
        getCoaches()
    }, []);

    return (
        <>
            <Head>
                <title>Update Ploeg</title>
            </Head>
            <Header />
            
            {error && <p className={styles.error}>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className={styles.tabletitle}>Update Ploeg</h1>
                <section className={styles.formcontainer}>
                    <UpdatePloeg onPloegUpdated={handlePloegUpdated} ploegen={ploegen} coaches={coaches}/>
                </section>
            </main>
        </>
    );
};

export default Update;