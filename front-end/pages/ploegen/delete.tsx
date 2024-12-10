import React, { useEffect, useState } from "react";
import { Ploeg } from "@/types";
import Header from "@/components/header";
import PloegService from "@/services/PloegService";
import DeletePloeg from "@/components/ploegen/DeletePloeg";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

const Delete: React.FC = () => {
    const [ploegen, setPloegen] = useState<Array<Ploeg>>([]);
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

    const handlePloegDeleted = (ploegnaam: string) => {
        setPloegen(prevPloegen => prevPloegen.filter(ploeg => ploeg.ploegnaam !== ploegnaam));
    };

    useEffect(() => {
        getPloegen();
    }, []);

    return (
        <>
            <Head>
                <title>Delete Ploeg</title>
            </Head>
            <Header />
            
            {error && <p className={styles.error}>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className={styles.tabletitle}>Delete Ploeg</h1>
                <section className={styles.formcontainer}>
                    <DeletePloeg onPloegDeleted={handlePloegDeleted} ploegen={ploegen} />
                </section>
            </main>
        </>
    );
};

export default Delete;