import { Zaal } from "@/types";
import React from "react";

type Props = {
    zalen: Array<Zaal>
};

const ZaalOverviewTable: React.FC<Props> = ({zalen}: Props) => {
    if (!zalen) return null;
   
    return (
        <div className="container mx-auto">
            {zalen && (
                <div className="max-w-4xl mx-auto overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
                        <thead className="bg-black text-white">
                            <tr>
                                <th
                                 scope="col" 
                                 className="py-2 px-4 text-left uppercase"
                                 >
                                    Naam
                                </th>
                                <th
                                 scope="col" 
                                 className="py-2 px-4 text-left uppercase"
                                 >
                                    Adres
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {zalen.map((zaal, index) => (
                                <tr
                                 key={index} 
                                 className="even:bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <td
                                     className="py-2 px-4 text-gray-600"
                                     >
                                        {zaal.naam}
                                    </td>
                                    <td
                                     className="py-2 px-4 text-gray-600"
                                     >
                                        {zaal.address}
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

export default ZaalOverviewTable;
