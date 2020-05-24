import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as creators from '../../state/actionCreators';
import { NavLink } from 'react-router-dom';
import history from '../../history';

import CartTable from './CartTable';

const CartView = (props) => {
	const dispatch = useDispatch();

	const cartContents = useSelector((state) => state.cart);
	const sellerId = useSelector((state) => state.user.user._id);
	const storeDetails = useSelector((state) => state.user.user);

	useEffect(
		() => {
			console.log('🍕', storeDetails);
		},
		[ storeDetails ]
	);

	const totalPrice = (arr) => {
		return arr.reduce((sum, item) => {
			return sum + item.price * item.quantity;
		}, 0);
	};

	return (
		<div>
			<div className="cartHeader">
				<div
					onClick={() => {
						history.goBack();
					}}
				>
					{' '}
					Back
				</div>
				<img src="" />
			</div>
			<CartTable cartContents={cartContents} />
		</div>
	);
};

export default CartView;
