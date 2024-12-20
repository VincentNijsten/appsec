import React from "react";
import { render, screen } from "@testing-library/react";
import CoachOverviewTable from "@/components/coaches/CoachOverviewTable"; 
import { Coach } from "@/types"; 

const coachesMock: Coach[] = [
  { naam: "John Doe", coachLicentie: "12345" },
  { naam: "Jane Smith", coachLicentie: "67890" },
];

test("renders CoachOverviewTable with coaches", () => {
  render(<CoachOverviewTable coaches={coachesMock} />);

  expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();

  expect(screen.getByText(/12345/)).toBeInTheDocument();
  expect(screen.getByText(/67890/)).toBeInTheDocument();
});


test("renders correct number of coach rows", () => {
  render(<CoachOverviewTable coaches={coachesMock} />);

  const rows = screen.getAllByRole("row");
  expect(rows.length).toBe(coachesMock.length + 1);
});


test("renders no rows when coaches prop is empty", () => {
  render(<CoachOverviewTable coaches={[]} />);

  const rows = screen.queryAllByRole("row");
  expect(rows.length).toBe(1); 
});