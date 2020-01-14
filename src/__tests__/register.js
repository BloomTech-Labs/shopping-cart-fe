import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import Container from '../components/register'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../state/store'

describe('register screen', () => {
    test('renders the logo', () => {
        const { container, getByAltText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const logo = getByAltText(/pureretail logo/i)
        expect(logo).toBeVisible()
    })
    test('renders the title', () => {
        const { container, getByText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const title = getByText(/register new/i)
        expect(title).toBeVisible()
    })
    test('renders the phone number input', () => {
        const { container, getByPlaceholderText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const phoneNumberField = getByPlaceholderText(/phone number/i)
        expect(phoneNumberField).toBeVisible()
        expect(phoneNumberField).toBeEnabled()
    })
    test('renders the password input', () => {
        const { container, getByPlaceholderText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const passwordField = getByPlaceholderText(/^password$/i)
        expect(passwordField).toBeVisible()
        expect(passwordField).toBeEnabled()
    })
    test('renders the confirm password input', () => {
        const { container, getByPlaceholderText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const confirmPasswordField = getByPlaceholderText(/confirm password/i)
        expect(confirmPasswordField).toBeVisible()
        expect(confirmPasswordField).toBeEnabled()
    })
    test('renders the register button', () => {
        const { container, getByRole } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const registerButton = getByRole("button")
        expect(registerButton).toBeVisible()
        expect(registerButton).toBeEnabled()
    })
    test('renders the login link', () => {
        const { container, getByText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const loginLink = getByText("login")
        expect(loginLink).toBeVisible()
    })
})
