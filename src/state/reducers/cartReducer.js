import * as types from '../actionTypes'

const initialCart = []

export function cartReducer (state = initialCart, action) {
  switch (action.type) {
    case types.ADD_TO_CART:
      return state.concat(action.payload)

    case types.ADD_TO_CART_SINGLE_PRODUCT:
      if (state.length === 0) {
        return [...state, action.payload]
      } else {
        // filter out array excluding existing item
        const filteredState = state.filter(
          item => item.productId !== action.payload.productId
        )
        // find product by id
        const product = state.filter(
          item => item.productId === action.payload.productId
        )[0]
        product.quantity = product.quantity + action.payload.quantity

        return [...filteredState, product]
      }

    default:
      return state
  }
}
