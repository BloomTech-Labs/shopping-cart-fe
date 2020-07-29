import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';
import SingleProductView from '../components/singleProduct/index';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../state/store/index';
import { Router } from 'react-router-dom';
import history from '../history';

describe('SingleProduct', () => {
  test('renders the buyerSingleProductView', () => {
    const { getByText } = render(
      <Router history={history}>
        <Provider store={store}>
          <SingleProductView />
        </Provider>
      </Router>
    );
    expect(getByText(/description/i)).toBeVisible();
  });
});
