import React from "react";
import "@testing-library/jest-dom/extend-expect";
import renderWithProviders from "../utlities/renderWithProviders";
import CategoryPicker from "../components/categories/CategoryPicker";

describe("Category Picker in Store-NavBar", () => {
  test("renders the All button", () => {
    const { getByTestId } = renderWithProviders(<CategoryPicker />);
    const allButton = getByTestId("optionWrapper");
    expect(allButton).toBeVisible();
    expect(allButton).toBeEnabled();
  });

  test("renders optionWrapper, main div, for CategoryPicker", () => {
    const { getByTestId } = renderWithProviders(<CategoryPicker />)
    expect(getByTestId('optionWrapper')).toBeVisible()
  })

  test('renders new button for Category option', () => {
      const { getByTestId } = renderWithProviders(<CategoryPicker /> )
      const newCatButton = getByTestId('categoryButton')
      expect(newCatButton).toBeVisible()
      expect(newCatButton).toBeEnabled()
  })
  
});
