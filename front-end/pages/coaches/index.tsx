import React, { useEffect, useState } from "react";
import { Coach } from "@/types";
import Header from "@/components/header";
import CoachOverviewTable from "@/components/coaches/CoachOverviewTable";
import CoachService from "@/services/CoachService";
import AddCoach from "@/components/coaches/AddCoach";
import DeleteCoach from "@/components/coaches/DeleteCoach";
import UpdateCoach from "@/components/coaches/UpdateCoach";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

const Coaches: React.FC = () => {
    const [coaches, setCoaches] = useState<Array<Coach>>([]);
    const [error, setError] = useState<string | null>(null);

    const getCoaches = async () => {
        const response = await CoachService.getAllCoaches();
        const coachess = await response.json();
        setCoaches(coachess);
    };

    const handleCoachAdded = (coach: Coach) => {
        setCoaches(prevCoaches => [...prevCoaches, coach]);
    };

    const handleCoachDeleted = (coachLicentie: string) => {
        setCoaches(prevCoaches => prevCoaches.filter(coach => coach.coachLicentie !== coachLicentie));
    };

    const handleCoachUpdated = (updatedCoach: Coach) => {
        setCoaches(prevCoaches => prevCoaches.map(coach => coach.coachLicentie === updatedCoach.coachLicentie ? updatedCoach : coach));
    };

    useEffect(() => {
        getCoaches();
    }, []);

    return (
        <>
            <Head>
                <title>Coaches</title>
            </Head>
            <Header />
            
            {error && <p className={styles.error}>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className={styles.tabletitle}>Coaches</h1>
                <section className={styles.tables}>
                    {coaches && <CoachOverviewTable coaches={coaches} />}
                </section>
                <section className={styles.formcontainer}>
                    <h3>Voeg een nieuwe coach toe</h3>
                    <AddCoach onCoachAdded={handleCoachAdded} />
                </section>
                <section className={styles.formcontainer}>
                    <h3>Verwijder een coach</h3>
                    <DeleteCoach onCoachDeleted={handleCoachDeleted} coaches={coaches} />
                </section>
                <section className={styles.formcontainer}>
                    <h3>Update een coach</h3>
                    <UpdateCoach onCoachUpdated={handleCoachUpdated} coaches={coaches} />
                </section>
            </main>
        </>
    );
};

export default Coaches;