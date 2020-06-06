import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../Auth/axiosWithAuth';
//Components
import OrderContents from './OrderContents';
import BuyerInfo from './BuyerInfo';

const OrderDetailsView = () => {
	const LocalsellerId = localStorage.getItem('sellerId');
	const [ order, setOrder ] = useState();
	const [ fullOrder, setFullOrder ] = useState(0);

	// TODO: The Order ID used in the axios call will be removed by grabbing the id from the URL
	// const GetOrderId = props.match.params.id

	useEffect(
		() => {
			axiosWithAuth()
				.get(`https://shopping-cart-be.herokuapp.com/api/store/order/5ed832fb98c53c0004ff84b5`)
				.then((res) => {
					console.log('res', res.data);
					setOrder(res.data.orderItem);
					setFullOrder(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		[ setOrder ]
	);

	return (
		<div className="OrderDetailsMaster">
			<BuyerInfo fullOrder={fullOrder} />
			<OrderContents order={order} setOrder={setOrder} />
		</div>
	);
};

export default OrderDetailsView;
