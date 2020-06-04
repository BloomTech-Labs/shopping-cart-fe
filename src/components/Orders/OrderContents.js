import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../Auth/axiosWithAuth';
import OrderContentsCards from './OrderContentsCards';

const OrderContents = (props) => {
	const LocalsellerId = localStorage.getItem('sellerId');

	const [ order, setOrder ] = useState();

	// TODO: The Order ID used in the axios call will be removed by grabbing the id from the URL
	// const GetOrderId = props.match.params.id

	useEffect(
		() => {
			axiosWithAuth()
				.get(`https://shopping-cart-be.herokuapp.com/api/store/order/5ed832fb98c53c0004ff84b5`)
				.then((res) => {
					setOrder(res.data.orderItem);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[ setOrder ]
	);

	function RemoveItem(arg) {
		const removeItem = order.filter((state) => {
			return state.product.productName === arg.productName;
		});

		console.log('removeItem', removeItem);
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
			return state.product.productName !== removeItem[0].product.productName;
		});

		return setOrder(newState);
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
