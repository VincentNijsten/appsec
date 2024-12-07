import React from "react";
import { Ploeg, Speler } from "@/types";

type Props = {
    ploeg: Ploeg;
    spelers: Array<Speler>;
};

const SpelerInPloegOverviewTable: React.FC<Props> = ({ ploeg, spelers }: Props) => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Naam</th>
                    <th scope="col">Licentie</th>
                </tr>
            </thead>
            <tbody>
                {spelers
                    .filter(speler => speler.ploegNaam === ploeg.ploegnaam)
                    .map(speler => (
                    <tr key={speler.spelerLicentie}>
                    <td>{speler.naam}</td>
                    <td>{speler.spelerLicentie}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SpelerInPloegOverviewTable;