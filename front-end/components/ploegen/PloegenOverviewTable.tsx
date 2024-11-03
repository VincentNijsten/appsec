import React from "react";
import { Ploeg } from "@/types";

type Props = {
    ploegen: Array<Ploeg>
    selectPloeg: (ploeg: Ploeg) => void;
}

const PloegenOverviewTable: React.FC<Props> = ({ploegen, selectPloeg}: Props) => {
    return (
        <>
            {ploegen && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">niveau</th>
                            <th scope="col">ploegnaam</th>
                            <th scope="col">spelers</th>
                            <th scope="col">coach</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ploegen.map((ploeg, index) => (
                            <tr key={index} onClick={() => selectPloeg(ploeg)} role="button">
                                <td>{ploeg.niveau}</td>
                                <td>{ploeg.ploegnaam}</td>
                                <td>
                                    <ul>
                                        {ploeg.spelers.map((speler) => (
                                            <li key={speler.spelerlicentie}>{speler.naam}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{ploeg.coach?.naam}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default PloegenOverviewTable;