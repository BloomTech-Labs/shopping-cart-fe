import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Icon, Badge, Input } from 'antd';
import * as creators from '../../state/actionCreators';
import history from '../../history';
import useCurrency from '../hooks/useCurrency';
import NoLogo from '../../images/PureRetail_Logo.png';

const CartHeader = ({
	logoPath,
	badgeCount = 0,
	currency = '',
	totalDue = 0,
	displayBack,
	displayTotal,
	top = false
}) => {
	const dispatch = useDispatch();
	const cartContents = useSelector((state) => state.cart);
	const storeDetails = useSelector((state) => state.user.user);
	const sign = useCurrency(storeDetails.currency);
	const totalPrice = (arr) => {
		return arr.reduce((sum, item) => {
			return sum + item.price * item.quantity;
		}, 0);
	};
	const totalQuantity = (arr) => {
		return arr.reduce((sum, item) => {
			return sum + item.quantity;
		}, 0);
	};
	const change = (e) => {
		dispatch(creators.setString(e.target.value));
	};
	return (
		<Row className={top ? 'color cart-header' : 'cart-header'} type="flex" justify="space-between" align="middle">
			<Col span={6} className="logo">
				{displayBack ? (
					<Icon onClick={history.goBack} type="left-circle" />
				) : (
					<img src={logoPath || NoLogo} alt="Store Logo" />
				)}
			</Col>
			<Col span={12} className="total">
				{displayTotal ? (
					`Total: ${sign}${totalPrice(cartContents).toFixed(2)}`
				) : (
					<Input onChange={change} placeholder="Search..." />
				)}
			</Col>
			<NavLink to="/review">
				<Col span={6} className="icon">
					<Badge style={{ backgroundColor: 'gold', color: 'black' }} count={totalQuantity(cartContents)}>
						<Icon type="shopping-cart" style={{ color: 'black' }} />
					</Badge>
				</Col>
			</NavLink>
		</Row>
	);
};

export default CartHeader;
