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

    const getSpelers = async () => {
        const response = await SpelerService.getAllSpelers();
        const spelerss = await response.json();
        setSpelers(spelerss);
    };

    const handleAddSpeler = async (e: React.FormEvent) => {
        e.preventDefault();
        await SpelerService.addSpeler(newSpeler);
        getSpelers(); // Refresh the list of players
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
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className={styles.tabletitle}>Spelers</h1>
                <section>
                    {spelers && <SpelersOvervieuwTable spelers={spelers} />}
                </section>
                <section>
                    <h2>Voeg een nieuwe speler toe</h2>
                    <form onSubmit={handleAddSpeler}>
                        <div>
                            <label>Naam:</label>
                            <input
                                type="text"
                                value={newSpeler.naam}
                                onChange={(e) => setNewSpeler({ ...newSpeler, naam: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Spelerlicentie:</label>
                            <input
                                type="text"
                                value={newSpeler.spelerlicentie}
                                onChange={(e) => setNewSpeler({ ...newSpeler, spelerlicentie: e.target.value })}
                            />
                        </div>
                        <div>
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
