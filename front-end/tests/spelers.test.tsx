import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import SpelerOverviewTable from "@/components/spelers/SpelersOverviewTable"; 
import { Speler } from "@/types"; 
import test from "node:test";

const spelersMock = [
    { naam: "John Doe", spelerLicentie: "12345", leeftijd: 25, ploegNaam: "Team A" },
    { naam: "Jane Smith", spelerLicentie: "67890", leeftijd: 30, ploegNaam: "Team B" },
];

test("renders SpelerOverviewTable with players", () => {
    render(<SpelerOverviewTable spelers={spelersMock} />);

    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/12345/)).toBeInTheDocument();
    expect(screen.getByText(/25/)).toBeInTheDocument();

    expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();
    expect(screen.getByText(/67890/)).toBeInTheDocument();
    expect(screen.getByText(/30/)).toBeInTheDocument();
});

test("renders correct number of player rows", () => {
    render(<SpelerOverviewTable spelers={spelersMock} />);

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(spelersMock.length + 1);
});


test("renders SpelerOverviewTable without players", () => {
    render(<SpelerOverviewTable spelers={[]} />);

    const tableElement = screen.queryByRole("table");
    expect(tableElement).not.toBeInTheDocument();
});