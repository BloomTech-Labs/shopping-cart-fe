import React from "react";
import { fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderWithProviders from "../../utlities/renderWithProviders";

import Container from "../../components/Orders/Orders";
import OrderContainer from "../../components/Orders/OrderDetailsView";

describe("dashboard", () => {
  test("renders the 'Order #' title", () => {
    const { getByText } = renderWithProviders(<Container />);
    const element = getByText(/Order #/i);
    expect(element).toBeVisible();
  });
  test("renders the 'Customer Name' title", () => {
    const { getByText } = renderWithProviders(<Container />);
    const element = getByText(/Customer Name/i);
    expect(element).toBeVisible();
  });
  test("renders the 'Total Items' title", () => {
    const { getByText } = renderWithProviders(<Container />);
    const element = getByText(/Total Items/i);
    expect(element).toBeVisible();
  });
  test("renders the 'Status' title", () => {
    const { getByText } = renderWithProviders(<Container />);
    const element = getByText(/Status/i);
    expect(element).toBeVisible();
  });
  test("renders the 'Date' title", () => {
    const { getByText } = renderWithProviders(<Container />);
    const element = getByText(/Date/i);
    expect(element).toBeVisible();
  });
  test("renders the 'Actions' title", () => {
    const { getByText } = renderWithProviders(<Container />);
    const element = getByText(/Actions/i);
    expect(element).toBeVisible();
  });
});
