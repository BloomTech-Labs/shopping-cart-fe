import React from "react";
import "@testing-library/jest-dom/extend-expect";
import renderWithProviders from "../utlities/renderWithProviders";
import SaveCart from '../components/saveCart/saveCart'

describe('Save Cart', () => {
    test('renders Wrapper div', () => {
        const { getByTestId } = renderWithProviders(<SaveCart />)
        expect(getByTestId('saveCartWrapper')).toBeVisible()
    })
    test('renders Inner className', () => {
        const { getByTestId } = renderWithProviders(<SaveCart />)
        expect(getByTestId('saveCartInner')).toBeVisible()
    })
    test('renders Checkout className', () => {
        const { getByTestId } = renderWithProviders(<SaveCart />)
        expect(getByTestId('saveCartCheckout')).toBeVisible()
    })
    test('renders Order className', () => {
        const { getByTestId } = renderWithProviders(<SaveCart />)
        expect(getByTestId('saveCartOrder')).toBeVisible()
    })
    test('renders Order Summary text', () => {
        const { getByText } = renderWithProviders(<SaveCart />)
        const title = getByText(/Order Summary/i)
        expect(title).toBeVisible();
    })
    test('renders Summary className', () => {
        const { getByTestId } = renderWithProviders(<SaveCart />)
        expect(getByTestId('saveCartSummary')).toBeVisible()
    })

    test('renders Lower className', () => {
        const { getByTestId } = renderWithProviders(<SaveCart />)
        expect(getByTestId('saveCartLower')).toBeVisible()
    })

    test('renders Lower Header id', () => {
        const { getByTestId } = renderWithProviders(<SaveCart />)
        expect(getByTestId('LowerHeader')).toBeVisible()
    })

})