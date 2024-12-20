import Header from "@/components/header";
import ZaalService from "@/services/ZaalService";
import { Zaal } from "@/types";
import Head from "next/head";
import { useState } from "react";
import ZaalOverviewTable from "@/components/Zalen/ZaalOverviewTable";
import AddZaal from "@/components/Zalen/AddZaal";
import DeleteZaal from "@/components/Zalen/DeleteZaal";
import UpdateZaal from "@/components/Zalen/UpdateZaal";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";


const Zalen: React.FC = () => {
    const [zalen, setZalen] = useState<Array<Zaal>>([]);

    const getZalen = async () => {
        const response = await ZaalService.getAllZalen();

        if (!response.ok) {
            throw new Error("Failed to fetch zalen.")
        }

        const zalen = await response.json();
        return { zalen }
        
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

    const {data, isLoading, error} = useSWR("zalen", getZalen);
   
    useInterval(() => {
        mutate("zalen", getZalen())
    }, 5000)

    return (
        <>
            <Head>
                <title>Zalen</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-cneter align-items-center">
                <h1 className="text-4xl font-bold text-center text-gray-800 mt-8 mb-4">Zalen</h1>
                <section>
                    {error && <div className="text-red-800">{error}</div>}
                    {isLoading && <p>Loading...</p>}
                    {data &&
                        <ZaalOverviewTable zalen={data.zalen} />
                    }
                </section>

                <section className="pt-10">
                    <h3 className="text-3xl font-bold text-center text-gray-800 mt-8 mb-4">Voeg een nieuwe zaal toe</h3>
                    <AddZaal onZaalAdded={handleZaalAdded} />
                </section>

                <section className="pt-10">
                    <h3 className="text-3xl font-bold text-center text-gray-800 mt-8 mb-4">Update een zaal</h3>
                    <UpdateZaal onZaalUpdated={handleZaalUpdated} zalen={data?.zalen} />
                </section>
                <section className="pt-10">
                    <h3 className="text-3xl font-bold text-center text-gray-800 mt-8 mb-4">Verwijder een zaal</h3>
                    <DeleteZaal onZaalDeleted={handleZaalDeleted} zalen={data?.zalen} />
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

export default Zalen;