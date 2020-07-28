import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';

import UpdateItem from '../components/Products/updateItem';

describe('update Item', () => {
	test('renders the main wrapper', () => {
		const { getByTestId } = renderWithProviders(<UpdateItem />);
		const Wrapper = getByTestId('updateProfileWrapper');
		expect(Wrapper).toBeVisible();
	});
	test('Updates product successfully', () => {
		const { getByTestId } = renderWithProviders(<UpdateItem />);
		const element = getByTestId("You're product Was Updated Successfuly!");
		expect(element).toBeVisible();
	});
});
