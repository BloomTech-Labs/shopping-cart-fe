import * as types from '../actionTypes'

const initialCart = []

const remItem = (state, action) => {
  const open = state.map(item => {
    return item.id
  }).indexOf(action.payload._id)
  return state.splice(open, 1)
}

export function cartReducer (state = initialCart, action) {
  switch (action.type) {
    case types.ADD_TO_CART:
      return state.concat(action.payload)
    case types.REMOVE_ITEM_FROM_CART:
      return remItem(state, action)
    default:
      return state
  }
}
