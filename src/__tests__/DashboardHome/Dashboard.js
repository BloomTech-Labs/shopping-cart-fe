import React from "react";
import "@testing-library/jest-dom/extend-expect";
import renderWithProviders from "../../utlities/renderWithProviders";

import Container from "../../components/Orders/Orders";

describe("dashboard", () => {
  test("renders the 'Order #' title", () => {
    const { getByText } = renderWithProviders(<Container />);
    const element = getByText("Order #");
    expect(element).toBeVisible();
  });
  test("renders the 'Product Name' title", () => {
    const { getByText } = renderWithProviders(<Container />);
    const element = getByText("Product Name");
    expect(element).toBeVisible();
  });
  test("renders the 'Total Items' title", () => {
    const { getByText } = renderWithProviders(<Container />);
    const element = getByText("Total Items");
    expect(element).toBeVisible();
  });
  test("renders the 'Status' title", () => {
    const { getByText } = renderWithProviders(<Container />);
    const element = getByText("Status");
    expect(element).toBeVisible();
  });
  test("renders the 'Date' title", () => {
    const { getByText } = renderWithProviders(<Container />);
    const element = getByText("Date");
    expect(element).toBeVisible();
  });
});
