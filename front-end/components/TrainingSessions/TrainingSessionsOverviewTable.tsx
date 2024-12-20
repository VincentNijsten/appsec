import React from "react";
import { TrainingSession } from "@/types";

type Props = {
    trainingsessions: Array<TrainingSession>;
};

const TrainingSessionsOverviewTable: React.FC<Props> = ({ trainingsessions }: Props) => {
    return (
        <>
            <div className="overflow-x-auto">
                {trainingsessions && (
                <div className="max-w-4xl mx-auto overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase">Ploeg</th>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase">Zaal</th>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase">Start uur</th>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase">Eind uur</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainingsessions.map((trainingsession, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 text-sm text-gray-700">{trainingsession.ploegNaam}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{trainingsession.zaalNaam}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{trainingsession.startTijd}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{trainingsession.eindTijd}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
        </>
    );
};

export default TrainingSessionsOverviewTable;
