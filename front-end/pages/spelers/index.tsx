import React, { useEffect, useState } from "react";
import { Speler, Coach } from "@/types";
import Header from "@/components/header";
import SpelersOvervieuwTable from "@/components/spelers/SpelersOverviewTable";
import SpelerService from "@/services/SpelerService";
import CoachService from "@/services/CoachService";
import AddSpeler from "@/components/spelers/AddSpeler";
import AddCoach from "@/components/coaches/AddCoach";
import DeleteSpeler from "@/components/spelers/DeleteSpeler";
import UpdateSpeler from "@/components/spelers/UpdateSpeler";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

const Spelers: React.FC = () => {
    const [spelers, setSpelers] = useState<Array<Speler>>([]);
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
                <title>Spelers en Coaches</title>
            </Head>
            <Header />
            
            {error && <p className={styles.error}>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className={styles.tabletitle}>Spelers</h1>
                <section className={styles.tables}>
                    {spelers && <SpelersOvervieuwTable spelers={spelers} />}
                </section>
                <section className={styles.formcontainer}>
                    <h3>Voeg een nieuwe speler toe</h3>
                    <AddSpeler onSpelerAdded={handleSpelerAdded} />
                </section>
                <section className={styles.formcontainer}>
                    <h3>Verwijder een speler</h3>
                    <DeleteSpeler onSpelerDeleted={handleSpelerDeleted} spelers={spelers} />
                </section>
                <section className={styles.formcontainer}>
                    <h3>Update een speler</h3>
                    <UpdateSpeler onSpelerUpdated={handleSpelerUpdated} spelers={spelers} ploegen={[]} />
                </section>
             
            </main>
        </>
    );
};

export default Spelers;