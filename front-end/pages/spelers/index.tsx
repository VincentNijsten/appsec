import React, { useEffect, useState } from "react";
import { Speler } from "@/types";
import Header from "@/components/header";
import SpelersOvervieuwTable from "@/components/spelers/SpelersOverviewTable";
import SpelerService from "@/services/SpelerService";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

const Spelers: React.FC = () => {
    const [spelers, setSpelers] = useState<Array<Speler>>([]);
    const [newSpeler, setNewSpeler] = useState<Speler>({ naam: "", spelerlicentie: "", leeftijd: 0 });
    const [error, setError] = useState<string | null>(null);

    const getSpelers = async () => {
        const response = await SpelerService.getAllSpelers();
        const spelerss = await response.json();
        setSpelers(spelerss);
    };

    const handleAddSpeler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSpeler.naam || !newSpeler.spelerlicentie || !newSpeler.leeftijd) {
            setError("Vul alstublieft alle velden in.");
            return;
        }

        await SpelerService.addSpeler(newSpeler);
        setError(null);
        getSpelers();
    };



    useEffect(() => {
        getSpelers();
    }, []);

    return (
        <>
            <Head>
                <title>Spelers</title>
            </Head>
            <Header />
            
            {error && <p className={styles.error}>{error}</p>} { }

            <main className="d-flex flex-column justify-content-cneter align-items-center">
                <h1 className={styles.tabletitle}>Spelers</h1>
                <section className={styles.tables}>
                    {spelers && <SpelersOvervieuwTable spelers={spelers} />}
                </section>
                <section className={styles.formcontainer}>
                    <h3>Voeg een nieuwe speler toe</h3>
                    <form onSubmit={handleAddSpeler}>
                        <div className={styles.formGroup}>
                            <label>Naam:</label>
                            <input
                                type="text"
                                value={newSpeler.naam}
                                onChange={(e) => setNewSpeler({ ...newSpeler, naam: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Spelerlicentie:</label>
                            <input
                                type="text"
                                value={newSpeler.spelerlicentie}
                                onChange={(e) => setNewSpeler({ ...newSpeler, spelerlicentie: e.target.value })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Leeftijd:</label>
                            <input
                                type="number"
                                value={newSpeler.leeftijd}
                                onChange={(e) => setNewSpeler({ ...newSpeler, leeftijd: parseInt(e.target.value) })}
                            />
                        </div>
                        <button type="submit">Voeg Speler Toe</button>
                    </form>
                </section>
            </main>
        </>
    );
};

export default Spelers;