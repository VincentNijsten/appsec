import Head from "next/head";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import PloegenService from "@/services/PloegService";
import PloegenOverviewTable from "@/components/ploegen/PloegenOverviewTable";
import { Ploeg } from "@/types";
import styles from "@/styles/Home.module.css"
import SpelerInPloegOverviewTable from "@/components/spelers/SpelersInPloegOverviewTable";

const Ploegen: React.FC = () => {
    // getAllPloegen
    const [ploegen, setPloegen] = useState<Array<Ploeg>>();
    // get Spelers in ploeg
    const [selectedPloeg, setSelectedPloeg] = useState<Ploeg | null>(null);

    const getPloegen = async () => {
        const response = await PloegenService.getAllPloegen();
        const ploegenn = await response.json();
        setPloegen(ploegenn);
    };

    const handleSelectedPloeg = (ploeg: Ploeg) => {
        setSelectedPloeg(ploeg);
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
                <h1 className={styles.tabletitle}>Ploegen</h1>
                <section>
                    { ploegen &&
                        <PloegenOverviewTable ploegen={ploegen} selectPloeg={handleSelectedPloeg} />
                    }
                    {
                        selectedPloeg && (
                            <div>
                                <h2>Spelers in {selectedPloeg.ploegnaam}</h2>
                                <SpelerInPloegOverviewTable ploeg={selectedPloeg} />
                            </div>
                        )
                    }
                </section>
            </main>
        </>
    );
};

export default Ploegen;