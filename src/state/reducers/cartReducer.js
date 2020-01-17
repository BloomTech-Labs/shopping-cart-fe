import * as types from '../actionTypes'

const initialCart = []

export function cartReducer (state = initialCart, action) {
  switch (action.type) {
    case types.ADD_TO_CART:
      return state.concat(action.payload)

    default:
      return state
  }
}
