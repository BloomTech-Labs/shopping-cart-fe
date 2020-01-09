import * as types from '../actionTypes'

const initialUserState = {}

export function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case types.GET_CURRENT_USER:
      return action.payload

    case types.LOGOUT_USER:
      localStorage.removeItem('token')

    default:
      return state
  }
}
