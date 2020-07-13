import React  from 'react';
import {  useSelector } from 'react-redux';
import history from '../../history';
import CartTable from './CartTable';

const CartView = () => {

	const cartContents = useSelector((state) => state.cart);
	const totalPrice = (arr) => {
		return arr.reduce((sum, item) => {
			return sum + item.price * item.quantity;
		}, 0);
	};

	return (
		<div className="cartMasterContainer">
			<div className="cartHeader">
				<div
					className="backButton"
					onClick={() => {
						history.goBack();
					}}
				>
					← Back
				</div>
			</div>
			<CartTable cartContents={cartContents}  totalPrice ={totalPrice}/>
		</div>
	);
};

export default CartView;
