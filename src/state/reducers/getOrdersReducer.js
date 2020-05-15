import * as types from "../actionTypes";

export const initialState = { orders: [] };

export const getOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ORDERS:
      console.log({ orders: action.payload }, "coming from reducer");
      return { ...state, orders: action.payload };

    default:
      return state;
  }
};
