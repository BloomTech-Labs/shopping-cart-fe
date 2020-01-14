import React from 'react' 
import '@testing-library/jest-dom/extend-expect'
import renderWithProviders from '../../utlities/renderWithProviders'

import Container from '../../components/createStore/addLogo'

describe('add logo screen', () => {
    test('renders the title', () => {
        const { getByText } = renderWithProviders(<Container />)
        const title = getByText(/upload store/i)
        expect(title).toBeVisible()
    })
    test('renders the upload store component', () => {
        const { getByText } = renderWithProviders(<Container />)
        const description = getByText(/store logo/i)
        expect(description).toBeVisible()
    })
    test('renders give your store a name', () => {
        const { getByText } = renderWithProviders(<Container />)
        const title = getByText(/give your store/i)
        expect(title).toBeVisible()
    })
    test('renders the currency input', () => {
        const { getByPlaceholderText } = renderWithProviders(<Container />)
        const inputfield = getByPlaceholderText(/my store's name is/i)
        expect(inputfield).toBeVisible()
        expect(inputfield).toBeEnabled()
    })
    test('renders the done button', () => {
        const { getByText } = renderWithProviders(<Container />)
        const button = getByText(/done/i)
        expect(button).toBeVisible()
        expect(button).toBeEnabled()
    })
})