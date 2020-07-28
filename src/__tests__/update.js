import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';
import Update, { uploadImage } from '../components/Update';
d;
describe('Update Profile Screen screen', () => {
	test('renders the main wrapper', () => {
		const { getByTestId } = renderWithProviders(<Update />);
		const Wrapper = getByTestId('updateProfileWrapper');
		expect(Wrapper).toBeVisible();
	});
	test('renders the main header', () => {
		const { getByTestId } = renderWithProviders(<Update />);
		const Header = getByTestId('updateProfileMainHeader');
		expect(Header).toBeVisible();
	});

	test('renders the secondary wrapper', () => {
		const { getByTestId } = renderWithProviders(<Update />);
		const Wrapper = getByTestId('updateProfileSecondaryWrapper');
		expect(Wrapper).toBeVisible();
	});
	test('renders the color wrapper', () => {
		const { getByTestId } = renderWithProviders(<Update />);
		const Wrapper = getByTestId('updateProfileColorWrappers');
		expect(Wrapper).toBeVisible();
	});
	test('renders the logo wrapper', () => {
		const { getByTestId } = renderWithProviders(<Update />);
		const Wrapper = getByTestId('updateProfileLogoWrappers');
		expect(Wrapper).toBeVisible();
	});
	test('renders the change logo', () => {
		const { getByText } = renderWithProviders(<Update />);
		const Button = getByText(/change logo/i);
		expect(Button).toBeVisible();
	});
	test('renders the logo top profile div', () => {
		const { getByTestId } = renderWithProviders(<Update />);
		const Wrapper = getByTestId('updateProfileTopDiv');
		expect(Wrapper).toBeVisible();
	});
	test('renders the logo profile left div', () => {
		const { getByTestId } = renderWithProviders(<Update />);
		const Wrapper = getByTestId('updateProfileLeftDiv');
		expect(Wrapper).toBeVisible();
	});
	test('renders the business name', () => {
		const { getByTestId } = renderWithProviders(<Update />);
		const Name = getByTestId('updateProfileBusName');
		expect(Name).toBeVisible();
	});
	test('renders the owners name', () => {
		const { getByTestId } = renderWithProviders(<Update />);
		const Name = getByTestId('updateProfileOwnerName');
		expect(Name).toBeVisible();
	});
});
