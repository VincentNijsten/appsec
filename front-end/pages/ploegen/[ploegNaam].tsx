// pages/[ploegNaam]/index.tsx
import Header from "@/components/header";
import PloegDetails from "@/components/ploegen/ploegDetails";
import CoachService from "@/services/CoachService";
import PloegService from "@/services/PloegService";
import SpelerService from "@/services/SpelerService";
import { Ploeg, Speler, Coach } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PloegByName = () => {
  const [ploeg, setPloeg] = useState<Ploeg | null>(null);
  const [spelers, setSpelers] = useState<Speler[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);

  const router = useRouter();
  const { ploegNaam } = router.query;

  const getPloegByName = async () => {
    if (ploegNaam) {
      const ploegResponse = await PloegService.getPloegByNaam(ploegNaam as string);
      const ploegData = await ploegResponse.json();
      setPloeg(ploegData);
    }
  };

  const getSpelers = async () => {
    const spelersResponse = await SpelerService.getAllSpelers(); 
    const spelersData = await spelersResponse.json();
    setSpelers(spelersData);
  };

  const getCoaches = async () => {
    const coachesResponse = await CoachService.getAllCoaches(); 
    const coachesData = await coachesResponse.json();
    setCoaches(coachesData);
  };

  useEffect(() => {
    getPloegByName();
    getSpelers();
    getCoaches();
  }, [ploegNaam]);

  return (
    <>
      <Head>
        <title>Ploeg Details</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Ploeg Details</h1>
        {ploeg && (
          <section>
            <PloegDetails ploeg={ploeg} spelers={spelers} coaches={coaches} />
          </section>
        )}
      </main>
    </>
  );
};

export default PloegByName;