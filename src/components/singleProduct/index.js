import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StoreNav from '../store/StoreNav';
import SingleProductView from './SingleProductView';
import * as creators from '../../state/actionCreators';
function Single(props) {
	const dispatch = useDispatch();
	const productId = props.match.params.id;
	const store = useSelector((state) => state.user);
	useEffect(
		() => {
			dispatch(creators.getCurrentUser());
		},
		[ dispatch ]
	);
	return (
		<div>
			<StoreNav store={store.user} />
			<SingleProductView productId={productId} />
		</div>
	);
}

export default Single;
