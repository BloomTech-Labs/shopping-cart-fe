import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';

import Inventory from '../components/inventory/inventory';

describe('inventory screen', () => {
  test('renders inventory header', () => {
    const { getByTestId } = renderWithProviders(<Inventory />);
    expect(getByTestId('inventoryHeader')).toBeVisible();
  });
  test('renders nav', () => {
    const { getByText } = renderWithProviders(<Inventory />);
    const Nav = getByText('Home');
    expect(Nav).toBeVisible();
  });
  // test functions if necessary below
});
