import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import history from './../history';
import { render, cleanup } from '@testing-library/react';

import Update from '../components/Update';
import Dashboard from '../components/DashboardHome/Dashboard';
import Footer from '../components/DashboardHome/Footer';
import SetNewPassword from '../components/ResetPassword/setNewPassword';
import OrderSuccessPage from '../components/Stripe/OrderSuccessPage';
import Stripe from '../components/Stripe/stripe';

describe('Wrapping up testing', () => {
  test('renders the update', () => {
    const { getByTestId } = renderWithProviders(<Update />);
    expect(getByTestId('updateProfileWrapper')).toBeVisible();
  });
  test('renders the Dashboard.js', () => {
    const { getByTestId } = renderWithProviders(<Dashboard />);
    expect(getByTestId('dashboardMainDiv')).toBeVisible();
  });
  test('renders the Footer.js', () => {
    const { getByTestId } = renderWithProviders(<Footer />);
    expect(getByTestId('mainFooterWrapper')).toBeVisible();
  });

  test('renders the SetNewPassword.js', () => {
    const { getByTestId } = renderWithProviders(<SetNewPassword />);
    expect(getByTestId('setNewPasswordMainDiv')).toBeVisible();
  });

  test('OrderSuccessPage exists', () => {
    const { getByTestId } = renderWithProviders(<OrderSuccessPage />);
    expect(getByTestId('orderSuccessMainDiv')).toBeVisible();
  });
  test('Stripe.js exists', () => {
    const { getByTestId } = renderWithProviders(<Stripe />);
    expect(getByTestId('stripePaymentsWrapper')).toBeVisible();
  });
});
