import Head from "next/head";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import PloegenService from "@/services/PloegService";
import PloegenOverviewTable from "@/components/ploegen/PloegenOverviewTable";
import { Ploeg } from "@/types";

const Ploegen: React.FC = () => {
    const [ploegen, setPloegen] = useState<Array<Ploeg>>();

    const getPloegen = async () => {
        const response = await PloegenService.getAllPloegen();
        const ploegenn = await response.json();
        setPloegen(ploegenn);
    };

    useEffect(() => {
        getPloegen()
        },
        []
    );

    return (
        <>
            <Head>
                <title>Ploegen</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-cneter align-items-center">
                <h1>Ploegen</h1>
                <section>
                    { ploegen &&
                        <PloegenOverviewTable ploegen={ploegen}/>
                    }
                </section>
            </main>
        </>
    );
};

export default Ploegen;