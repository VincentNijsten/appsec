import Head from "next/head";
import { useState, useEffect } from "react";
import { Speler } from "../../types";
import Header from "../../components/header";
import SpelerOvervieuwTable from "../../components/spelers/SpelerOverviewTable";
import SpelerService from "../../services/SpelerService";

const Spelers: React.FC = () => {
    const [spelers, setSpelers] = useState<Array<Speler>>();

    const getSpelers = async () => {
        const response = await SpelerService.getAllSpelers();
        const spelerss = await response.json();
        setSpelers(spelerss)
    }
    
    // Call back-end
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
                <h1>Spelers</h1>
                <section>
                    { spelers &&
                        <SpelerOvervieuwTable spelers={spelers}/>
                    }
                </section>
            </main>
        </>
    );
};

export default Spelers;