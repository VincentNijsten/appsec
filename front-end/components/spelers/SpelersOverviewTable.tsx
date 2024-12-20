import React from "react";
import { Speler } from "@/types";
import { useTranslation } from "next-i18next";

type Props = {
    spelers: Array<Speler>;
};

const SpelerOverviewTable: React.FC<Props> = ({ spelers }: Props) => {

    // translation
    const { t } = useTranslation("common");

    console.log(spelers);
    return (
        <div className="container mx-auto">
            {spelers && (
                <div className="overflow-x-auto max-w-4xl mx-auto ">
                    <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
                        <thead className="bg-black text-white">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-2 text-left text-sm font-medium uppercase"
                                >
                                    {t("spelers.naam")}
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-2 text-left text-sm font-medium uppercase"
                                >
                                    {t("spelers.spelerlicentie")}
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-2 text-left text-sm font-medium uppercase"
                                >
                                    {t("spelers.leeftijd")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {spelers.map((speler, index) => (
                                <tr
                                    key={index}
                                    className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        {speler.naam}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        {speler.spelerLicentie}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        {speler.leeftijd}
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


export default SpelerOverviewTable;
