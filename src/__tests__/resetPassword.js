import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import Container from '../components/resetPassword'

describe('login screen', () => {
    test('renders the logo', () => {
        const { getByAltText } = render(<Container />)
        const logo = getByAltText(/pureretail logo/i)
        expect(logo).toBeVisible()
    })
    test('renders the title', () => {
        const { getByText } = render(<Container />)
        const title = getByText(/reset password/i)
        expect(title).toBeVisible()
    })
    test('renders the phone number input', () => {
        const { getByPlaceholderText } = render(<Container />)
        const phoneNumberField = getByPlaceholderText(/phone number/i)
        expect(phoneNumberField).toBeVisible()
        expect(phoneNumberField).toBeEnabled()
    })
    test('renders the get link button', () => {
        const { getByRole } = render(<Container />)
        const getLinkButton = getByRole("button")
        expect(getLinkButton).toBeVisible()
        expect(getLinkButton).toBeEnabled()
    })
    test('renders the back to log in link', () => {
        const { getByText } = render(<Container />)
        const element = getByText(/back to log in/i)
        expect(element).toBeVisible()
    })
    test('renders the contact support link', () => {
        const { getByText } = render(<Container />)
        const element = getByText(/support/i)
        expect(element).toBeVisible()
    })
})