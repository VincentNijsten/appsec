import React from "react";
import { Speler } from "@/types";

type Props = {
    spelers: Array<Speler>
};

const SpelerOverviewTable: React.FC<Props> = ({spelers}: Props) => {
    return (
        <>
            {spelers &&(
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Naam</th>
                            <th scope="col">Spelerlicentie</th>
                            <th scope="col">Leeftijd</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spelers.map((speler, index) => (
                            <tr key={index}>
                                <td>{speler.naam}</td>
                                <td>{speler.spelerLicentie}</td>
                                <td>{speler.leeftijd}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default SpelerOverviewTable;