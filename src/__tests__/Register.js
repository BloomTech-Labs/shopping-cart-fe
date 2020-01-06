import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import Register from '../components/register'

describe('login screen', () => {
    test('renders the logo', () => {
        const { getByAltText } = render(<Register />)
        const logo = getByAltText(/pureretail logo/i)
        expect(logo).toBeVisible()
    })
    test('renders the title', () => {
        const { getByText } = render(<Register />)
        const title = getByText(/register new/i)
        expect(title).toBeVisible()
    })
    test('renders the phone number input', () => {
        const { getByPlaceholderText } = render(<Register />)
        const phoneNumberField = getByPlaceholderText(/phone number/i)
        expect(phoneNumberField).toBeVisible()
        expect(phoneNumberField).toBeEnabled()
    })
    test('renders the password input', () => {
        const { getByPlaceholderText } = render(<Register />)
        const passwordField = getByPlaceholderText(/^password$/i)
        expect(passwordField).toBeVisible()
        expect(passwordField).toBeEnabled()
    })
    test('renders the confirm password input', () => {
        const { getByPlaceholderText } = render(<Register />)
        const confirmPasswordField = getByPlaceholderText(/confirm password/i)
        expect(confirmPasswordField).toBeVisible()
        expect(confirmPasswordField).toBeEnabled()
    })
    test('renders the register button', () => {
        const { getByRole } = render(<Register />)
        const registerButton = getByRole("button")
        expect(registerButton).toBeVisible()
        expect(registerButton).toBeEnabled()
    })
    test('renders the login link', () => {
        const { getByText } = render(<Register />)
        const loginLink = getByText("login")
        expect(loginLink).toBeVisible()
    })
})
