import React from "react";
import { fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderWithProviders from "../utlities/renderWithProviders";

import Nav from "../components/Navbar";
import OrderContainer from "../components/Orders/Orders";
import StoreContainer from "../components/inventory/inventory";
import AccountContainer from "../components/SellerAccount/SellerAccount";
import ProfileContainer from "../components/ProfileView";

describe("Navbar", () => {
  test("renders the 'Home' title", () => {
    const { getByText } = renderWithProviders(<Nav />);
    const element = getByText("Home");
    expect(element).toBeVisible();
  });
  test("renders the 'Store' title", () => {
    const { getByText } = renderWithProviders(<Nav />);
    const element = getByText("Store");
    expect(element).toBeVisible();
  });
  test("renders the 'Account' title", () => {
    const { getByText } = renderWithProviders(<Nav />);
    const element = getByText("Account");
    expect(element).toBeVisible();
  });
  test("renders the 'Profile' title", () => {
    const { getByText } = renderWithProviders(<Nav />);
    const element = getByText("Profile");
    expect(element).toBeVisible();
  });
  test("renders the 'Create Product' button", () => {
    const { getByText } = renderWithProviders(<Nav />);
    const element = getByText("Create Product");
    expect(element).toBeVisible();
  });
  test("renders the 'View Store' button", () => {
    const { getByText } = renderWithProviders(<Nav />);
    const element = getByText("View Store");
    expect(element).toBeVisible();
  });
  test("renders homepage after clicking 'Home' link in navbar", async () => {
    const { findByText } = renderWithProviders(<OrderContainer />);
    const { getByText } = renderWithProviders(<Nav />);

    // Click button
    fireEvent.click(getByText("Home"));

    // Wait for page to update with query text
    const items = await findByText("Current Orders");
    expect(items).toBeVisible();
  });
});
