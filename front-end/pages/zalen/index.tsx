import Header from "@/components/header";
import ZaalService from "@/services/ZaalService";
import { Zaal } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import ZaalOverviewTable from "@/components/Zalen/ZaalOverviewTable";
import styles from "@/styles/Home.module.css"


const Zalen: React.FC = () => {
    const [zalen, setZalen] = useState<Array<Zaal>>();

    const getZalen = async () => {
        const response = await ZaalService.getAllZalen();
        const zalenn = await response.json();
        setZalen(zalenn)
    }
    
    useEffect(() => {
        getZalen()
        },
        []
    )

    return (
        <>
            <Head>
                <title>Zalen</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-cneter align-items-center">
                <h1 className={styles.tabletitle}>Zalen</h1>
                <section>
                    { zalen &&
                        <ZaalOverviewTable zalen={zalen} />
                    }
                </section>
            </main>
        </>
    );
};
export default Zalen;