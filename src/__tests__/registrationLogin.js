import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';
import Login from '../components/login';
import { getByLabelText } from '@testing-library/react';

describe('login screen and registration screens', () => {
  test('renders the title on login', () => {
    const { getByText } = renderWithProviders(<Login />);
    const title = getByText(/Login to your Store/i);
    expect(title).toBeVisible();
  });
});
