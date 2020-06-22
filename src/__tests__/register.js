import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';

import Container from '../components/register';

describe('register screen', () => {
  test('renders the logo', () => {
    const { getByAltText } = renderWithProviders(<Container />);
    const logo = getByAltText(/pureretail logo/i);
    expect(logo).toBeVisible();
  });

  test('renders the phone number input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Container />);
    const phoneNumberField = getByPlaceholderText(/2348000001231/i);
    expect(phoneNumberField).toBeVisible();
    expect(phoneNumberField).toBeEnabled();
  });
  test('renders the password input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Container />);
    const passwordField = getByPlaceholderText(/^password$/i);
    expect(passwordField).toBeVisible();
    expect(passwordField).toBeEnabled();
  });
  test('renders the confirm password input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Container />);
    const confirmPasswordField = getByPlaceholderText(/confirm password/i);
    expect(confirmPasswordField).toBeVisible();
    expect(confirmPasswordField).toBeEnabled();
  });
  test('renders the register button', () => {
    const { getByRole } = renderWithProviders(<Container />);
    const registerButton = getByRole('button');
    expect(registerButton).toBeVisible();
    expect(registerButton).toBeEnabled();
  });
  test('renders the login link', () => {
    const { getByText } = renderWithProviders(<Container />);
    const loginLink = getByText('login');
    expect(loginLink).toBeVisible();
  });

  test('renders main registration image', () => {
    const { getByAltText } = renderWithProviders(<Container />);
    expect(getByAltText(/Registration/i)).toBeVisible();
  });
  test('renders colorful image background', () => {
    const { getByTestId } = renderWithProviders(<Container />);
    expect(getByTestId('imageBackground')).toBeVisible();
  });
  test('renders div that contains logo and main picture', () => {
    const { getByTestId } = renderWithProviders(<Container />);
    expect(getByTestId('desktopLogoDiv')).toBeVisible();
  });
  test('renders div that wraps the registration form', () => {
    const { getByTestId } = renderWithProviders(<Container />);
    expect(getByTestId('registrationFormDiv')).toBeVisible();
  });
  test('renders div that wraps login link', () => {
    const { getByTestId } = renderWithProviders(<Container />);
    expect(getByTestId('loginLinkWrapper')).toBeVisible();
  });
});
