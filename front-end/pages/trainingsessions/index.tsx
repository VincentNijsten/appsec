import Header from "@/components/header";
import TrainingSessionService from "@/services/TrainingSessionService";
import { TrainingSession } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import TrainingSessionsOverviewTable from "@/components/TrainingSessions/TrainingSessionsOverviewTable";

const TrainingSessions: React.FC = () => {
    const [trainingsessions, setTrainingSessions] = useState<Array<TrainingSession>>();

    const getTrainingSessions = async () => {
        const response = await TrainingSessionService.getAllTrainingSessions();
        const trainingsessionss = await response.json();
        setTrainingSessions(trainingsessionss)
    }
    
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
                    { trainingsessions &&
                        <TrainingSessionsOverviewTable trainingsessions={trainingsessions}/>
                    }
                </section>
            </main>
        </>
    );
};

export default TrainingSessions;