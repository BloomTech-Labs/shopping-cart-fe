import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import renderWithProviders from '../utlities/renderWithProviders'

import Container from '../components/setNewPassword'

describe('set new password screen', () => {
  test('renders the logo', () => {
    const { getByAltText } = renderWithProviders(<Container />)
    const logo = getByAltText(/pureretail logo/i)
    expect(logo).toBeVisible()
  })
  test('renders the title', () => {
    const { getByText } = renderWithProviders(<Container />)
    const title = getByText(/reset password/i)
    expect(title).toBeVisible()
  })
  test('renders the new password input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Container />)
    const element = getByPlaceholderText(/^new password$/i)
    expect(element).toBeVisible()
    expect(element).toBeEnabled()
  })
  test('renders the confirm new password input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Container />)
    const element = getByPlaceholderText(/confirm new password/i)
    expect(element).toBeVisible()
    expect(element).toBeEnabled()
  })
  test('renders the reset button', () => {
    const { getByRole } = renderWithProviders(<Container />)
    const element = getByRole('button')
    expect(element).toBeVisible()
    expect(element).toBeEnabled()
  })
  test('renders the login link', () => {
    const { getByText } = renderWithProviders(<Container />)
    const element = getByText(/login/i)
    expect(element).toBeVisible()
  })
})
