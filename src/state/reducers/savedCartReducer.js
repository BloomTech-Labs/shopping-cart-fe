import * as types from '../actionTypes'

const initialState = {}

export function savedCartReducer (state = initialState, action) {
  switch (action.type) {
    case types.SAVE_CART:
      return action.payload

    default:
      return state
  }
}
