import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';
import ProfileView from '../components/ProfileView';

describe('profileView tests', () => {
  test('renders the title on logo', () => {
    const { getByText } = renderWithProviders(<ProfileView />);
    const title = getByText(/Logo/i);
    expect(title).toBeVisible();
  });

  test('renders the title on brand color', () => {
    const { getByText } = renderWithProviders(<ProfileView />);
    const title = getByText(/Brand Color/i);
    expect(title).toBeVisible();
  });
  test('renders the title for Business Name', () => {
    const { getByText } = renderWithProviders(<ProfileView />);
    const title = getByText(/Business name/i);
    expect(title).toBeVisible();
  });
  test('renders the title for Building / Unit / Suite', () => {
    const { getByText } = renderWithProviders(<ProfileView />);
    const title = getByText(/Building/i);
    expect(title).toBeVisible();
  });
  test('renders the title for State', () => {
    const { getByText } = renderWithProviders(<ProfileView />);
    const title = getByText(/State/i);
    expect(title).toBeVisible();
  });
  test('renders the title for Curbside', () => {
    const { getByText } = renderWithProviders(<ProfileView />);
    const title = getByText(/Curbside/i);
    expect(title).toBeVisible();
  });

  test('renders the title for Phone Number', () => {
    const { getByText } = renderWithProviders(<ProfileView />);
    const title = getByText(/Phone Number/i);
    expect(title).toBeVisible();
  });

  test('renders the title for Address', () => {
    const { getByText } = renderWithProviders(<ProfileView />);
    const title = getByText(/Address/i);
    expect(title).toBeVisible();
  });

  test('renders the title for City', () => {
    const { getByText } = renderWithProviders(<ProfileView />);
    const title = getByText(/City/i);
    expect(title).toBeVisible();
  });
  test('renders the title for Zip Code', () => {
    const { getByText } = renderWithProviders(<ProfileView />);
    const title = getByText(/Zip Code/i);
    expect(title).toBeVisible();
  });

  test('renders main header', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileViewHeader')).toBeVisible();
  });
  test('renders main profile wrapper', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileViewWrapper')).toBeVisible();
  });

  test('renders main color div', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileViewColorDiv')).toBeVisible();
  });

  test('renders main profile view section', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileViewSection')).toBeVisible();
  });

  test('renders main profile view logo', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileViewLogo')).toBeVisible();
  });
  test('renders main profile view color wrapper', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileViewColorWrapper')).toBeVisible();
  });

  test('renders main profile view color secondary wrapper', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileViewSecondaryWrapper')).toBeVisible();
  });

  test('renders main profile view left/right', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileViewLeftRight')).toBeVisible();
  });

  test('renders main profile view left', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileViewLeft')).toBeVisible();
  });
  test('renders main profile view business name', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileBusinessName')).toBeVisible();
  });
  test('renders main profile view owner', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileOwner')).toBeVisible();
  });
  test('renders main profile view building/unit/suite', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileSecondaryAddress')).toBeVisible();
  });
  test('renders main profile view State', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileState')).toBeVisible();
  });
  test('renders main profile view hHours', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileBusinessHours')).toBeVisible();
  });
  test('renders main profile view Curbside Hours', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileCurbHours')).toBeVisible();
  });
  test('renders main profile view Phone Number', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profilePhoneNumber')).toBeVisible();
  });
  test('renders main profile view Address', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileAddress')).toBeVisible();
  });
  test('renders main profile view City', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileCity')).toBeVisible();
  });
  test('renders main profile view Zip Code', () => {
    const { getByTestId } = renderWithProviders(<ProfileView />);
    expect(getByTestId('profileZipCode')).toBeVisible();
  });

});
