import Header from "@/components/header";
import TrainingSessionService from "@/services/TrainingSessionService";
import { TrainingSession } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import TrainingSessionsOverviewTable from "@/components/TrainingSessions/TrainingSessionsOverviewTable";
import AddTrainingSession from "@/components/TrainingSessions/AddTrainingSession";

const TrainingSessions: React.FC = () => {
    const [trainingSessions, setTrainingSessions] = useState<Array<TrainingSession>>([]);
    const [error, setError] = useState<string | null>(null);

    const getTrainingSessions = async () => {
        try {
            const response = await TrainingSessionService.getAllTrainingSessions();
            const trainingSessionss = await response.json();
            setTrainingSessions(trainingSessionss);
        } catch (error) {
            setError("Er is een fout opgetreden bij het ophalen van de trainingssessies.");
        }
    };
    const handleTrainingSessionAdded = (trainingSession: TrainingSession) => {
        setTrainingSessions(prevTrainingSessions => [...prevTrainingSessions, trainingSession]);
    };
    
    useEffect(() => {
        getTrainingSessions()
        },
        []
    )

    return (
        <>
            <Head>
                <title>sessions</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-cneter align-items-center">
                <h1 className={styles.tabletitle}>Sessions</h1>
                <section className={styles.tables}>
                    { trainingSessions &&
                        <TrainingSessionsOverviewTable trainingsessions={trainingSessions}/>
                    }
                </section>
                <section className={styles.formcontainer}>
                    <h3>Voeg een nieuwe trainingssessie toe</h3>
                    <AddTrainingSession onTrainingSessionAdded={handleTrainingSessionAdded} />
                </section>
            </main>
        </>
    );
};

export default TrainingSessions;