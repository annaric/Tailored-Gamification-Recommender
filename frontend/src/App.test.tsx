import { act, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { describe, expect, test } from "@jest/globals";
import "@testing-library/jest-dom";

describe("App Component", () => {
  beforeEach(() => {
    const mockData = {
      recommender: {
        gender: ["male", "female"],
      },
    };
    //mockData.recommender = {gender: ["male", "female"]}
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });
  });

  test("renders recommend button and shows Loading screen at the beginning", () => {
    render(<App />);
    const loadingScreen = screen.getByText("Loading parameters...");
    expect(loadingScreen).not.toBeNull();
    const buttonElement = screen.getByText("Recommend");
    expect(buttonElement).not.toBeNull();
    expect(buttonElement).toBeTruthy();
  });

  test("renders Gender Selection", async () => {
    await act(async () => {
      render(<App />);
    });

    await waitFor(async () => {
      const genderSelect = screen.findByText("Select gender");
      const maleSelection = screen.getByText("male");
      const femaleSelection = screen.getByText("female");
      expect(genderSelect).not.toBeNull();
      expect(genderSelect).toBeTruthy();
      expect(maleSelection).not.toBeNull();
      expect(maleSelection).toBeTruthy();
      expect(femaleSelection).not.toBeNull();
      expect(femaleSelection).toBeTruthy();
    });
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

  test("renders Gamification Elements when recommendation is called without score.scores", async () => {
    await act(async () => {
      render(<App />);
    });
    const mockRecommendationData = {
      recommendation: {
        elements: [
          {
            imageSrc: "Incentive.png",
            elementName: "Incentive",
            details: "detail text",
            score: {
              overallScore: 0.5,
            },
            standardDeviation: {
              overallStandardDeviation: 0.0,
              meanStandardDeviation: 0.1,
            },
          },
        ],
      },
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockRecommendationData),
    });
    await act(async () => {
      screen.getByText("Recommend").click();
    });
    expect(
      screen.queryByText(
        "Could not get any recommendation. Did you select any parameter?",
      ),
    ).toBeNull();
    expect(screen.queryByText("Incentive")).not.toBeNull();
    expect(screen.queryByText("Incentive")).toBeTruthy();
    expect(screen.queryByText("1")).not.toBeNull();
    expect(screen.queryByText("1")).toBeTruthy();
    expect(screen.queryByText("Overall Score: 0.500")).not.toBeNull();
    expect(screen.queryByText("Overall Score: 0.500")).toBeTruthy();
    expect(screen.queryByText("Mean Standard deviation: 0.100")).not.toBeNull();
    expect(screen.queryByText("Mean Standard deviation: 0.100")).toBeTruthy();
    expect(
      screen.queryByText("Recommender based Standard deviation: 0.000"),
    ).not.toBeNull();
    expect(
      screen.queryByText("Recommender based Standard deviation: 0.000"),
    ).toBeTruthy();
    expect(screen.queryByText("▼")).not.toBeNull();
    await act(async () => {
      screen.getByText("▼").click();
    });
    expect(screen.queryByText("detail text")).not.toBeNull();
    expect(screen.queryByText("detail text")).toBeTruthy();
  });
});

describe("Error Handling", () => {
  test("handles use effect fetch response not ok", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({}),
    });
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    await act(async () => {
      render(<App />);
    });

    expect(consoleSpy).toHaveBeenCalled();
    expect(screen.getByText("Loading parameters...")).not.toBeNull();
  });

  test("handles recommendation fetch response not ok", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    await act(async () => {
      render(<App />);
    });
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({}),
    });
    await act(async () => {
      screen.getByText("Recommend").click();
    });
    expect(consoleSpy).toHaveBeenCalled();
    expect(
      screen.queryByText(
        "Could not get any recommendation. Did you select any parameter?",
      ),
    ).not.toBeNull();
  });
});
