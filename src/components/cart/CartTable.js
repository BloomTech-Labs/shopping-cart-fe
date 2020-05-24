import React, { useState, useCallback, useEffect } from 'react';
import history from '../../history';
import times_icon from '../../images/times-icon.svg';
import equals_icon from '../../images/equals-icon.svg';
import delete_icon from '../../images/delete-icon.svg';
import testImage from '../../images/testImage.jpg';

const CartTable = ({ cartContents }) => {
	console.log('🥕', cartContents);
	return (
		<div className="cartMasterContainer">
			<div className="tableHeader">
				<p> Product</p>
				<p> Price</p>
				<p> Quantity</p>
				<p> Total</p>
			</div>

			{cartContents ? (
				cartContents.map((cv) => {
					return (
						<div className="cartProductCard">
							<div className="productSection">
								<img src={testImage} />
								<div className="productInfo">
									<h3> {cv.name} </h3>
									<p>Product Varaint</p>
								</div>
							</div>

							<h3>${cv.price}</h3>
							<img src={times_icon} />

							<input name="quantity" type="number" value={cv.quantity} min="1" />
							<img className="equalsIcon" src={equals_icon} />

							<h3>${cv.price * cv.quantity}</h3>
							<img className="deleteIcon" src={delete_icon} />
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
