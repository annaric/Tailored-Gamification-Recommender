import { render, screen } from "@testing-library/react";
import App from "./App";
import {describe, expect, test} from '@jest/globals';
import '@testing-library/jest-dom';



describe("App Component", () => {
  test("renders recommend button", () => {
    render(<App />);
    const buttonElement = screen.getByText("Recommend");
    expect(buttonElement).not.toBeNull();
    expect(buttonElement).toBeTruthy();
  });
});