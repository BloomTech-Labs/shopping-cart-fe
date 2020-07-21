import React, { useEffect, useState } from 'react';

const CheckoutSuccessView = (props) => {
	const orderNumber = window.location.href.split('/');
	console.log(orderNumber);
	return (
		<div>
			<div className="cardContainer">
				<img src="" />
				<h1> Order Made </h1>
				<h3>You’ll recieve a text between you and the seller with more information</h3>
				<div className="infoContainer">
					<h3>
						<span>Order Number:</span> {orderNumber[orderNumber.length - 1].substr(-8).toUpperCase()}
					</h3>
					<h3>
						<span>Number Sent To:</span> 123 - 345 - 6789
					</h3>
				</div>
				<button> Back To Store</button>
			</div>
		</div>
	);
};

export default CheckoutSuccessView;
