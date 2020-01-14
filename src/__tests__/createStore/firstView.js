import React from 'react' 
import '@testing-library/jest-dom/extend-expect'
import renderWithProviders from '../../utlities/renderWithProviders'

import Container from '../../components/createStore/firstView'

describe('first view screen', () => {
    test('renders the logo', () => {
        const { getByAltText } = renderWithProviders(<Container />)
        const logo = getByAltText(/pureretail logo/i)
        expect(logo).toBeVisible()
    })
    test('renders the title', () => {
        const { getByText } = renderWithProviders(<Container />)
        const title = getByText(/lets get started!/i)
        expect(title).toBeVisible()
    })
    test('renders the description', () => {
        const { getByText } = renderWithProviders(<Container />)
        const description = getByText(/you're in! let's get/i)
        expect(description).toBeVisible()
    })
    test('renders the name input', () => {
        const { getByPlaceholderText } = renderWithProviders(<Container />)
        const inputfield = getByPlaceholderText(/my name is/i)
        expect(inputfield).toBeVisible()
        expect(inputfield).toBeEnabled()
    })
    test('renders the currency input', () => {
        const { getByText } = renderWithProviders(<Container />)
        const inputfield = getByText(/and i prefer to sell in/i)
        expect(inputfield).toBeVisible()
        expect(inputfield).toBeEnabled()
    })
    test('renders the next button', () => {
        const { getByText } = renderWithProviders(<Container />)
        const button = getByText(/next/i)
        expect(button).toBeVisible()
        expect(button).toBeEnabled()
    })
})