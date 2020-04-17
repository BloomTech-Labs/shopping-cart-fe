import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import renderWithProviders from '../utlities/renderWithProviders'

import Container from '../components/login'

describe('login screen', () => {
  test('renders the logo', () => {
    const { getByAltText } = renderWithProviders(<Container />)
    const logo = getByAltText(/pureretail logo/i)
    expect(logo).toBeVisible()
  })
  test('renders the title', () => {
    const { getByTestId } = renderWithProviders(<Container />)
    const title = getByTestId('log-in')
    expect(title).toBeVisible()
  })
  test('renders the phone number input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Container />)
    const phoneNumberField = getByPlaceholderText(/phone number/i)
    expect(phoneNumberField).toBeVisible()
    expect(phoneNumberField).toBeEnabled()
  })
  test('renders the password input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Container />)
    const passwordField = getByPlaceholderText(/^password$/i)
    expect(passwordField).toBeVisible()
    expect(passwordField).toBeEnabled()
  })
  test('renders the log in button', () => {
    const { getByRole } = renderWithProviders(<Container />)
    const registerButton = getByRole('button')
    expect(registerButton).toBeVisible()
    expect(registerButton).toBeEnabled()
  })
  test('renders the register link', () => {
    const { getByText } = renderWithProviders(<Container />)
    const registerLink = getByText(/register/)
    expect(registerLink).toBeVisible()
  })
  test('renders the forgot password link', () => {
    const { getByText } = renderWithProviders(<Container />)
    const forgotPasswordLink = getByText(/forgot/i)
    expect(forgotPasswordLink).toBeVisible()
  })
})
