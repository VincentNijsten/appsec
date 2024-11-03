import { Zaal } from "@/types";
import React from "react";

type Props = {
    zalen: Array<Zaal>
};

const ZaalOverviewTable: React.FC<Props> = ({zalen}: Props) => {
    return (
        <>
            {zalen &&(
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Naam</th>
                            <th scope="col">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {zalen.map((zaal, index) => (
                            <tr key={index}>
                                <td>{zaal.naam}</td>
                                <td>{zaal.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};
export default ZaalOverviewTable;