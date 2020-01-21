import * as types from '../actionTypes'

const initialState = {}

export function savedCartReducer (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_FORM:
      return action.payload

    default:
      return state
  }
}
