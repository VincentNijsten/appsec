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
    const [trainingSessions, setTrainingSessions] = useState<Array<TrainingSession>>([])
    const [ploegen, setPloegen] = useState<Array<Ploeg>>([])
    const [zalen, setZalen] = useState<Array<Zaal>>([])

    // alle training sessies
    const getTrainingSessions = async () => {
        try {
            const response = await TrainingSessionService.getAllTrainingSessions();
            if (!response.ok) {
                throw new Error("Failed to fetch training sessions");
            }
    
          
            const trainingSessions = await response.json()
            setTrainingSessions(trainingSessions)
            return { trainingSessions }
        } catch (error) {
            throw new Error("Failed to fetch training sessions")
            
        }
    };

    const getPloegen = async () => {
        try {
         const response = await PloegService.getAllPloegen();
         const ploegen = await response.json();
         setPloegen(ploegen);
         
        } catch (error) {
            throw new Error("Failed to fetch ploegen")
    
        }

    };

    const getZalen = async () => {
        try {
            const response = await ZaalService.getAllZalen();
            const zalen = await response.json();
            setZalen(zalen);
        } catch (error) {
            throw new Error("Failed to fetch zalen")
            
        }
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

    useEffect(() => {
        getTrainingSessions();
        getPloegen();
        getZalen();
      
    }, [])

    return (
        <>
            <Head>
                <title>sessions</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-cneter align-items-center">
            <h1 className="text-4xl font-bold text-center text-gray-800 mt-8 mb-4">Sessions</h1>
                <section>
                    {errorTrainingSessions && <p>{errorTrainingSessions}</p>}
                    {isLoadingTrainingSessions && <p>Loading...</p>}
                    {
                        dataTrainingSessions && <TrainingSessionsOverviewTable
                            trainingsessions={dataTrainingSessions?.trainingSessions}/>
                    }
                    
                </section>
                <section >
                    <h3 className="text-4xl font-bold text-center text-gray-800 mt-8">Voeg een nieuwe trainingssessie toe</h3>
                    <AddTrainingSession onTrainingSessionAdded={handleTrainingSessionAdded} ploegenLijst={ploegen} zalenLijst={zalen} />
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