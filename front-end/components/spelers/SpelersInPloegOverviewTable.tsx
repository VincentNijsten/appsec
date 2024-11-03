// voor /ploegen/{ploegnaam}/spelers
// klikken op table van ploeg en alle spelers komen in een nieuwe table

import { Ploeg, Speler } from "@/types";
import React from "react";

type Props = {
    ploeg: Ploeg;
}

const SpelerInPloegOverviewTable: React.FC<Props> = ({ ploeg }) => {
    return (
        <>
            {ploeg && ploeg.spelers &&(
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Naam</th>
                            <th>spelerlicentie</th>
                            <th>leeftijd</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ploeg.spelers.map((speler: Speler) => (
                        <tr key={speler.spelerlicentie}>
                            <td>{speler.naam}</td>
                            <td>{speler.spelerlicentie}</td>
                            <td>{speler.leeftijd}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};
export default SpelerInPloegOverviewTable;