import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import Container from '../components/login'

describe('login screen', () => {
    test('renders the logo', () => {
        const { getByAltText } = render(<Container />)
        const logo = getByAltText(/pureretail logo/i)
        expect(logo).toBeVisible()
    })
    test('renders the title', () => {
        const { getByTestId } = render(<Container />)
        const title = getByTestId('log-in')
        expect(title).toBeVisible()
    })
    test('renders the phone number input', () => {
        const { getByPlaceholderText } = render(<Container />)
        const phoneNumberField = getByPlaceholderText(/phone number/i)
        expect(phoneNumberField).toBeVisible()
        expect(phoneNumberField).toBeEnabled()
    })
    test('renders the password input', () => {
        const { getByPlaceholderText } = render(<Container />)
        const passwordField = getByPlaceholderText(/^password$/i)
        expect(passwordField).toBeVisible()
        expect(passwordField).toBeEnabled()
    })
    test('renders the log in button', () => {
        const { getByRole } = render(<Container />)
        const registerButton = getByRole("button")
        expect(registerButton).toBeVisible()
        expect(registerButton).toBeEnabled()
    })
    test('renders the register link', () => {
        const { getByText } = render(<Container />)
        const registerLink = getByText(/register/)
        expect(registerLink).toBeVisible()
    })
    test('renders the forgot password link', () => {
        const { getByText } = render(<Container />)
        const forgotPasswordLink = getByText(/forgot/i)
        expect(forgotPasswordLink).toBeVisible()
    })
})
