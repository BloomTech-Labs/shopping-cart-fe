import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Tabs, Button, Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import * as creators from '../../state/actionCreators';
import useCurrency from '../hooks/useCurrency';
import stockImage from '../../images/PureRetail_Logo.png';
import ProductCard from './ProductCard';

const { TabPane } = Tabs;
const { Meta } = Card;

const StoreMain = (props) => {
	const { sellerId, cartContents, store } = props;

	const dispatch = useDispatch();
	useEffect(
		() => {
			creators.setLoading(true);
			dispatch(creators.getProducts(sellerId));
			dispatch(creators.getStore(sellerId));
			dispatch(creators.setStoreUrl(window.location.href));
			creators.setLoading(false);
		},
		[ sellerId, dispatch ]
	);
	const inventory = useSelector((state) => state.store);
	const storeDetails = store.user;
	const searchString = useSelector((state) => state.search);
	const currency = useCurrency(storeDetails.currency);
	const isLoading = useSelector((state) => state.user.isLoading);

	function searchObj(obj, string) {
		const regExpFlags = 'gi';
		const regExp = new RegExp(string, regExpFlags);
		return JSON.stringify(obj).match(regExp);
	}
	const removeItem = (item) => {
		dispatch(creators.subtractFromCart(item));
	};
	const searchFilter = inventory.filter(function(obj) {
		return searchObj(obj, searchString);
	});
	const dispatchItem = (item) => {
		dispatch(creators.addToCart(item));
	};

	const Items = ({ inventory, currency, dispatchItem, cartContents, removeItem }) => {
		console.log('cartContnets 🍕', inventory);
	};
	return (
		<div className="">
			{inventory ? (
				inventory.map((cv) => {
					return <ProductCard inventory={cv} key={cv._id} />;
				})
			) : (
				''
			)}
		</div>
	);
};

export default StoreMain;
