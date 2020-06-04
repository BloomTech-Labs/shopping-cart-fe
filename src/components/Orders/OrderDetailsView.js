import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../Auth/axiosWithAuth';
//Components
import OrderContents from './OrderContents';
import BuyerInfo from './BuyerInfo';

const OrderDetailsView = () => {
	const LocalsellerId = localStorage.getItem('sellerId');
	const [ order, setOrder ] = useState();
	const [ orderId, setOrderId ] = useState(0);

	const orderNumber = orderId ? orderId.substr(orderId.length - 5) : 0;

	// TODO: The Order ID used in the axios call will be removed by grabbing the id from the URL
	// const GetOrderId = props.match.params.id

	useEffect(
		() => {
			axiosWithAuth()
				.get(`https://shopping-cart-be.herokuapp.com/api/store/order/5ed832fb98c53c0004ff84b5`)
				.then((res) => {
					console.log('res', res.data._id);
					setOrder(res.data.orderItem);
					setOrderId(res.data._id);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[ setOrder ]
	);

	console.log(orderNumber);
	return (
		<div>
			<BuyerInfo orderNumber={orderNumber} />
			<OrderContents order={order} setOrder={setOrder} />
		</div>
	);
};

export default OrderDetailsView;
