import React from "react";
import "@testing-library/jest-dom/extend-expect";
import renderWithProviders from "../utlities/renderWithProviders";
import SaveCart from "../components/saveCart/index";

describe("Save Cart", () => {
  test("renders components CartHeader & SaveCart", () => {
    const { getByTestId } = renderWithProviders(<SaveCart />);
    expect(getByTestId("saveCartWrapper")).toBeVisible();
  });
});
