import React from "react";
import { Ploeg, Speler, Coach } from "@/types";

type Props = {
    ploegen: Array<Ploeg>;
    spelers?: Array<Speler>;
    coaches?: Array<Coach>;
    selectPloeg: (ploeg: Ploeg) => void;
};

const PloegenOverviewTable: React.FC<Props> = ({ ploegen, spelers = [], coaches = [], selectPloeg }: Props) => {
    return (
        <div className="container mx-auto">
            {ploegen.length > 0 ? (
                <div className="overflow-x-auto max-w-4xl mx-auto">
                    <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="py-2 px-4 text-left font-medium uppercase">Niveau</th>
                                <th className="py-2 px-4 text-left font-medium uppercase">Ploegnaam</th>
                                <th className="py-2 px-4 text-left font-medium uppercase">Spelers</th>
                                <th className="py-2 px-4 text-left font-medium uppercase">Coach</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ploegen.map((ploeg, index) => (
                                <tr key={index} onClick={() => selectPloeg(ploeg)} className="hover:bg-gray-100 cursor-pointer">
                                    <td className="py-2 px-4">{ploeg.niveau}</td>
                                    <td className="py-2 px-4">{ploeg.ploegnaam}</td>
                                    <td className="py-2 px-4">
                                        <ul className="list-disc pl-5">
                                            {spelers
                                                .filter(speler => speler.ploegNaam === ploeg.ploegnaam)
                                                .map(speler => (
                                                    <li key={speler.spelerLicentie}>{speler.naam}</li>
                                                ))}
                                        </ul>
                                    </td>
                                    <td className="py-2 px-4">
                                        <ul className="list-disc pl-5">
                                            {coaches
                                                .filter(coach => coach.coachLicentie === ploeg.coachLicentie)
                                                .map(coach => (
                                                    <li key={coach.coachLicentie}>{coach.naam}</li>
                                                ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-600">Geen ploegen beschikbaar.</p>
            )}
        </div>
    );
};

export default PloegenOverviewTable;
