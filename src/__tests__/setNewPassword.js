import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import Container from '../components/setNewPassword'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../state/store'

describe('set new password screen', () => {
    test('renders the logo', () => {
        const { container, getByAltText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const logo = getByAltText(/pureretail logo/i)
        expect(logo).toBeVisible()
    })
    test('renders the title', () => {
        const { container, getByText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const title = getByText(/reset password/i)
        expect(title).toBeVisible()
    })
    test('renders the new password input', () => {
        const { container, getByPlaceholderText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const element = getByPlaceholderText(/^new password$/i)
        expect(element).toBeVisible()
        expect(element).toBeEnabled()
    })
    test('renders the confirm new password input', () => {
        const { container, getByPlaceholderText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const element = getByPlaceholderText(/confirm new password/i)
        expect(element).toBeVisible()
        expect(element).toBeEnabled()
    })
    test('renders the reset button', () => {
        const { container, getByRole } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const element = getByRole("button")
        expect(element).toBeVisible()
        expect(element).toBeEnabled()
    })
    test('renders the login link', () => {
        const { container, getByText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })
        const element = getByText(/login/i)
        expect(element).toBeVisible()
    })
})