import React, { useState, useEffect } from 'react';
import OrderContents from './OrderContents';
import axiosWithAuth from '../Auth/axiosWithAuth';

const OrderDetailsView = () => {
	const LocalsellerId = localStorage.getItem('sellerId');
	const [ order, setOrder ] = useState();

	// TODO: The Order ID used in the axios call will be removed by grabbing the id from the URL
	// const GetOrderId = props.match.params.id

	useEffect(
		() => {
			axiosWithAuth()
				.get(`https://shopping-cart-be.herokuapp.com/api/store/order/5ed832fb98c53c0004ff84b5`)
				.then((res) => {
					console.log('res', res.data._id);
					setOrder(res.data.orderItem);
					const orderId = res.data._id;
					const orderNumber = orderId.substr(orderId.length - 5);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[ setOrder ]
	);
	return (
		<div>
			<OrderContents order={order} setOrder={setOrder} />
		</div>
	);
};

export default OrderDetailsView;
