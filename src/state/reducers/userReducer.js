import * as types from '../actionTypes'

const initialUserState = { isLoading: false }

export function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case types.GET_CURRENT_USER:
      return action.payload

    case types.LOGOUT_USER:
      return localStorage.removeItem('token')

    case types.LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}
