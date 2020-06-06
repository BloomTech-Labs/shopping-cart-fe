import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../Auth/axiosWithAuth';
import moment from 'moment';

const BuyerInfo = ({ fullOrder }) => {
	const { _id, orderCreated } = fullOrder;
	//Instead of using the full 10+ long ID shorten it to the last 5 digits
	const orderNumber = _id ? _id.substr(_id.length - 5) : 0;
	const [ currentStatus, setCurrentStatus ] = useState('Not Ready');
	const [ buttonStatus, setButtonStatus ] = useState('Order Prepaired');
	const allStatuses = [ 'Not Ready', 'Prepaired', 'Complete' ];
	const createdTimeFormated = moment(orderCreated).format('MMM DD YYYY');
	const [ completeDate, setCompleteDate ] = useState('-');

	function nextStatus(arg) {
		if (arg === 'Cancel') {
			return console("Action isn't ready yet");
		}
		const foundStatus = allStatuses.indexOf(arg);
		const newStatus = foundStatus + 1;
		setCurrentStatus(allStatuses[newStatus]);
		// TODO: Once I have the correct endpoint & key they will be added
		// TODO: Make sure to send up the CompletedDate

		if (currentStatus === 'Prepaired') {
			const completedTimeFormated = moment(Date.now()).format('MMM DD YYYY');
			return setCompleteDate(completedTimeFormated);
		}
	}

	function cancelOrder() {
		setCurrentStatus('Canceled');
		// TODO: Make a put request canceling the order
		axiosWithAuth();
		// 	.put('CorrectURL', {
		// 	currentStatus: currentStatus
		// })
		// 	.then((res) => {
		// 		console.log(res);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	}

	return (
		<div className="buyerInfoContainer">
			<div className="buyerInfoCard">
				<section className="topSection">
					<div
						onClick={() => {
							console.log(completeDate);
						}}
						className="OrderNumber"
					>
						<h4>Order:</h4>
						<h3 className="number"> {orderNumber} </h3>
					</div>
					<div className={`orderStatus ${currentStatus}`}>{currentStatus}</div>
				</section>
				<div className="divider" />
				<section className="bottomSection">
					<div className="startDataContainer">
						<h4>Order Made</h4>
						<h3> {createdTimeFormated}</h3>
					</div>
					<div className="startDataContainer">
						<h4>Order Complete</h4>
						<h3> {completeDate}</h3>
					</div>
				</section>
			</div>
			<div className="actionContainer">
				{currentStatus === 'Complete' ? (
					''
				) : (
					<div>
						<button
							className={buttonStatus == 'Complete Order' ? 'completeBTN' : 'ReadyBTN'}
							onClick={() => {
								nextStatus(currentStatus);
								setButtonStatus('Complete Order');
							}}
						>
							{buttonStatus}
						</button>
						<button
							onClick={() => {
								// cancelOrder();
							}}
							className="cancelBTN"
						>
							Cancel Order
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default BuyerInfo;
