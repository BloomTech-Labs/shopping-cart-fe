import * as types from '../actionTypes';

const initialStoreState = {
	products: [],
	allUniqueCategories: []
};

export function storeReducer(state = initialStoreState, action) {
	switch (action.type) {
		case types.GET_INVENTORY:
			return action.payload;

		default:
			return state;
	}
}
