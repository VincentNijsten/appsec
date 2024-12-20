import React, { useEffect, useState } from "react";
import { Speler } from "@/types";
import Header from "@/components/header";
import SpelerService from "@/services/SpelerService";
import Head from "next/head";
import SpelerOverviewTable from "@/components/spelers/SpelersOverviewTable";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import { useTranslation } from "next-i18next";


const Overview: React.FC = () => {

    // translation
    const { t } = useTranslation("common");

    // alle spelers
    const getSpelers = async () => {
        const response = await SpelerService.getAllSpelers();

        if (!response.ok) {
            throw new Error("Failed to fetch players.")
        }

        const players = await response.json();
        return { players }
    };

    const {data, isLoading, error} = useSWR("players", getSpelers);

    useInterval(() => {
        mutate("players", getSpelers())
    }, 5000)

    return (
        <>
            <Head>
                <title>Spelers Overview</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-4xl font-bold text-center text-gray-800 mt-8 mb-4">{t("spelers.spelers")}</h1>
                <section>
                    {error && <div className="text-red-800">{error}</div>}
                    {isLoading && <p>{t("spelers.loading")}</p>}
                    {data && 
                        <SpelerOverviewTable spelers={data.players} />
                    }
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