import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';

import BrandView from '../components/BrandView';

<<<<<<< HEAD
describe('login screen', () => {
=======
describe('brandview screen', () => {
>>>>>>> 68bd34ae6db3a764e7d711e3f3722923a6de5b17
  test('renders the main wrapper', () => {
    const { getByTestId } = renderWithProviders(<BrandView />);
    const Brandwrapper = getByTestId('brandwrapper');
    expect(Brandwrapper).toBeVisible();
  });
  test('renders the header wrapper', () => {
    const { getByTestId } = renderWithProviders(<BrandView />);
    const Headerwrapper = getByTestId('headerwrapper');
    expect(Headerwrapper).toBeVisible();
  });

  test('renders Almost done header', () => {
    const { getByText } = renderWithProviders(<BrandView />);
    const Header = getByText(/almost done/i);
    expect(Header).toBeVisible();
  });

  test('renders Add your logo and most prominent brand color header', () => {
    const { getByText } = renderWithProviders(<BrandView />);
    const Header = getByText(/Add your logo and most prominent brand color/i);
    expect(Header).toBeVisible();
  });

  test('renders wrapper that holds logoUpdate/ColorPicker', () => {
    const { getByTestId } = renderWithProviders(<BrandView />);
    const Wrapper = getByTestId('logocolorwrapper');
    expect(Wrapper).toBeVisible();
  });
  test('renders the finish button', () => {
    const { getByText } = renderWithProviders(<BrandView />);
    const FinishButton = getByText(/finish/i);
    expect(FinishButton).toBeVisible();
  });
  test('renders the color picker wrapper', () => {
    const { getByTestId } = renderWithProviders(<BrandView />);
    const Wrapper = getByTestId('colorpickerwrapper');
    expect(Wrapper).toBeVisible();
  });
  test('renders the color picker header', () => {
    const { getByText } = renderWithProviders(<BrandView />);
    const Header = getByText(/Select your brand color!/i);
    expect(Header).toBeVisible();
  });

  test('renders the color picker box', () => {
    const { getByTestId } = renderWithProviders(<BrandView />);
    const Box = getByTestId('colorpickerbox');
    expect(Box).toBeVisible();
  });

  test('renders the logo wrapper', () => {
    const { getByTestId } = renderWithProviders(<BrandView />);
    const LogoBox = getByTestId('logoupdatewrapper');
    expect(LogoBox).toBeVisible();
  });

  test('renders the logo picker header', () => {
    const { getByText } = renderWithProviders(<BrandView />);
    const LogoHeader = getByText(/add your logo!/i);
    expect(LogoHeader).toBeVisible();
  });
  test('renders the phone number input', () => {
    const { getByText } = renderWithProviders(<BrandView />);
    const AddPhoto = getByText(/add photo/i);
    expect(AddPhoto).toBeVisible();
    expect(AddPhoto).toBeEnabled();
  });
});
