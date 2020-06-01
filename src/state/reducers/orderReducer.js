import * as types from "../actionTypes"

const initialOrders = [
]

const deleteOrder = (state, action) => {
  const removed = state.filter((obj) => {
    return obj.orderId !== action.payload._id
  })
  return removed
}
export function orderReducer(state = initialOrders, action) {
  switch (action.type) {
    case types.GET_ORDERS: 
      return action.payload
    case types.GET_ONE_ORDER:
      return action.payload
    case types.UPDATE_ORDER:
      return 
    case types.DELETE_ORDER:
      return deleteOrder(state, action)
    case types.DELETE_ORDER_PRODUCT:
      return state
    case types.UPDATE_ORDER_PRODUCT:
      return {
        ...state, 
        product: action.newProduct
      }
    default:
      return state
  }
}
