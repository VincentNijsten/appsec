import { useEffect, useState } from "react";
import { Coach } from "@/types";
import CoachService from "@/services/CoachService";
import Head from "next/head";
import Header from "@/components/header";
import CoachOverviewTable from "@/components/coaches/CoachOverviewTable";
import styles from "@/styles/Home.module.css"

const Coaches: React.FC = () => {
    const [coaches, setCoaches] = useState<Array<Coach>>();

    const getCoaches = async () => {
        const response = await CoachService.getAllCoaches();
        const coachess = await response.json();
        setCoaches(coachess);
    };

    useEffect(() => {
        getCoaches()
        },
        []
    )

    return (
        <>
            <Head>
                <title>Coaches</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-cneter align-items-center">
                <h1 className={styles.tabletitle}>Coaches</h1>
                <section>
                    { coaches &&
                        <CoachOverviewTable coaches={coaches}/>
                    }
                </section>
            </main>
        </>
    );
};
export default Coaches;