import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosWithAuth from '../Auth/axiosWithAuth';
import stripeLogo from '../../images/stripeLogo.svg';
import Navbar from '../Navbar';

function Account() {
	const [ stripeAccount, setStripeAccount ] = useState(null);

	// Request to the database asking for stripe info - If none *Sign Up path* Else *Disconnection Path*
	useEffect(() => {
		axiosWithAuth()
			.get('/api/auth/getseller')
			.then((res) => {
				console.log('get Seller Res', res.data);
				res.data.access_token ? setStripeAccount(res.data) : console.log('get Seller Res', res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	function startStripe() {
		window.location.href = 'https://pure-retail-ft-stripe-3tynhitt.herokuapp.com/api/auth/stripe/authorize';
	}

	function disconnectStripe() {
		const payload = {
			access_token: '',
			refresh_token: '',
			register_date: '',
			stripe_publishable_key: '',
			stripe_user_id: ''
		};
		axiosWithAuth()
			.put('/api/auth/getseller', payload)
			.then((res) => {
				setStripeAccount(null);
			})
			.catch((err) => console.log(err));
	}

	return (
		<div>
			<Navbar />
			<div className="accountContainer">
				<h1> Account</h1>
				{stripeAccount ? (
					<div className="accountInfocontainer">
						<div className="stripeId">
							<h3>Stripe ID: {stripeAccount.stripe_user_id.toUpperCase()} </h3>
						</div>
						<div className="connectionStatus">
							<h3 className="goodStatus"> Stripe Account Connected!</h3>
						</div>
					</div>
				) : (
					<div className="accountInfocontainer">
						<div className="stripeId">
							<h3>Stripe ID: </h3>
						</div>
						<div className="connectionStatus">
							<h3 className="badStatus"> Your Stripe account is not connected </h3>
						</div>
					</div>
				)}

				{stripeAccount ? (
					<button onClick={() => {}} className="stripeButton disconnect">
						<img src={stripeLogo} />
						<h3> Disconnect Stripe </h3>
					</button>
				) : (
					<button
						onClick={() => {
							startStripe();
						}}
						className="stripeButton"
					>
						<img src={stripeLogo} />
						<h3> Connect To Stripe </h3>
					</button>
				)}
			</div>
		</div>
	);
}

export default Account;
