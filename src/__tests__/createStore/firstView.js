import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import { formReducer } from '../../state/reducers/formReducer'
import Container from '../../components/createStore/firstView'

function renderWithRedux(ui, { initialState, store = createStore(formReducer, initialState)} = {}) {
    return {
        ...render(<Provider store={store}>ui</Provider>), 
        store,
    }
}

describe('login screen', () => {
    test('renders the logo', () => {
        const { getByAltText } = renderWithRedux(<Container />)
        const logo = getByAltText(/pureretail logo/i)
        expect(logo).toBeVisible()
    })
})