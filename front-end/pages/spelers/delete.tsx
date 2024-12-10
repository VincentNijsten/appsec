import React, { useEffect, useState } from "react";
import { Speler } from "@/types";
import Header from "@/components/header";
import SpelerService from "@/services/SpelerService";
import DeleteSpeler from "@/components/spelers/DeleteSpeler";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

const Delete: React.FC = () => {
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

    const handleSpelerDeleted = (spelerLicentie: string) => {
        setSpelers(prevSpelers => prevSpelers.filter(speler => speler.spelerLicentie !== spelerLicentie));
    };

    useEffect(() => {
        getSpelers();
    }, []);

    return (
        <>
            <Head>
                <title>Delete Speler</title>
            </Head>
            <Header />
            
            {error && <p className={styles.error}>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className={styles.tabletitle}>Delete Speler</h1>
                <section className={styles.formcontainer}>
                    <DeleteSpeler onSpelerDeleted={handleSpelerDeleted} spelers={spelers} />
                </section>
            </main>
        </>
    );
};

export default Delete;