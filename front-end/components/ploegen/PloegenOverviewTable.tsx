import React from "react";
import { Ploeg, Speler, Coach } from "@/types";

type Props = {
    ploegen: Array<Ploeg>;
    spelers?: Array<Speler>;
    coaches?: Array<Coach>;
    selectPloeg: (ploeg: Ploeg) => void;
};

const PloegenOverviewTable: React.FC<Props> = ({ ploegen, spelers = [], coaches = [], selectPloeg }: Props) => {
    console.log("Ploegen:", ploegen);
    console.log("Spelers:", spelers);
    console.log("Coaches:", coaches);
    return (
        <>
            {ploegen && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Niveau</th>
                            <th scope="col">Ploegnaam</th>
                            <th scope="col">Spelers</th>
                            <th scope="col">Coach</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ploegen.map((ploeg, index) => (
                            <tr key={index} onClick={() => selectPloeg(ploeg)} role="button">
                                <td>{ploeg.niveau}</td>
                                <td>{ploeg.ploegnaam}</td>
                                <td>
                                    <ul>
                                        {spelers
                                            .filter(speler => speler.ploegNaam === ploeg.ploegnaam)
                                            .map(speler => (
                                                <li key={speler.spelerLicentie}>{speler.naam}</li>
                                            ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
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
            )}
        </>
    );
};

export default PloegenOverviewTable;