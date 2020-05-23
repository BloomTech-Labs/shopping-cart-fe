import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as creators from '../../state/actionCreators';
import useCurrency from '../hooks/useCurrency';
import NoLogo from '../../images/PureRetail_Logo.png';

import search_icon from '../../images/search-icon.svg';
import cart_icon from '../../images/cart-icon.svg';

const StoreNav = (
	{
		// logoPath,
		// badgeCount = 0,
	}
) => {
	const dispatch = useDispatch();
	const cartContents = useSelector((state) => state.cart);
	const storeDetails = useSelector((state) => state.user.user);
	const sign = useCurrency(storeDetails.currency);

	const totalQuantity = (arr) => {
		return arr.reduce((sum, item) => {
			return sum + item.quantity;
		}, 0);
	};
	const change = (e) => {
		dispatch(creators.setString(e.target.value));
	};
	return (
		<div className="navMasterContainer">
			<div>
				<img className="storeLogo" src={NoLogo} />
			</div>
			<div className="fakeSearchBar">
				<img className="searchIcon" src={search_icon} />
				<input className="searchBar" placeholder="Search..." onChange={change} />
			</div>
			<div className="cartAboutContainer">
				<p className="aboutUs"> About Us</p>
				<div className="badge">10</div>
				<img src={cart_icon} />
			</div>
		</div>
	);
};

export default StoreNav;
