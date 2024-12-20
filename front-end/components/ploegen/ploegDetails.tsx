import React from "react";
import { Ploeg, Speler, Coach } from "@/types";

type Props = {
    ploeg: Ploeg;
    spelers: Array<Speler>;
    coaches: Array<Coach>;
};

const PloegDetails: React.FC<Props> = ({ ploeg, spelers, coaches }) => {
    const ploegSpelers = spelers.filter(speler => speler.ploegNaam === ploeg.ploegnaam);
    const ploegCoaches = coaches.filter(coach => coach.coachLicentie === ploeg.coachLicentie);
    console.log("coach:", ploegCoaches);

    return (
        <>
            {ploeg && (
                <div className="mt-4 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800">{ploeg.ploegnaam}</h2>
                    <p className="text-gray-600">Niveau: {ploeg.niveau}</p>
                    
                    <h3 className="mt-4 text-xl font-semibold">Spelers:</h3>
                    <table className="mt-2 w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 text-left text-gray-700">Naam</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ploegSpelers.length > 0 ? (
                                ploegSpelers.map(speler => (
                                    <tr key={speler.spelerLicentie} className="border-b hover:bg-gray-100">
                                        <td className="py-2 px-4">{speler.naam}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={1} className="py-2 px-4 text-center text-gray-500">Geen spelers beschikbaar</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <h3 className="mt-4 text-xl font-semibold">Coach:</h3>
                    <table className="mt-2 w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 text-left text-gray-700">Naam</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ploegCoaches.length > 0 ? (
                                ploegCoaches.map(coach => (
                                    <tr key={coach.coachLicentie} className="border-b hover:bg-gray-100">
                                        <td className="py-2 px-4">{coach.naam}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={1} className="py-2 px-4 text-center text-gray-500">Geen coach beschikbaar</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default PloegDetails;