import React, { useContext, useEffect, useState } from "react";
import { Coach } from "@/types";
import Header from "@/components/header";
import CoachService from "@/services/CoachService";
import CoachOverviewTable from "@/components/coaches/CoachOverviewTable";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const Overview: React.FC = () => {

    // alle coaches
    const getCoaches = async () => {
        const response = await CoachService.getAllCoaches();

        if (!response.ok) {
            throw new Error("Failed to fetch coahes.")
        }

        const coaches = await response.json();
        return { coaches }
    };

    const {data, isLoading, error} = useSWR("coaches", getCoaches);

    useInterval(() => {
        mutate("coaches", getCoaches());
    }, 5000);

    return (
        <>
            <Head>
                <title>Coaches Overview</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-4xl font-bold text-center text-gray-800 mt-8 mb-4">Coaches</h1>
                <section>
                    {error && <div className="text-red-800">{error}</div>}
                    {isLoading && <p>Loading...</p>}
                    {data && 
                        <CoachOverviewTable coaches={data.coaches} 
                    />}
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

export default Overview;