import React from "react";
import "@testing-library/jest-dom/extend-expect";
import renderWithProviders from "../utlities/renderWithProviders";
import StoreNav from "../components/store/StoreNav";

describe("store nav bar", () => {
  test("renders the nav bar", () => {
    const { getByText } = renderWithProviders(<StoreNav />);
    const aboutUs = getByText(/About Us/i);
    expect(aboutUs).toBeVisible();
  });

  test('renders store logo', () => {
    const { getByTestId } = renderWithProviders(<StoreNav />)
    expect(getByTestId('storeLogo')).toBeVisible()
  })

  test('renders search-bar logo', () => {
    const { getByTestId } = renderWithProviders(<StoreNav />)
    expect(getByTestId('searchIcon')).toBeVisible()
  })

  test('renders cart icon', ()=> {
    const { getByAltText } = renderWithProviders(<StoreNav />)
    expect(getByAltText('Cart icon')).toBeVisible()
  })

});



