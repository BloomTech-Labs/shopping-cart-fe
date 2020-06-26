import React from "react";
import "@testing-library/jest-dom/extend-expect";
import renderWithProviders from "../utlities/renderWithProviders";
import StoreNav from "../components/store/StoreNav";

describe("store nav bar", () => {
  test("renders About Us in the Nav Bar", () => {
    const { getByText } = renderWithProviders(<StoreNav />);
    const aboutUs = getByText(/About Us/i);
    expect(aboutUs).toBeVisible();
  });

  test("renders store logo", () => {
    const { getByTestId } = renderWithProviders(<StoreNav />);
    expect(getByTestId("storeLogo")).toBeVisible();
  });

  test("renders search-bar logo", () => {
    const { getByTestId } = renderWithProviders(<StoreNav />);
    expect(getByTestId("searchIcon")).toBeVisible();
  });

  test("renders cart icon", () => {
    const { getByAltText } = renderWithProviders(<StoreNav />);
    expect(getByAltText("Cart icon")).toBeVisible();
  });

  test("renders div that wraps Store Logo img", () => {
    const { getByTestId } = renderWithProviders(<StoreNav />);
    expect(getByTestId("navMasterContainer")).toBeVisible();
  });

  test("renders Search Bar input", () => {
    const { getByPlaceholderText } = renderWithProviders(<StoreNav />);
    const searchBarInput = getByPlaceholderText(/search/i);
    expect(searchBarInput).toBeVisible();
    expect(searchBarInput).toBeEnabled();
  });

  test("renders div that contains About Us, Badge Number, Cart Icon ", () => {
    const { getByTestId } = renderWithProviders(<StoreNav />);
    expect(getByTestId("cartAboutContainer")).toBeVisible();
  });

  test("renders div that contains Badge with Brand Color", () => {
    const { getByTestId } = renderWithProviders(<StoreNav />);
    expect(getByTestId("badge")).toBeVisible();
  });

  test('renders div that holds number of items in Cart', () => {
    const { getByTestId } = renderWithProviders(<StoreNav />)
    expect(getByTestId('badgeNumber')).toBeVisible()
  })
});
