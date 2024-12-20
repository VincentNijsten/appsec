import React from "react";
import { Ploeg, TrainingSession } from "@/types";


type Props = {
    trainingsessions: Array<TrainingSession>
    
};

const TrainingSessionsOverviewTable: React.FC<Props> = ({ trainingsessions}: Props) => {
    if(!trainingsessions) return null;

    return (
        <div className="container mx-auto">
            {trainingsessions &&(
                <div className="overflow-x-auto max-w-4xl mx-auto ">
                    <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
                        <thead className="bg-black text-white">
                            <tr>
                                <th
                                 scope="col"
                                 className="px-4 py-2 text-left text-sm font-medium uppercase"

                                 >
                                    Ploegen
                                </th>
                                <th
                                 scope="col"
                                 className="px-4 py-2 text-left text-sm font-medium uppercase"
                                 >
                                    Zaal
                                </th>
                                <th
                                 scope="col"
                                 className="px-4 py-2 text-left text-sm font-medium uppercase"

                                 >
                                    Datum
                                </th>
                                <th
                                 scope="col"
                                 className="px-4 py-2 text-left text-sm font-medium uppercase"
                                 >
                                    Start uur
                                </th>
                                <th
                                 scope="col"
                                 className="px-4 py-2 text-left text-sm font-medium uppercase"

                                 >
                                    Eind uur
                                </th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainingsessions.map((trainingsession, index) => (
                            <tr
                             key={index}
                             className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                             >
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {trainingsession.ploegen.map((ploeg, index) => (
                                        <div
                                         key={index}
                                         >
                                            {ploeg.ploegnaam}
                                        </div>
                                    ))}
                                </td>      
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {trainingsession.zaalNaam}
                                </td>

                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {new Date(trainingsession.datum).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {trainingsession.startTijd}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {trainingsession.eindTijd}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        
        </div>
    );
};

export default TrainingSessionsOverviewTable;
