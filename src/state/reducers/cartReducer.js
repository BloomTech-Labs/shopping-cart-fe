import * as types from '../actionTypes'

const initialCart = []

export function cartReducer (state = initialCart, action) {
  switch (action.type) {
    case types.ADD_TO_CART:
      return state.concat(action.payload)

    case types.ADD_TO_CART_SINGLE_PRODUCT:
      return [...state, action.payload]

    default:
      return state
  }
}
