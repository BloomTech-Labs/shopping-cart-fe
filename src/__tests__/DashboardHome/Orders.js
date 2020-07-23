import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../../utlities/renderWithProviders';
import history from '../../history';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import Orders from '../../components/Orders/Orders';


afterEach(cleanup);

describe('dashboard', () => {
  test('renders the Main Title', () => {
    const { getByText } = renderWithProviders(<Orders />);
    const element = getByText(/Current Orders/i);
    expect(element).toBeVisible();
  });
  test("renders the Welcome Back' element", () => {
    const { getByText } = renderWithProviders(<Orders />);
    const element = getByText(/Welcome Back/i);
    expect(element).toBeVisible();
  });

});
