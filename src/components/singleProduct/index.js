import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import StoreNav from '../store/StoreNav';
import SingleProductView from './buyerSingleProductView';

function Single(props) {
	const productId = props.match.params.id;
	const store = useSelector((state) => state.user);

	return (
		<div>
			<StoreNav store={store} />
			<SingleProductView productId={productId} />
		</div>
	);
}

export default Single;
