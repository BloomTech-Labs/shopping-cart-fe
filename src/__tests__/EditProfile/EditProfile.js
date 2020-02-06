import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import renderWithProviders from '../../utlities/renderWithProviders'

import Container from '../../components/EditProfile/EditProfile'

describe('edit profile', () => {
  test('renders the logo', () => {
    const { getByAltText } = renderWithProviders(<Container />)
    const logo = getByAltText(/avatar/i)
    expect(logo).toBeVisible()
  })
  test('renders the title', () => {
    const { getByText } = renderWithProviders(<Container />)
    const element = getByText(/edit your profile/i)
    expect(element).toBeVisible()
  })
  test('renders the store owner name input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Container />)
    const element = getByPlaceholderText(/name of store owner/i)
    expect(element).toBeVisible()
  })
  test('renders the currency input', () => {
    const { getByText } = renderWithProviders(<Container />)
    const element = getByText(/select your currency/i)
    expect(element).toBeInTheDocument()
  })
  test('renders the store name input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Container />)
    const element = getByPlaceholderText(/store name/i)
    expect(element).toBeVisible()
  })
  test('renders the update button', () => {
    const { getByText } = renderWithProviders(<Container />)
    const element = getByText(/update/i)
    expect(element).toBeVisible()
  })
  test('renders the logout button', () => {
    const { getByText } = renderWithProviders(<Container />)
    const element = getByText(/logout/i)
    expect(element).toBeVisible()
  })
  test('renders the delete account link', () => {
    const { getByText } = renderWithProviders(<Container />)
    const element = getByText(/delete account/i)
    expect(element).toBeVisible()
  })
})
