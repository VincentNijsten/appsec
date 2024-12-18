import React from "react";
import { Ploeg, TrainingSession } from "@/types";

type Props = {
    trainingsessions: Array<TrainingSession>
    ploegen : Array<Ploeg>
};

const TrainingSessionsOverviewTable: React.FC<Props> = ({trainingsessions}: Props) => {
    return (
        <>
            {trainingsessions &&(
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Ploegen</th>
                            <th scope="col">Zaal</th>
                            <th scope="col">Datum</th>
                            <th scope="col">Start uur</th>
                            <th scope="col">Eind uur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainingsessions.map((trainingsession, index) => (
                            <tr key={index}>
                                <td>
                                    {trainingsession.ploegen.map((ploeg, index) => (
                                        <div key={index}>{ploeg.ploegnaam}</div>
                                    ))}
                                </td>
                                <td>{trainingsession.zaalNaam}</td>
                                <td>{new Date(trainingsession.datum).toLocaleDateString()}</td>
                                <td>{trainingsession.startTijd}</td>
                                <td>{trainingsession.eindTijd}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default TrainingSessionsOverviewTable;