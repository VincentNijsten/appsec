import { useEffect, useState } from "react";
import { Coach } from "@/types";
import CoachService from "@/services/CoachService";
import Head from "next/head";
import Header from "@/components/header";
import CoachOverviewTable from "@/components/coaches/CoachOverviewTable";
import styles from "@/styles/Home.module.css"

const Coaches: React.FC = () => {
    const [coaches, setCoaches] = useState<Array<Coach>>();
    const [newCoach, setNewCoach] = useState<Coach>({ naam: "", coachlicentie: "" })
    const [coachlicentieToDelete, setCoachlicentieToDelete] = useState<string>("");
    const [error, setError] = useState<string | null>(null);


    const getCoaches = async () => {
        const response = await CoachService.getAllCoaches();
        const coachess = await response.json();
        setCoaches(coachess);
    };

    const handleAddCoach = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCoach.coachlicentie || !newCoach.naam) {
            setError("Vul alstublieft alle velden in.");
            return
        }
        await CoachService.addCoach(newCoach);
        setError(null);
        getCoaches();
    };

    const handleDeleteCoach = async (e: React.FormEvent) => {
        e.preventDefault();

        await CoachService.deleteCoach(coachlicentieToDelete);
        setError(null);
        getCoaches();
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
                <section className={styles.formcontainer}>
                    <h2>Voeg een nieuwe coach toe</h2>
                    <form onSubmit={handleAddSpeler}>
                        <div className={styles.formGroup}>
                            <label>Naam:</label>
                            <input
                                type="text"
                                value={newCoach.naam}
                                onChange={(e) => setNewCoach({ ...newCoach, naam: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Coachlicentie:</label>
                            <input
                                type="text"
                                value={newCoach.coachlicentie}
                                onChange={(e) => setNewCoach({ ...newCoach, coachlicentie: e.target.value })}
                            />
                        </div>
                        <button type="submit">Voeg Coach Toe</button>
                    </form>
                </section>
                <section className={styles.formcontainer}>
                    <h3>Verwijder een coach</h3>
                    <form onSubmit={handleDeleteCoach}>
                        <div className={styles.formGroup}>
                            <label>Coachlicentie:</label>
                            <input
                                type="text"
                                value={coachlicentieToDelete}
                                onChange={(e) => setCoachlicentieToDelete(e.target.value)}
                            />
                        </div>
                        <button type="submit">Verwijder Coach</button>
                    </form>
                </section>
            </main>
        </>
    );
};
export default Coaches;