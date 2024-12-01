import React from "react";
import { Coach } from "@/types";

type Props = {
    coaches: Array<Coach>
};

const CoachOverviewTable: React.FC<Props> = ({coaches}: Props) => {
    return (
        <>
            {coaches &&(
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Naam</th>
                            <th scope="col">Coachlicentie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coaches.map((coach, index) => (
                            <tr key={index}>
                                <td>{coach.naam}</td>
                                <td>{coach.coachLicentie}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};
export default CoachOverviewTable;