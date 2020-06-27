import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';

import Container from '../components/singleProduct/index';

describe('single product view screen', () => {
  test('renders the main wrapper', () => {
    const { getByTestId } = renderWithProviders(<Container />);
    const Wrapper = getByTestId('singleProductViewWrapper');
    expect(Wrapper).toBeVisible();
  });
});
