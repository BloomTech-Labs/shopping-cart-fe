import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import Container from '../components/setNewPassword'

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
    test('renders the new password input', () => {
        const { getByPlaceholderText } = render(<Container />)
        const element = getByPlaceholderText(/^new password$/i)
        expect(element).toBeVisible()
        expect(element).toBeEnabled()
    })
    test('renders the confirm new password input', () => {
        const { getByPlaceholderText } = render(<Container />)
        const element = getByPlaceholderText(/confirm new password/i)
        expect(element).toBeVisible()
        expect(element).toBeEnabled()
    })
    test('renders the reset button', () => {
        const { getByRole } = render(<Container />)
        const element = getByRole("button")
        expect(element).toBeVisible()
        expect(element).toBeEnabled()
    })
    test('renders the log in link', () => {
        const { getByText } = render(<Container />)
        const element = getByText(/login/i)
        expect(element).toBeVisible()
    })
})