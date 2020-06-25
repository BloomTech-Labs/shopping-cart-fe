import React from "react";
import { fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderWithProviders from "../utlities/renderWithProviders";

import Seller from "../components/SellerAccount/SellerAccount";


describe("View of the seller account, it displays stripe connection", () => {
  test("renders the 'Account' title", () => {
    const { getByTestId } = renderWithProviders(<Seller />);
    const element = getByTestId("main");
    expect(element).toHaveTextContent("Account");
  });
  test("renders the component with 'Your Stripe ID' title", () => {
    const { getByText } = renderWithProviders(<Seller />);
    const element = getByText("Your Stripe ID");
    expect(element).toBeVisible(); 
  });
});