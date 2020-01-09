import * as types from '../actionTypes'

const initialUserState = { isLoading: false, errors: {} }

export function userReducer (state = initialUserState, action) {
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

    case types.SET_ERRORS:
      return {
        ...state,
        errors: { ...action.payload }
      }

    case types.CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      }

    default:
      return state
  }
}
