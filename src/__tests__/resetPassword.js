import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import Container from '../components/resetPassword'
import { MemoryRouter } from 'react-router-dom'

describe('login screen', () => {
    test('renders the logo', () => {
        const { container, getByAltText } = render(<Container />, { wrapper: MemoryRouter })
        const logo = getByAltText(/pureretail logo/i)
        expect(logo).toBeVisible()
    })
    test('renders the title', () => {
        const { container, getByText } = render(<Container />, { wrapper: MemoryRouter })
        const title = getByText(/reset password/i)
        expect(title).toBeVisible()
    })
    test('renders the phone number input', () => {
        const { container, getByPlaceholderText } = render(<Container />, { wrapper: MemoryRouter })
        const phoneNumberField = getByPlaceholderText(/phone number/i)
        expect(phoneNumberField).toBeVisible()
        expect(phoneNumberField).toBeEnabled()
    })
    test('renders the get link button', () => {
        const { container, getByRole } = render(<Container />, { wrapper: MemoryRouter })
        const getLinkButton = getByRole("button")
        expect(getLinkButton).toBeVisible()
        expect(getLinkButton).toBeEnabled()
    })
    test('renders the back to log in link', () => {
        const { container, getByText } = render(<Container />, { wrapper: MemoryRouter })
        const element = getByText(/back to login/i)
        expect(element).toBeVisible()
    })
    test('renders the contact support link', () => {
        const { container, getByText } = render(<Container />, { wrapper: MemoryRouter })
        const element = getByText(/support/i)
        expect(element).toBeVisible()
    })
})