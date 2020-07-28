import React from 'react';
import ReactDOM from 'react-dom';
import CartView from '../components/cart/CartView';
import CartTable from '../components/cart/CartTable';
import '@testing-library/jest-dom/extend-expect';
import renderWithProviders from '../utlities/renderWithProviders';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

describe('Render Tests', () => {
	//Needed to repliate stripe
	const stripePromise = loadStripe('pk_test_VHc4fOD3byWy85jOWOYLijhH00OmL57YuX', {
		stripeAccount: 'acct_1H6LilIrVDEEa5AF'
	});

	const cartContents = [
		{
			images: [
				'https://res.cloudinary.com/dnsl4nbz4/image/upload/v1595381636/Products/gml8p0moezrwcwc1az0v.jpg',
				''
			],
			price: 100,
			productId: '5f1797a53e2aad0004e78a9e',
			productName: 'Cool Shirt',
			quantity: 1,
			variantDetails: [ { _id: '5f1797a53e2aad0004e78a9f', option: 'small', price: 100 } ]
		}
	];

	const store = {
		logo: 'https://res.cloudinary.com/dnsl4nbz4/image/upload/v1595295400/zqqf2ualihvj8xuohmgn.png',
		color: '#eb144c'
	};

	const totalPrice = (arr) => {
		return arr.reduce((sum, item) => {
			return sum + item.price * item.quantity;
		}, 0);
	};

	const paymentPayload = {
		price: 100,
		clientID: 'acct_1H7ALoISbGMo70op'
	};

	const orderPayload = {
		orderItem: [
			{
				product: '5f1797a53e2aad0004e78a9e',
				quantity: 1,
				chosenVariant: {
					price: 100
				}
			}
		]
	};

	const getStoreID = '5f1645a717a4730004f569c3';

	test('Render Test for CartView', () => {
		renderWithProviders(
			<Elements stripe={stripePromise}>
				<CartView />
			</Elements>
		);
	});

	test('Render test for CartTable', () => {
		<Elements stripe={stripePromise}>
			<CartTable />
		</Elements>;
	});

	test('Renders Table & Item', () => {
		const { getByTestId } = renderWithProviders(
			<Elements stripe={stripePromise}>
				<CartTable cartContents={cartContents} totalPrice={totalPrice} store={store} />
			</Elements>
		);
		expect(getByTestId('CartTable')).toHaveTextContent('Product');
		expect(getByTestId('productName')).toHaveTextContent('Cool Shirt');
		expect(getByTestId('price')).toHaveTextContent('$100');
	});

	test('Total Cost is Working', () => {
		const { getByTestId } = renderWithProviders(
			<Elements stripe={stripePromise}>
				<CartTable cartContents={cartContents} totalPrice={totalPrice} store={store} />
			</Elements>
		);
		expect(getByTestId('total')).toHaveTextContent('$100');
	});
});
