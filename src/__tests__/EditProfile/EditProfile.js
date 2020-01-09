import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Container from '../../components/EditProfile/EditProfile'
import store from '../../state/store'

describe('edit profile', () => {
    test('renders the logo', () => {
        const { container, getByAltText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const logo = getByAltText(/pureretail logo/i)
        expect(logo).toBeVisible()
    })
    test('renders the title', () => {
        const { container, getByText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const element = getByText(/edit your profile/i)
        expect(element).toBeVisible()
    })
    test('renders the store owner name input', () => {
        const { container, getByPlaceholderText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const element = getByPlaceholderText(/name of store owner/i)
        expect(element).toBeVisible()
    })
    test('renders the currency input', () => {
        const { container, getByText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const element = getByText(/select your currency/i)
        expect(element).toBeInTheDocument()
    })
    test('renders the store name input', () => {
        const { container, getByPlaceholderText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const element = getByPlaceholderText(/store name/i)
        expect(element).toBeVisible()
    })
    test('renders the update button', () => {
        const { container, getByText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const element = getByText(/update/i)
        expect(element).toBeVisible()
    })
    test('renders the logout button', () => {
        const { container, getByText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const element = getByText(/logout/i)
        expect(element).toBeVisible()
    })
    test('renders the delete account link', () => {
        const { container, getByText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const element = getByText(/delete account/i)
        expect(element).toBeVisible()
    })
})