import Head from "next/head";
import { useState, useEffect } from "react";
import { Speler } from "@/types";
import Header from "@/components/header";
import SpelersOvervieuwTable from "@/components/spelers/SpelersOverviewTable";
import SpelerService from "@/services/SpelerService";
import styles from "@/styles/Home.module.css"


const Spelers: React.FC = () => {
    const [spelers, setSpelers] = useState<Array<Speler>>();

    const getSpelers = async () => {
        const response = await SpelerService.getAllSpelers();
        const spelerss = await response.json();
        setSpelers(spelerss)
    }
    
    useEffect(() => {
        getSpelers()
        },
        []
    )

    return (
        <>
            <Head>
                <title>Spelers</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-cneter align-items-center">
                <h1 className={styles.tabletitle}>Spelers</h1>
                <section>
                    { spelers &&
                        <SpelersOvervieuwTable spelers={spelers}/>
                    }
                </section>
            </main>
        </>
    );
};

export default Spelers;