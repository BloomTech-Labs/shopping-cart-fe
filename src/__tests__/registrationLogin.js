import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';
import Login from '../components/login';
import { getByTestId, getByAltText } from '@testing-library/react';

// These tests ensure all elements are rendering on login

describe('login screen and registration screens', () => {
  test('renders the title on login', () => {
    const { getByText } = renderWithProviders(<Login />);
    const title = getByText(/LogIn to your Store/i);
    expect(title).toBeVisible();
  });
  test('renders logo', () => {
    const { getByTestId } = renderWithProviders(<Login />);
    expect(getByTestId('loginLogo')).toBeVisible();
  });
  test('renders phone number input', () => {
    const { getByTestId } = renderWithProviders(<Login />);
    expect(getByTestId('phoneNumberInput')).toBeVisible();
  });
  test('renders password input', () => {
    const { getByTestId } = renderWithProviders(<Login />);
    expect(getByTestId('loginPasswordInput')).toBeVisible();
  });
  test('renders forgot password link', () => {
    const { getByText } = renderWithProviders(<Login />);
    expect(getByText(/forgot password/i)).toBeVisible();
  });
  test('renders login button', () => {
    const { getByTestId } = renderWithProviders(<Login />);
    expect(getByTestId('loginButton')).toBeVisible();
  });
  test('renders create store button', () => {
    const { getByTestId } = renderWithProviders(<Login />);
    expect(getByTestId('createStoreButton')).toBeVisible();
  });
  test('renders main login image', () => {
    const { getByAltText } = renderWithProviders(<Login />);
    expect(getByAltText(/login/i)).toBeVisible();
  });
  test('renders colorful image background', () => {
    const { getByTestId } = renderWithProviders(<Login />);
    expect(getByTestId('imageBackground')).toBeVisible();
  });
  test('renders phone / password background div', () => {
    const { getByTestId } = renderWithProviders(<Login />);
    expect(getByTestId('loginFormWrapper')).toBeVisible();
  });
  
});
