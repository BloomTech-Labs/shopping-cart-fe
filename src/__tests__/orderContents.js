import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';
// components
import OrderContentsCards from '../components/Orders/OrderContentsCards';
import OrderContents from '../components/Orders/OrderContents';
import Buyerinfo from '../components/Orders/BuyerInfo';
import OrderDetailsView from '../components/Orders/OrderDetailsView';
import ProductCard from '../components/store/ProductCard';
import { Router } from 'react-router-dom';
import history from '../history';

import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('Buyer info', () => {
  test('should render the main wrapper for orderContentsCard', () => {
    const { getByTestId } = render(<OrderContentsCards />);
    expect(getByTestId('orderContentsCardsWrapper')).toBeVisible();
  });
  test('should render the main wrapper for OrderContents', () => {
    const { getByTestId } = render(<OrderContents />);
    expect(getByTestId('orderContentsWrapper')).toBeVisible();
  });

  test('should render the product card', () => {
    const { rerender, getByText } = render(
      <Router history={history}>
        <ProductCard
          inventory={{
            images: [
              'https://res.cloudinary.com/dnsl4nbz4/image/upload/v1592612280/Products/tkb1s2rqc7qwapdhdcde.png',
            ],
            price: 55,
            productId: '5eed55c1028759000473c85b',
            productName: 'Bike',
            quantity: 1,
          }}
        />
      </Router>
    );
  });
});
