import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../state/store'

export default function renderWithProviders(ui) {
    return {
        ...render(<Provider store={store}>
            <MemoryRouter>
                {ui}
            </MemoryRouter>
        </Provider>)
    }
}