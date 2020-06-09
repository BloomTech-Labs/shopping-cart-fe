import * as types from "../actionTypes";

export const initialState = [];

export const getOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ORDERS:
      return action.payload;

    default:
      return state;
  }
};
