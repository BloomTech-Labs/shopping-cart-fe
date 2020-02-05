import * as types from '../actionTypes'

const initialUserState = {
  isLoading: false,
  errors: {},
  user: {},
  storeDetails: {},
  storeUrl: ''
}

export function userReducer (state = initialUserState, action) {
  switch (action.type) {
    case types.GET_CURRENT_USER:
      localStorage.setItem('user', JSON.stringify(action.payload))
      return {
        ...state,
        user: { ...action.payload }
      }

    case types.LOGOUT_USER:
      localStorage.removeItem('token')
      return state

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

    case types.DELETE_STORE:
      return {
        ...state,
        storeDetails: {}
      }

    case types.SET_STORE:
      return {
        ...state,
        storeDetails: { ...action.payload }
      }

    case types.CLEAR_STORE:
      return {
        ...state,
        storeDetails: {}
      }

    case types.CLEAR_USER:
      return {
        ...state,
        user: {}
      }

    case types.DELETE_ACCOUNT:
      return {
        ...state,
        isLoading: false,
        errors: {},
        user: {},
        storeDetails: {}
      }

    case types.SET_STORE_URL:
      localStorage.setItem('storeUrl', action.payload)
      return {
        ...state,
        storeUrl: action.payload
      }

    default:
      return state
  }
}
