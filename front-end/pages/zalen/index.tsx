import Header from "@/components/header";
import ZaalService from "@/services/ZaalService";
import { Zaal } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import ZaalOverviewTable from "@/components/Zalen/ZaalOverviewTable";
import styles from "@/styles/Home.module.css"
import AddZaal from "@/components/Zalen/AddZaal";
import DeleteZaal from "@/components/Zalen/DeleteZaal";
import UpdateZaal from "@/components/Zalen/UpdateZaal";


const Zalen: React.FC = () => {
    const [zalen, setZalen] = useState<Array<Zaal>>([]);
    const [error, setError] = useState<string | null>(null);

    const getZalen = async () => {
        try {
            const response = await ZaalService.getAllZalen();
            const zalenn = await response.json();
            setZalen(zalenn);
        } catch (error) {
            setError("Er is een fout opgetreden bij het ophalen van de zalen.");
        }
    };

    const handleZaalAdded = (zaal: Zaal) => {
        setZalen(prevZalen => [...prevZalen, zaal]);
    };

    const handleZaalUpdated = (updatedZaal: Zaal) => {
        setZalen(prevZalen => prevZalen.map(zaal => zaal.naam === updatedZaal.naam ? updatedZaal : zaal));
    };

    const handleZaalDeleted = (naam: string) => {
        setZalen(prevZalen => prevZalen.filter(zaal => zaal.naam !== naam));
    };

   
    
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
                <section className={styles.tables}>
                    { zalen &&
                        <ZaalOverviewTable zalen={zalen} />
                    }
                </section>

                <section className={styles.formcontainer}>
                    <h3>Voeg een nieuwe zaal toe</h3>
                    <AddZaal onZaalAdded={handleZaalAdded} />
                </section>

                <section className={styles.formcontainer}>
                    <h3>Update een zaal</h3>
                    <UpdateZaal onZaalUpdated={handleZaalUpdated} zalen={zalen} />
                </section>
                <section className={styles.formcontainer}>
                    <h3>Verwijder een zaal</h3>
                    <DeleteZaal onZaalDeleted={handleZaalDeleted} zalen={zalen} />
                </section>
            </main>
        </>
    );
};
export default Zalen;