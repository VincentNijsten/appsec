import React, { useEffect, useState } from "react";
import { Ploeg, Speler, Coach } from "@/types";
import Header from "@/components/header";
import PloegenOverviewTable from "@/components/ploegen/PloegenOverviewTable";
import PloegService from "@/services/PloegService";
import AddPloeg from "@/components/ploegen/AddPloeg";
import DeletePloeg from "@/components/ploegen/DeletePloeg";
import SpelerInPloegOverviewTable from "@/components/spelers/SpelersInPloegOverviewTable";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import CoachService from "@/services/CoachService";
import SpelerService from "@/services/SpelerService";
import UpdatePloeg from "@/components/ploegen/UpdatePLoeg";

const Ploegen: React.FC = () => {
    const [ploegen, setPloegen] = useState<Array<Ploeg>>([]);
    const [spelers, setSpelers] = useState<Array<Speler>>([]);
    const [coaches, setCoaches] = useState<Array<Coach>>([]);
    const [selectedPloeg, setSelectedPloeg] = useState<Ploeg | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getPloegen = async () => {
        try {
            const response = await PloegService.getAllPloegen();
            const ploegenn = await response.json();
            setPloegen(ploegenn);
        } catch (error) {
            setError("Er is een fout opgetreden bij het ophalen van de ploegen.");
        }
    };

    const getSpelers = async () => {
        try {
            const response = await SpelerService.getAllSpelers();
            const spelerss = await response.json();
            setSpelers(spelerss);
        } catch (error) {
            setError("Er is een fout opgetreden bij het ophalen van de spelers.");
        }
    };

    const getCoaches = async () => {
        try {
            const response = await CoachService.getAllCoaches();
            const coachess = await response.json();
            setCoaches(coachess);
        } catch (error) {
            setError("Er is een fout opgetreden bij het ophalen van de coaches.");
        }
    };



    const handleSelectedPloeg = (ploeg: Ploeg) => {
        setSelectedPloeg(ploeg);
    };

    useEffect(() => {
        getPloegen();
        getSpelers();
        getCoaches();
    }, []);

    return (
        <>
            <Head>
                <title>Ploegen</title>
            </Head>
            <Header />
            
            {error && <p className={styles.error}>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className={styles.tabletitle}>Ploegen</h1>
                <section className={styles.tables}>
                    {ploegen.length > 0 && (
                        <PloegenOverviewTable ploegen={ploegen} spelers={spelers} coaches={coaches} selectPloeg={handleSelectedPloeg} />
                    )}
                    {selectedPloeg && (
                        <div>
                            <h2>Spelers in {selectedPloeg.ploegnaam}</h2>
                            <SpelerInPloegOverviewTable ploeg={selectedPloeg} spelers={spelers} />
                        </div>
                    )}
                </section>
             
               
            </main>
        </>
    );
};

export default Ploegen;