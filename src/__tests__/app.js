import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';

import App from '../App';

describe('app', () => {
  test("renders the 'Order #' title", () => {
    const { getByText } = renderWithProviders(<App />);
    expect(getByText(/welcome/i)).toBeInTheDocument();
  });
});
