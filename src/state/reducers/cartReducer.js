import * as types from '../actionTypes';

const initialCart = [];

const remItem = (state, action) => {
	const open = state.filter(function(obj) {
		if(obj.variantDetails.length > 2) {
			return obj.productId !== action.payload.productId;
		}
		else {
			return obj.variantDetails[0]._id !== action.payload.variantDetails[0]._id;
		}
	});
	return open;
};

const fxnAdd = (state, action) => {
	const itemObj = state.find(({ productId }) => productId === action.payload);
	const open = state.map((item) => {
		if (item.productId === itemObj.productId) {
			const bol = {
				...item,
				quantity: item.quantity + 1
			};
			return bol;
		}
		else {
			return {
				...item
			};
		}
	});
	return open;
};

const sub = (num) => {
	if (num === 1) {
		return 1;
	}
	else {
		return num - 1;
	}
};

const fxnSub = (state, action) => {
	console.log('state', state, 'action', action);
	const itemObj = state.find(({ productId }) => productId === action.payload);
	console.log('itemObj', itemObj);
	const close = state.map((item) => {
		if (item.productId === itemObj.productId) {
			return {
				...item,
				quantity: sub(item.quantity)
			};
		}
		else {
			return {
				...item
			};
		}
	});
	return close;
};

export function cartReducer(state = initialCart, action) {
	switch (action.type) {
		case types.ADD_TO_CART:
			return [
				...state,
				{
					productId: action.payload.productId,
					quantity: action.payload.quantity,
					price: action.payload.price,
					productName: action.payload.productName,
					images: action.payload.images,
					variantDetails: action.payload.variantDetails
				}
			];

		case types.REMOVE_ITEM_FROM_CART:
			return remItem(state, action);
		case types.INCREMENT:
			return fxnAdd(state, action);
		case types.DECREMENT:
			return fxnSub(state, action);
		default:
			return state;
	}
}
