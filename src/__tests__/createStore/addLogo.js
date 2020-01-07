import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import { formReducer } from '../../state/reducers/formReducer'
import Container from '../../components/createStore/addLogo'

function renderWithRedux(ui, { initialState, store = createStore(formReducer, initialState)} = {}) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>), 
        store,
    }
}

describe('create store screen', () => {
    test('renders the title', () => {
        const { getByText } = renderWithRedux(<Container />)
        const title = getByText(/upload store/i)
        expect(title).toBeVisible()
    })
    test('renders the upload store component', () => {
        const { getByText } = renderWithRedux(<Container />)
        const description = getByText(/store logo/i)
        expect(description).toBeVisible()
    })
    test('renders give your store a name', () => {
        const { getByText } = renderWithRedux(<Container />)
        const title = getByText(/give your store/i)
        expect(title).toBeVisible()
    })
    test('renders the currency input', () => {
        const { getByPlaceholderText } = renderWithRedux(<Container />)
        const inputfield = getByPlaceholderText(/my store's name is/i)
        expect(inputfield).toBeVisible()
        expect(inputfield).toBeEnabled()
    })
    test('renders the done button', () => {
        const { getByText } = renderWithRedux(<Container />)
        const button = getByText(/done/i)
        expect(button).toBeVisible()
        expect(button).toBeEnabled()
    })
})