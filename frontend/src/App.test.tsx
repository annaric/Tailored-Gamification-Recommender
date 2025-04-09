import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, expect, test } from "@jest/globals";
import "@testing-library/jest-dom";

describe("App Component", () => {
  test("renders recommend button", () => {
    render(<App />);
    const buttonElement = screen.getByText("Recommend");
    expect(buttonElement).not.toBeNull();
    expect(buttonElement).toBeTruthy();
  });

  test("renders Gender Selection", () => {
    render(<App />);
    const genderSelect = screen.getByText("Select Gender");
    const maleSelection = screen.getByText("Male");
    const femaleSelection = screen.getByText("Female");
    expect(genderSelect).not.toBeNull();
    expect(maleSelection).not.toBeNull();
    expect(femaleSelection).not.toBeNull();
    expect(genderSelect).toBeTruthy();
    expect(maleSelection).toBeTruthy();
    expect(femaleSelection).toBeTruthy();
  });

  test("checks that Element Ranking is not rendered yet", () => {
    render(<App />);
    expect(
      screen.getByText(
        "Could not get any recommendation. Did you select any parameter?",
      ),
    ).not.toBeNull();
    expect(screen.queryByText("Incentive")).toBeNull();
  });
});
