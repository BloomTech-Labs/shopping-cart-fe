import React, { useState, useCallback, useEffect } from 'react';
import * as creators from '../../state/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import times_icon from '../../images/times-icon.svg';
import equals_icon from '../../images/equals-icon.svg';
import delete_icon from '../../images/delete-icon.svg';
import add_icon from '../../images/add-icon.svg';
import subtract_icon from '../../images/subtract-icon.svg';
import emptyCartGraphic from '../../images/emptyCartGraphic.svg';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
const CartTable = ({ cartContents, totalPrice, props }) => {
	const dispatch = useDispatch();
	// Grabs store URL and parases it for store ID - This is used to make a call to get the PK
	const storeURL = localStorage.getItem('storeUrl').split('-');
	const storeURLlength = storeURL.length;

	//State for hold PK returned on axios call
	const [ pk, setPK ] = useState(null);

	const increment = (id) => {
		console.log('isDispatching ++', id);
		dispatch(creators.increment(id));
	};

	const decrement = (id) => {
		console.log('isDispatching --', id);
		dispatch(creators.decrement(id));
	};

	const removeItem = (item) => {
		console.log('isDispatching item', item);
		dispatch(creators.subtractFromCart(item));
	};
	const arr = cartContents.map((cart) =>
		cart.variantDetails.reduce((sum, item) => {
			return sum + item.price;
		}, 0)
	);
	const numbers = cartContents.reduce((sum, item) => {
		return sum + item.quantity;
	}, 0);

	// Backend call to get the PK
	useEffect(() => {
		axios
			.get(`https://pure-retail-ft-stripe-4tp9te3a.herokuapp.com/api/auth/pk/${storeURL[storeURLlength - 1]}`)
			.then((res) => {
				setPK(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	//Funciton is used to send token to stripe / our DB
	const sendPayment = (token) => {
		const body = {
			token,
			cartContents
		};
		const headers = {
			'Content-Type': 'application/json'
		};

		return axios
			.post(
				'https://pure-retail-ft-stripe-4tp9te3a.herokuapp.com/api/stripe/payment/create-payment-intent',
				body,
				headers
			)
			.then((res) => console.log('pay Res', res, 'body', body))
			.catch((err) => console.log(err));
	};

	setTimeout(() => {
		console.log('pk', pk);
	}, 3000);

	return (
		<div className="cartMasterContainer">
			{cartContents.length > 0 ? (
				<div>
					<div className="tableHeader">
						<p className="productTitle"> Product</p>
						<p className="priceTitle"> Price</p>
						<p className="quantityTitle"> Quantity</p>
						<p className="totalTitle"> Total</p>
					</div>
					<div />
				</div>
			) : (
				<div className="emptyCart">
					<img src={emptyCartGraphic} alt="cartImage" />
					<h1>This is awkward... </h1>
					<h2>You don’t have’t any items in your cart </h2>
				</div>
			)}

			{cartContents ? (
				cartContents.map((cv) => {
					return (
						<div>
							<div className="cartProductCard">
								<div className="productSection">
									<img className="cartImage" src={cv.images[0]} alt="cartImage" />
									<div className="productInfo">
										<h3> {cv.productName} </h3>
										<p>{cv.variantDetails[0].option}</p>
									</div>
								</div>
								{cv.variantDetails[0].price ? (
									<h3>${cv.variantDetails[0].price}</h3>
								) : (
									<h3>${cv.price}</h3>
								)}
								<img src={times_icon} alt="cartImage" />
								<div className="quantityContainer">
									<img
										className="quantityBTN"
										alt="cartImage"
										src={subtract_icon}
										onClick={() => {
											decrement(cv.productId);
										}}
									/>
									<div className="quantityCounter">
										<h3>{cv.quantity}</h3>
									</div>
									<img
										className="quantityBTN"
										src={add_icon}
										alt="cartImage"
										onClick={() => {
											increment(cv.productId);
										}}
									/>
								</div>

								<img className="equalsIcon" alt="cartImage" src={equals_icon} />
								{cv.variantDetails[0].option ? (
									<h3>
										$
										{Number.parseFloat(cv.variantDetails[0].price * cv.quantity).toFixed(2)}
									</h3>
								) : (
									<h3>${Number.parseFloat(cv.price * cv.quantity).toFixed(2)}</h3>
								)}

								<img
									className="deleteIcon"
									src={delete_icon}
									alt="cartImage"
									onClick={() => {
										console.log('click fired', cv);
										removeItem(cv);
									}}
								/>
							</div>
						</div>
					);
				})
			) : (
				''
			)}
			{cartContents.length > 0 ? (
				<div className="totalPrice">
					<div className="total">Total: {totalPrice(cartContents)}</div>

					<StripeCheckout
						stripeKey="pk_test_51H5Hs7D4XHWIGJYmz30OkOF6H860QR7bVCToSt8BU3GyfhX6QuloD64xKfAo5rzBtyHwvmQehXtxIFHPA9VyiKz800bXP4mSiO"
						name="Pure Retail ✌️"
						token={sendPayment}
						amount={totalPrice(cartContents) * 100}
					>
						<button className="checkoutBTN"> Checkout </button>
					</StripeCheckout>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default CartTable;
