import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as creators from '../../state/actionCreators';
import { NavLink } from 'react-router-dom';
import history from '../../history';

import CartTable from './CartTable';
import NoLogo from '../../images/PureRetail_Logo.png';
import ReviewMain from '../cart/review';

const CartView = (props) => {
	// const dispatch = useDispatch();

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
		<div className="cartMasterContainer">
			<div className="cartHeader">
				<div
					className="backButton"
					onClick={() => {
						history.goBack();
					}}
				>
					← Back
				</div>
				<div className="logoContainer">
					{storeDetails.imageUrl ? (
						<img className="storeLogo" src={storeDetails.imageUrl} alt ="re"/>
					) : (
						<img className="storeLogo" src={NoLogo}  alt ="re"/>
					)}
				</div>
			</div>
			<CartTable cartContents={cartContents}  totalPrice ={totalPrice}/>
		</div>
	);
};

export default CartView;
