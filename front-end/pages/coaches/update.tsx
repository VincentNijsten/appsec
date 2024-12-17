import React, { useEffect, useState } from "react";
import { Coach } from "@/types";
import Header from "@/components/header";
import CoachService from "@/services/CoachService";
import UpdateCoach from "@/components/coaches/UpdateCoach";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

const Update: React.FC = () => {
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

    const handleCoachUpdated = (updatedCoach: Coach) => {
        setCoaches(prevCoaches => prevCoaches.map(coach => coach.coachLicentie === updatedCoach.coachLicentie ? updatedCoach : coach));
    };

    useEffect(() => {
        getCoaches();
    }, []);

    return (
        <>
            <Head>
                <title>Update Coach</title>
            </Head>
            <Header />
            
            {error && <p className={styles.error}>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className={styles.tabletitle}>Update Coach</h1>
                <section className={styles.formcontainer}>
                    <UpdateCoach onCoachUpdated={handleCoachUpdated} coaches={coaches} />
                </section>
            </main>
        </>
    );
};

export default Update;