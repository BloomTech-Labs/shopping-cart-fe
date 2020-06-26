import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';

import Container from '../components/ResetPassword/resetPassword.js';

describe('login screen', () => {
  //   test('renders the logo', () => {
  //     const { getByAltText } = renderWithProviders(<Container />);
  //     const logo = getByAltText(/pureretail logo/i);
  //     expect(logo).toBeVisible();
  //   });
  // test('renders the title', () => {
  //   const { getByText } = renderWithProviders(<Container />);
  //   const title = getByText(/reset password/i);
  //   expect(title).toBeVisible();
  // });
  test('renders the phone number input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Container />);
    const phoneNumberField = getByPlaceholderText(/phone number/i);
    expect(phoneNumberField).toBeVisible();
    expect(phoneNumberField).toBeEnabled();
  });
  test('renders the get link button', () => {
    const { getByRole } = renderWithProviders(<Container />);
    const getLinkButton = getByRole('button');
    expect(getLinkButton).toBeVisible();
    expect(getLinkButton).toBeEnabled();
  });
  test('renders the back to log in link', () => {
    const { getByText } = renderWithProviders(<Container />);
    const element = getByText(/back to login/i);
    expect(element).toBeVisible();
  });
  test('renders the contact support link', () => {
    const { getByText } = renderWithProviders(<Container />);
    const element = getByText(/support/i);
    expect(element).toBeVisible();
  });
});
