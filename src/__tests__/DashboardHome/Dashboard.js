import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import renderWithProviders from '../../utlities/renderWithProviders'

import Container from '../../components/DashboardHome/Dashboard'

describe('dashboard', () => {
    test('renders the welcome message', () => {
        const { getByText } = renderWithProviders(<Container />)
        const element = getByText(/welcome/i)
        expect(element).toBeVisible()
    })
    test('renders the logo', () => {
        const { getByAltText } = renderWithProviders(<Container />)
        const element = getByAltText(/store logo/i)
        expect(element).toBeVisible()
    })
    test('renders overview', () => {
        const { getByText } = renderWithProviders(<Container />)
        const element = getByText(/overview/i)
        expect(element).toBeVisible()
    })
    test('renders sales history', () => {
        const { getByText } = renderWithProviders(<Container />)
        const element = getByText(/sales history/i)
        expect(element).toBeVisible()
    })
    test('renders this month you earned', () => {
        const { getByText } = renderWithProviders(<Container />)
        const element = getByText(/this month you earned/i)
        expect(element).toBeVisible()
    })
    test('renders lifetime earnings', () => {
        const { getByText } = renderWithProviders(<Container />)
        const element = getByText(/lifetime earnings/i)
        expect(element).toBeVisible()
    })
})