import React, { useState, useCallback, useEffect } from 'react';
import * as creators from '../../state/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import times_icon from '../../images/times-icon.svg';
import equals_icon from '../../images/equals-icon.svg';
import delete_icon from '../../images/delete-icon.svg';
import add_icon from '../../images/add-icon.svg';
import subtract_icon from '../../images/subtract-icon.svg';
import emptyCartGraphic from '../../images/emptyCartGraphic.svg';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
const CartTable = ({ cartContents, totalPrice, props }) => {
	const dispatch = useDispatch();
	const stripe = useStripe();
	const elements = useElements();

	const getStoreID = localStorage.getItem('storeUrl').split('store-');

	// TODO: Make a call to the "Create-Payment-Intent" (https://pure-retail-ft-stripe-4tp9te3a.herokuapp.com/api/stripe/payment/create-payment-intent) -> Submit: Price, clientID (Stripe Account)
	// Returns: the Stripe Secret used to complete the payment

	//Need business onwers stripe ID
	useEffect(() => {
		axios
			.get(`https://pure-retail-ft-stripe-4tp9te3a.herokuapp.com/api/auth/pk/${getStoreID[1]}`)
			.then((res) => {
				console.log('super res', res);
				paymentPayload.clientID = res.data;
			})
			.catch((error) => console.log(error));
	}, []);

	//Payload for the submitHandler Post Request
	const paymentPayload = {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': 'http://localhost:3000'
		},
		amount: totalPrice(cartContents),
		clientID: ''
	};

	const submitHandler = async (event) => {
		console.log('hello');
		event.preventDefault();

		// ensure stripe & elements are loaded
		if (!stripe || !elements) {
			return;
		}
		console.log('hello 2');
		//Make a payment-intent POST request

		axios
			.post(
				'https://pure-retail-ft-stripe-4tp9te3a.herokuapp.com/api/stripe/payment/create-payment-intent',
				paymentPayload
			)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => console.log(error));

		console.log('hello 3');

		//Leveage secret to complete transaction with Stripe

		//On sucsessfull transacation make a POST request to the order
	};

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
						<div className="">
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
					<div className="checkoutCard">
						<div className="checkoutElements">
							<form onSubmit={submitHandler}>
								<CardElement />
								<button type="submit"> Submit Payment: ${totalPrice(cartContents)} </button>
							</form>
						</div>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default CartTable;
