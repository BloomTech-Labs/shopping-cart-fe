import React from "react";
import "@testing-library/jest-dom/extend-expect";
import renderWithProviders from "../utlities/renderWithProviders";
import CategoryPicker from "../components/categories/CategoryPicker";
import { exportAllDeclaration } from "@babel/types";

describe("Category Picker in Store-NavBar", () => {
  test("renders the All button", () => {
    const { getByRole } = renderWithProviders(<CategoryPicker />);
    const allButton = getByRole("button");
    expect(allButton).toBeVisible();
    expect(allButton).toBeEnabled();
  });

  test("renders optionWrapper, main div, for CategoryPicker", () => {
    const 
  }
});
