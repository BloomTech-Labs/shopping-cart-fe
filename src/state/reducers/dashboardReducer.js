import * as types from '../actionTypes'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SALES_HISTORY:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
