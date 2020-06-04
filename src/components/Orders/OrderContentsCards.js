import React, { useState } from 'react';
import timesIcon from '../../images/times-icon.svg';
import trashIcon from '../../images/trash_icon.svg';

// TODO: Once the end point is set up correctly, need to add the chosen variant

const OrderContentsCards = ({ order, RemoveItem }) => {
	const [ readyToDelete, setReadyToDelete ] = useState(false);

	function deleteDelay() {
		setReadyToDelete(true);
		setTimeout(function() {
			setReadyToDelete(false);
		}, 6000);
	}

	return (
		<div className="ProductCardContainer">
			{order ? (
				order.map((cv) => {
					return (
						<div className="OrderContents">
							<div className="orderItemInfo">
								<h3> {cv.quantity} </h3>
								<img src={timesIcon} />
								<div className="productContainer">
									<h3> {cv.product.productName} </h3>
									<h4> Variant Name Goes Here</h4>
								</div>
							</div>
							<div className="orderActions">
								{/* <div className="editBTN"> Edit </div> */}

								{readyToDelete ? (
									<div className="deleteFunction">
										<div
											className="deleteBTN"
											onClick={() => {
												RemoveItem(cv.product);
											}}
										>
											Delete Item?
										</div>
										<div className="loadBar" />
									</div>
								) : (
									<img
										src={trashIcon}
										onClick={() => {
											deleteDelay();
										}}
									/>
								)}
							</div>
						</div>
					);
				})
			) : (
				'loading'
			)}
		</div>
	);
};

export default OrderContentsCards;
