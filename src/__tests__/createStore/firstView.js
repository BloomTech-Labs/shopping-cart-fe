import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import { formReducer } from '../../state/reducers/formReducer'
import Container from '../../components/createStore/firstView'

function renderWithRedux(ui, { initialState, store = createStore(formReducer, initialState)} = {}) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>), 
        store,
    }
}

describe('create store screen', () => {
    test('renders the logo', () => {
        const { getByAltText } = renderWithRedux(<Container />)
        const logo = getByAltText(/pureretail logo/i)
        expect(logo).toBeVisible()
    })
    test('renders the title', () => {
        const { getByText } = renderWithRedux(<Container />)
        const title = getByText(/lets get started!/i)
        expect(title).toBeVisible()
    })
    test('renders the description', () => {
        const { getByText } = renderWithRedux(<Container />)
        const description = getByText(/you're in! let's get/i)
        expect(description).toBeVisible()
    })
    test('renders the name input', () => {
        const { getByPlaceholderText } = renderWithRedux(<Container />)
        const inputfield = getByPlaceholderText(/my name is/i)
        expect(inputfield).toBeVisible()
        expect(inputfield).toBeEnabled()
    })
    test('renders the currency input', () => {
        const { getByText } = renderWithRedux(<Container />)
        const inputfield = getByText(/and i prefer to sell in/i)
        expect(inputfield).toBeVisible()
        expect(inputfield).toBeEnabled()
    })
    test('renders the next button', () => {
        const { getByText } = renderWithRedux(<Container />)
        const button = getByText(/next/i)
        expect(button).toBeVisible()
        expect(button).toBeEnabled()
    })
})