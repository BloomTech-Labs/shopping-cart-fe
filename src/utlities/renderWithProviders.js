import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../state/store'

// const { container, getByAltText } = render(<Provider store={store}><Container /></Provider>, { wrapper: MemoryRouter })

export default function renderWithProviders(ui) {
    return {
        ...render(<Provider store={store}>
            <MemoryRouter>
                {ui}
            </MemoryRouter>
        </Provider>)
    }
}