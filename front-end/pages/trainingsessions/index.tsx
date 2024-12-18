import Header from "@/components/header";
import TrainingSessionService from "@/services/TrainingSessionService";
import { Ploeg, TrainingSession, Zaal } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import TrainingSessionsOverviewTable from "@/components/TrainingSessions/TrainingSessionsOverviewTable";
import AddTrainingSession from "@/components/TrainingSessions/AddTrainingSession";
import PloegService from "@/services/PloegService";
import ZaalService from "@/services/ZaalService";

const TrainingSessions: React.FC = () => {
    const [trainingSessions, setTrainingSessions] = useState<Array<TrainingSession>>([]);
    const [error, setError] = useState<string | null>(null);
    const [ploegen, setPloegen] = useState<Array<Ploeg>>([]);
    const [zalen, setZaal] = useState<Array<Zaal>>([]);


    const getTrainingSessions = async () => {
        try {
            const response = await TrainingSessionService.getAllTrainingSessions();
            const trainingSessionss = await response.json();
            setTrainingSessions(trainingSessionss);
        } catch (error) {
            setError("Er is een fout opgetreden bij het ophalen van de trainingssessies.");
        }
    };

    const getPloegen = async () => {
        try {
            const response = await PloegService.getAllPloegen();
            const ploegen = await response.json();
            setPloegen(ploegen);
        } catch (error) {
            setError("Er is een fout opgetreden bij het ophalen van de ploegen.");
        }
    };

    const getZalen = async () => {
        try {
            const response = await ZaalService.getAllZalen();
            const zalen = await response.json();
            setZaal(zalen);
        } catch (error) {
            setError("Er is een fout opgetreden bij het ophalen van de zalen.");
        }
    };


    const handleTrainingSessionAdded = (trainingSession: TrainingSession) => {
        setTrainingSessions(prevTrainingSessions => [...prevTrainingSessions, trainingSession]);
    };
    
    useEffect(() => {
        getTrainingSessions(),
        getPloegen(),
        getZalen()
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
                        <TrainingSessionsOverviewTable trainingsessions={trainingSessions} ploegen={ploegen}/>
                    }
                </section>
                <section className={styles.formcontainer}>
                    <h3>Voeg een nieuwe trainingssessie toe</h3>
                    <AddTrainingSession onTrainingSessionAdded={handleTrainingSessionAdded} ploegenLijst={ploegen} zalenLijst={zalen} />
                </section>
            </main>
        </>
    );
};

export default TrainingSessions;