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
      dispatch({ type: types.GET_CURRENT_USER, payload: res.data._id })
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
