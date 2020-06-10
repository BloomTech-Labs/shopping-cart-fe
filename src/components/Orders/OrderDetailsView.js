import React, { useState, useEffect } from 'react';
import OrderContents from './OrderContents';
import axiosWithAuth from '../Auth/axiosWithAuth';

const OrderDetailsView = (props) => {
	const [ order, setOrder ] = useState();
	const orderId = props.match.params.id;

	useEffect(
		() => {
			axiosWithAuth()
				.get(`https://shopping-cart-be.herokuapp.com/api/store/order/${orderId}`)
				.then((res) => {
					setOrder(res.data.orderItem);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[ setOrder ]
	);
	return (
		<div>
			<OrderContents orderId={orderId} order={order} setOrder={setOrder} />
		</div>
	);
};

export default OrderDetailsView;
