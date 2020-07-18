import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../components/Auth/axiosWithAuth';
import history from '../../history';
//assets
import checkIcon from '../../images/stripe/checkIcon.svg';
import connectingArrowIcon from '../../images/stripe/connectingArrowIcon.svg';
import errorIcon from '../../images/stripe/errorIcon.svg';
import pureRetailCircle from '../../images/stripe/pureRetailCircle.svg';
import stripeCircle from '../../images/stripe/stripeCircle.svg';

const StripeConfirmAccount = () => {
	const code = window.location.href.split('=');

	const [ stripeInfo, setStripeInfo ] = useState(null);
	const [ connectionStatus, setConnectionStatus ] = useState(null);

	useEffect(() => {
		axiosWithAuth()
			.get(`api/auth/stripe/token?code=${code[1]}`)
			.then((res) => {
				console.log('code[1]', code[1]);
				setStripeInfo(res.data.tokenRequest);
				console.log('res 1', res);
			})
			.catch((error) => {
				console.log('error 1', error);
			});
	}, []);

	setTimeout(() => {
		console.log(code);
		console.log(stripeInfo);
	}, 2000);

	stripeInfo
		? axiosWithAuth()
				.put('/api/auth/stripeUpdate', stripeInfo)
				.then((res) => {
					console.log('stripeInfo', stripeInfo);
					setConnectionStatus('Connected! Redirecting to the Dashboard');

					console.log(res);
				})
				.catch((err) => {
					setConnectionStatus('Failed: Redirecting To The Dashboard');
					console.log(err);
				})
		: console.log('nope');

	return (
		<div>
			<div className="connectContainerMain">
				<h1> Connecting Accounts</h1>
				<h3> Take a sip of coffee, this might take a moment</h3>
				<div className="connectingGraphics">
					<img src={pureRetailCircle} />
					<img className="connectingArrowsIcon" src={connectingArrowIcon} />
					<img src={stripeCircle} />
				</div>
				<div
					className={
						connectionStatus ? connectionStatus === 'Connected! Redirecting to the Dashboard' ? (
							'connectionStatus good'
						) : (
							'connectionStatus bad'
						) : (
							'hidden'
						)
					}
				>
					<img className="checkIcon" src={checkIcon} />
					<h3>{connectionStatus ? `${connectionStatus}` : ''} </h3>
				</div>
			</div>
		</div>
	);
};

export default StripeConfirmAccount;
