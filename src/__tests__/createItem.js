import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import Container from '../components/CreateItem'

describe('login screen', () => {
    test('renders the title', () => {
        const { getByText } = render(<Container />)
        const title = getByText(/upload new/i)
        expect(title).toBeVisible()
    })
    test('renders the upload photos button', () => {
        const { getByText } = render(<Container />)
        const element = getByText(/upload photos/i)
        expect(element).toBeVisible()
        expect(element).toBeEnabled()
    })
    test('renders the name field', () => {
        const { getByPlaceholderText } = render(<Container />)
        const element = getByPlaceholderText(/name/i)
        expect(element).toBeVisible()
        expect(element).toBeEnabled()
    })
    test('renders the description field', () => {
        const { getByPlaceholderText } = render(<Container />)
        const element = getByPlaceholderText(/description/i)
        expect(element).toBeVisible()
        expect(element).toBeEnabled()
    })
    test('renders the price field', () => {
        const { getByPlaceholderText } = render(<Container />)
        const element = getByPlaceholderText(/price/i)
        expect(element).toBeVisible()
        expect(element).toBeEnabled()
    })
    test('renders the stock field', () => {
        const { getByPlaceholderText } = render(<Container />)
        const element = getByPlaceholderText(/stock/i)
        expect(element).toBeVisible()
        expect(element).toBeEnabled()
    })
    test('renders the done button', () => {
        const { getByText } = render(<Container />)
        const element = getByText(/done/i)
        expect(element).toBeVisible()
        expect(element).toBeEnabled()
    })
    test('renders the cancel link', () => {
        const { getByText } = render(<Container />)
        const element = getByText(/cancel/i)
        expect(element).toBeVisible()
    })
})