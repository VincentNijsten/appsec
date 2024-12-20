import React from "react";
import { Ploeg, Speler } from "@/types";

type Props = {
    ploeg: Ploeg;
    spelers: Array<Speler>;
};

const SpelerInPloegOverviewTable: React.FC<Props> = ({ ploeg, spelers }: Props) => {
    return (
        <div className="container mx-auto overflox-x-auto max-w-4xl mx-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white shadow-md rounded-md">
                <thead className="bg-black text-white">
                    <tr>
                        <th
                            scope="col"
                            className="px-4 py-2 text-left text-sm font-medium text-white uppercase tracking-wider"
                        >
                            Naam
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-2 text-left text-sm font-medium text-white uppercase tracking-wider"
                        >
                            Licentie
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {spelers
                        .filter(speler => speler.ploegNaam === ploeg.ploegnaam)
                        .map(speler => (
                            <tr
                                key={speler.spelerLicentie}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {speler.naam}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {speler.spelerLicentie}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default SpelerInPloegOverviewTable;
