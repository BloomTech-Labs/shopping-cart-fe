import React, { useState, useCallback, useEffect } from 'react';
import * as creators from '../../state/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import times_icon from '../../images/times-icon.svg';
import equals_icon from '../../images/equals-icon.svg';
import delete_icon from '../../images/delete-icon.svg';
import add_icon from '../../images/add-icon.svg';
import subtract_icon from '../../images/subtract-icon.svg';

const CartTable = ({ cartContents }) => {
	const dispatch = useDispatch();

	console.log(cartContents);

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

	return (
		<div className="cartMasterContainer">
			<div className="tableHeader">
				<p className="productTitle"> Product</p>
				<p className="priceTitle"> Price</p>
				<p className="quantityTitle"> Quantity</p>
				<p className="totalTitle"> Total</p>
			</div>

			{cartContents ? (
				cartContents.map((cv) => {
					return (
						<div className="cartProductCard">
							<div className="productSection">
								<img className="cartImage" src={cv.images[0]} />
								<div className="productInfo">
									<h3> {cv.name} </h3>
									<p>Product Varaint</p>
								</div>
							</div>

							<h3>${cv.price}</h3>
							<img src={times_icon} />
							<div className="quantityContainer">
								<img
									className="quantityBTN"
									src={subtract_icon}
									onClick={() => {
										console.log(cv.quantity);
										decrement(cv.productId);
									}}
								/>
								<div className="quantityCounter">
									<h3>{cv.quantity}</h3>
								</div>
								<img
									className="quantityBTN"
									src={add_icon}
									onClick={() => {
										console.log(cv.quantity);
										increment(cv.productId);
									}}
								/>
							</div>

							<img className="equalsIcon" src={equals_icon} />

							<h3>${Number.parseFloat(cv.price * cv.quantity).toFixed(2)}</h3>
							<img
								className="deleteIcon"
								src={delete_icon}
								onClick={() => {
									console.log('click fired', cv);
									removeItem(cv);
								}}
							/>
						</div>
					);
				})
			) : (
				''
			)}
		</div>
	);
};

export default CartTable;
