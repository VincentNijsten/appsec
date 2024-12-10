import React, { useState } from "react";
import { Coach } from "@/types";
import Header from "@/components/header";
import CoachService from "@/services/CoachService";
import AddCoach from "@/components/coaches/AddCoach";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

const Add: React.FC = () => {
    const [coaches, setCoaches] = useState<Array<Coach>>([]);
    const [error, setError] = useState<string | null>(null);

    const handleCoachAdded = (coach: Coach) => {
        setCoaches(prevCoaches => [...prevCoaches, coach]);
    };

    return (
        <>
            <Head>
                <title>Add Coach</title>
            </Head>
            <Header />
            
            {error && <p className={styles.error}>{error}</p>}

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className={styles.tabletitle}>Add Coach</h1>
                <section className={styles.formcontainer}>
                    <AddCoach onCoachAdded={handleCoachAdded} />
                </section>
            </main>
        </>
    );
};

export default Add;