import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';

import Welcome from '../components/WelcomeScreen/WelcomeScreen';
import { findAllByTestId } from '@testing-library/react';

describe('welcome screen', () => {
  test('renders div that wraps welcome screen form', () => {
    const { getByTestId } = renderWithProviders(<Welcome />);
    expect(getByTestId('welcomeFormWrapper')).toBeVisible();
  });
  test('renders welcome header', () => {
    const { getByTestId } = renderWithProviders(<Welcome />);
    expect(getByTestId('welcomeHeader')).toBeVisible();
  });
  test('renders the welcome screen logo', () => {
    const { getByAltText } = renderWithProviders(<Welcome />);
    const Header = getByAltText(/logo/i);
    expect(Header).toBeVisible();
  });

  test('renders welcome header', () => {
    const { getByTestId } = renderWithProviders(<Welcome />);
    expect(getByTestId('secondaryWelcomeHeader')).toBeVisible();
  });

  test('renders elements within form', () => {
    const { getByTestId } = renderWithProviders(<Welcome />);
    const FormEl = getByTestId('welcomeForm');
    const MainEl = getByTestId('welcomeMainSection');
    const sectionEl = getByTestId('welcomeFirstSection');
    const secondSectionEl = getByTestId('welcomeSecondSection');
    expect(FormEl).toContainElement(MainEl);
    expect(FormEl).toContainElement(sectionEl);
    expect(FormEl).toContainElement(secondSectionEl);
  });

  test('renders all labels', () => {
    const { getByTestId } = renderWithProviders(<Welcome />);
    const BusinessName = getByTestId('businessName');
    const OwnerName = getByTestId('ownerName');
    const Address = getByTestId('address');
    const SecondAddress = getByTestId('secondAddress');
    const StoreHours = getByTestId('storeHours');
    const Curbside = getByTestId('curbside');
    const City = getByTestId('city');
    const State = getByTestId('state');
    const Zip = getByTestId('zip');
    expect(BusinessName).toBeVisible();
    expect(OwnerName).toBeVisible();
    expect(Address).toBeVisible();
    expect(SecondAddress).toBeVisible();
    expect(StoreHours).toBeVisible();
    expect(Curbside).toBeVisible();
    expect(City).toBeVisible();
    expect(State).toBeVisible();
    expect(Zip).toBeVisible();
  });

  test('renders business name input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Welcome />);
    const BusinessName = getByPlaceholderText(/Business Name/i);
    expect(BusinessName).toBeVisible();
    expect(BusinessName).toBeEnabled();
  });
  test('renders owner name input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Welcome />);
    const OwnerName = getByPlaceholderText(/Owner Name/i);
    expect(OwnerName).toBeVisible();
    expect(OwnerName).toBeEnabled();
  });

  test('renders address input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Welcome />);
    const Address = getByPlaceholderText(/Add address/i);
    expect(Address).toBeVisible();
    expect(Address).toBeEnabled();
  });

  test('renders second address input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Welcome />);
    const SecondAddress = getByPlaceholderText(/Add second address/i);
    expect(SecondAddress).toBeVisible();
    expect(SecondAddress).toBeEnabled();
  });
  test('renders city input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Welcome />);
    const City = getByPlaceholderText(/Add city/i);
    expect(City).toBeVisible();
    expect(City).toBeEnabled();
  });

  test('renders state input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Welcome />);
    const State = getByPlaceholderText(/Add state/i);
    expect(State).toBeVisible();
    expect(State).toBeEnabled();
  });
  test('renders zip code input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Welcome />);
    const Zip = getByPlaceholderText(/Add zipcode/i);
    expect(Zip).toBeVisible();
    expect(Zip).toBeEnabled();
  });

  test('renders store hours input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Welcome />);
    const Hours = getByPlaceholderText(/Add Hours of Operation/i);
    expect(Hours).toBeVisible();
    expect(Hours).toBeEnabled();
  });
  test('renders curbside input', () => {
    const { getByPlaceholderText } = renderWithProviders(<Welcome />);
    const Curbside = getByPlaceholderText(/Add curbside hours/i);
    expect(Curbside).toBeVisible();
    expect(Curbside).toBeEnabled();
  });
  test('renders add info button', () => {
    const { getByTestId } = renderWithProviders(<Welcome />);
    const AddInfoButton = getByTestId('welcomeAddInfoButton');
    expect(AddInfoButton).toBeVisible();
  });
});
