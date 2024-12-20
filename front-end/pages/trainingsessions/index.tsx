import Header from "@/components/header";
import TrainingSessionService from "@/services/TrainingSessionService";
import { Ploeg, TrainingSession, Zaal } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import TrainingSessionsOverviewTable from "@/components/TrainingSessions/TrainingSessionsOverviewTable";
import AddTrainingSession from "@/components/TrainingSessions/AddTrainingSession";
import PloegService from "@/services/PloegService";
import ZaalService from "@/services/ZaalService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useInterval from "use-interval";
import useSWR, { mutate } from "swr";

const TrainingSessions: React.FC = () => {
    const [trainingSession, setTrainingSessions] = useState<Array<TrainingSession>>([])

    // alle training sessies
    const getTrainingSessions = async () => {
        const response = await TrainingSessionService.getAllTrainingSessions();

        if (!response.ok) {
            throw new Error("Failed to fetch training sessions")
        }

        const trainingSession = await response.json()
        return { trainingSession }
    };

    const getPloegen = async () => {
        const response = await PloegService.getAllPloegen();

        if (!response.ok) {
            throw new Error("Failed to fetch teams")
        }
            
        const ploegen = await response.json();
        return { ploegen }

    };

    const getZalen = async () => {
        const response = await ZaalService.getAllZalen();

        if (!response.ok) {
            throw new Error("Failed to fetch training sessions")
        }

        const zalen = await response.json();
        return { zalen }
    };

    const { data: dataTrainingSessions, isLoading: isLoadingTrainingSessions, error: errorTrainingSessions } = useSWR("trainingSession", getTrainingSessions);
    const { data: dataPloegen, isLoading: isLoadingPloegen, error: errorPloegen } = useSWR("ploegen", getPloegen);
    const { data: dataZalen, isLoading: isLoadingZalen, error: errorZalen } = useSWR("zalen", getZalen);


    const handleTrainingSessionAdded = (trainingSession: TrainingSession) => {
        setTrainingSessions(prevTrainingSessions => [...prevTrainingSessions, trainingSession]);
    };
    
    useInterval(() => {
        mutate("trainingSession", getTrainingSessions())
        mutate("ploegen", getPloegen())
        mutate("zalen", getZalen())
    }, 5000)

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
                    <AddTrainingSession onTrainingSessionAdded={handleTrainingSessionAdded} ploegen={ploegen} zalen={zalen} />
                </section>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default TrainingSessions;