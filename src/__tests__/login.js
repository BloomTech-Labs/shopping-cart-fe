import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import Login from '../components/login'

describe('login screen', () => {
    test('renders the logo', () => {
        const { getByAltText } = render(<Login />)
        const logo = getByAltText(/pureretail logo/i)
        expect(logo).toBeVisible()
    })
    // Need to add a test for the title, but this is difficult because
    // 'Log in' appears in two places on the page (title and button). Need
    // to add a data-testid to the title to resolve this.
    //
    // test('renders the title', () => {
    //     const { getByText } = render(<Login />)
    //     const title = getByText(/^log in$/i)
    //     expect(title).toBeVisible()
    // })
    test('renders the phone number input', () => {
        const { getByPlaceholderText } = render(<Login />)
        const phoneNumberField = getByPlaceholderText(/phone number/i)
        expect(phoneNumberField).toBeVisible()
        expect(phoneNumberField).toBeEnabled()
    })
    test('renders the password input', () => {
        const { getByPlaceholderText } = render(<Login />)
        const passwordField = getByPlaceholderText(/^password$/i)
        expect(passwordField).toBeVisible()
        expect(passwordField).toBeEnabled()
    })
    test('renders the log in button', () => {
        const { getByRole } = render(<Login />)
        const registerButton = getByRole("button")
        expect(registerButton).toBeVisible()
        expect(registerButton).toBeEnabled()
    })
    test('renders the register link', () => {
        const { getByText } = render(<Login />)
        const registerLink = getByText(/register/)
        expect(registerLink).toBeVisible()
    })
    test('renders the forgot password link', () => {
        const { getByText } = render(<Login />)
        const forgotPasswordLink = getByText(/forgot/i)
        expect(forgotPasswordLink).toBeVisible()
    })
})
