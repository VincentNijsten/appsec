import React, { useState } from "react";
import { Ploeg } from "@/types";
import Header from "@/components/header";
import PloegenOverviewTable from "@/components/ploegen/PloegenOverviewTable";
import PloegService from "@/services/PloegService";
import SpelerInPloegOverviewTable from "@/components/spelers/SpelersInPloegOverviewTable";
import Head from "next/head";
import CoachService from "@/services/CoachService";
import SpelerService from "@/services/SpelerService";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserService from "@/services/UserService";

const Ploegen: React.FC = () => {
    const [selectedPloeg, setSelectedPloeg] = useState<Ploeg | null>(null);


    const getPloegen = async () => {
        try {
            const loggedInUser  = sessionStorage.getItem('loggedInUser');
            const user = JSON.parse(loggedInUser  || '{}');
            const isPlayer = user.role === 'player';
            const isCoach = user.role === 'coach';
            const isAdmin = user.role === 'admin';
    
            let response;
            if(isAdmin){
                response = await PloegService.getAllPloegen();
                const data = await response.json();
                return { ploegen: data };
    
            }else {               
                const playerUser = await UserService.getUserByEmail(user.email);
                const playerUserData = await playerUser.json();
                console.log("user is ",playerUserData);
                let playerData;
                let ploegnaam;
                if(isPlayer){
                const player = await SpelerService.getSpelerByName(playerUserData?.user.firstName);
                playerData = await player.json();
                console.log("speler is", playerData);  
                ploegnaam = playerData.speler.ploegNaam; 

                }
                if(isCoach){
                    const coach = await CoachService.getCoachByNaam(playerUserData?.user.firstName);
                    playerData = await coach.json();
                    console.log("coach is", playerData);
                    const licentie = playerData.coachLicentie; 
                    console.log("licentie is", licentie, "type:",typeof(licentie));
                    const ploegData = await PloegService.getPloegByCoachLicenties(licentie);
                    const ploegDataJson = await ploegData.json();
                    console.log("ploeg data is", ploegDataJson);
                    ploegnaam = ploegDataJson.ploeg.ploegnaam;


                    console.log ("ploegnaam is", ploegnaam);

                }
               
                response = await PloegService.getPloegByNaam(ploegnaam);
             
                const data = await response.json();
                console.log("team data :",data);
    
                return { ploegen: [data.ploeg] };
            }
          
    
    
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
              } else {
                throw new Error('An unknown error occurred');
              }
            
        }




   
    };

    const getSpelers = async () => {
        const response = await SpelerService.getAllSpelers();

        if (!response.ok) {
            throw new Error("Failed to fetch teams.");
        }

        const spelers = await response.json();
        return { spelers };
    };

    const getCoaches = async () => {
        const response = await CoachService.getAllCoaches();

        if (!response.ok) {
            throw new Error("Failed to fetch teams.");
        }

        const coaches = await response.json();
        return { coaches };
    };

    const { data: dataPloegen, isLoading: isLoadingPloegen, error: errorPloegen } = useSWR("ploegen", getPloegen);
    const { data: dataSpelers, isLoading: isLoadingSpelers, error: errorSpelers } = useSWR("spelers", getSpelers);
    const { data: dataCoaches, isLoading: isLoadingCoaches, error: errorCoaches } = useSWR("coaches", getCoaches);


    const handleSelectedPloeg = (ploeg: Ploeg) => {
        setSelectedPloeg(ploeg);
    };

    useInterval(() => {
        mutate("ploegen", getPloegen())
        mutate("spelers", getSpelers())
        mutate("coaches", getCoaches())
    }, 5000)

    return (
        <>
            <Head>
                <title>Ploegen</title>
            </Head>
            <Header />
            

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-4xl font-bold text-center text-gray-800 mt-8 mb-4">Ploegen</h1>
                <section>
                    {errorPloegen && <div className="text-red-800">Error loading teams.</div>}
                    {isLoadingPloegen && <p>Loading...</p>}
                    {dataPloegen &&
                        <PloegenOverviewTable
                            ploegen={dataPloegen?.ploegen || []}
                            spelers={dataSpelers?.spelers || []}
                            coaches={dataCoaches?.coaches || []}
                            selectPloeg={handleSelectedPloeg}
                        />
                    }
                    {selectedPloeg && (
                        <div>
                            <h2 className="text-3xl font-bold text-center text-gray-800 mt-8 mb-4">Spelers in {selectedPloeg.ploegnaam}</h2>
                            <SpelerInPloegOverviewTable 
                                ploeg={selectedPloeg} 
                                spelers={dataSpelers?.spelers} 
                            />
                        </div>
                    )}
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

export default Ploegen;