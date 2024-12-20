import React from "react";
import { Coach } from "@/types";

type Props = {
    coaches: Array<Coach>
};

const CoachOverviewTable: React.FC<Props> = ({ coaches }: Props) => {
    return (
        <>
            {coaches && (
                <div className="overflow-x-auto max-w-4xl mx-auto">
                    <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="px-4 py-2 text-left uppercase">Naam</th>
                                <th className="px-4 py-2 text-left">Coachlicentie</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coaches.map((coach, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100`}
                                >
                                    <td className="px-4 py-2 border-t border-gray-300">
                                        {coach.naam}
                                    </td>
                                    <td className="px-4 py-2 border-t border-gray-300">
                                        {coach.coachLicentie}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default CoachOverviewTable;
