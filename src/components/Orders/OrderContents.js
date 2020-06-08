import React from 'react';
import axiosWithAuth from '../Auth/axiosWithAuth';
import OrderContentsCards from './OrderContentsCards';

const OrderContents = (props) => {
	const { order, setOrder } = props;

	function RemoveItem(arg) {
		const removeItem = order.filter((state) => {
			console.log('arg', arg);
			console.log('state', state);
			return state._id === arg;
		});
		// TODO: Change the first number to use var above called "GetOrderId"
		axiosWithAuth()
			.delete(`https://shopping-cart-be.herokuapp.com/api/store/5ed832fb98c53c0004ff84b5/${removeItem[0]._id}`)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});

		const newState = order.filter((state) => {
			return state._id !== removeItem[0]._id;
		});

		return setOrder(newState);
		return console.log('newState', newState);
	}

	return (
		<div className="orderContentsContainer">
			<div className="contentsHeaderContainer">
				<h5>Quantity</h5>
				<h5>Products</h5>
			</div>
			<OrderContentsCards order={order} RemoveItem={RemoveItem} />
		</div>
	);
};

export default OrderContents;
