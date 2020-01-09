import * as types from './actionTypes'
import AxiosAuth from '../components/Auth/axiosWithAuth'

const getUserUrl = 'https://shopping-cart-eu3-staging.herokuapp.com/api/store/'

export const updateForm = details => ({
  type: types.UPDATE_FORM,
  payload: details
})

export const getCurrentUser = () => dispatch => {
  AxiosAuth()
    .get(getUserUrl)
    .then(res => {
      dispatch({ type: types.GET_CURRENT_USER, payload: res.data })
      AxiosAuth()
        .get(
          `https://shopping-cart-eu3-staging.herokuapp.com/api/store/${res.data._id}/products`
        )
        .then(res => {
          const inventory = res.data
          dispatch({ type: types.GET_INVENTORY, payload: inventory })
        })
    })
    .catch(error => {
      console.log(error)
    })
}

export const logout = () => {
  return {
    type: types.LOGOUT_USER
  }
}

export const setLoading = isLoading => {
  return {
    type: types.LOADING,
    payload: isLoading
  }
}

export const setErrors = errors => {
  return {
    type: types.SET_ERRORS,
    payload: errors
  }
}

export const clearErrors = () => {
  return {
    type: types.CLEAR_ERRORS
  }
}
