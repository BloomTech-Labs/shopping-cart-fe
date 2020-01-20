import * as types from '../actionTypes'

const initialState = ''

export function searchReducer (state = initialState, action) {
  switch (action.type) {
    case types.SEARCHSTRING:
      return action.payload

    default:
      return state
  }
}
