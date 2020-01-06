import React, { useState, useEffect } from 'react'
import axiosWithAuth from '../Auth/axiosWithAuth'
import { ConfirmButton as Button } from '../Reusable/index'
import { Link } from 'react-router-dom'

const getStoreUrl = 'https://shopping-cart-eu3-staging.herokuapp.com/api/store/'
const editStoreUrl = 'https://shopping-cart-eu3-staging.herokuapp.com/api/store'

const SellerProflePage = () => {
  const [store, setStore] = useState({
    ownerName: '',
    currency: '',
    storeName: ''
  })

  useEffect(() => {
    axiosWithAuth()
      .get(getStoreUrl)
      .then(res => {
        const { ownerName, currency, storeName } = res.data
        setStore({ ownerName, currency, storeName })
      })
      .catch(err => {
        setErrors(err.response.data)
      })
  }, [])

  const [errors, setErrors] = useState({})

  const handleChange = e => {
    setStore({ ...store, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setErrors({})
    axiosWithAuth()
      .put(editStoreUrl, store)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        setErrors(err.response.data)
      })
  }

  const createStore = (
    <div>
      <p>You currently haven't created a store yet</p>
      <p>
        Click <Link to='/createStore'>here</Link> to create one
      </p>
    </div>
  )

  const editProfile = (
    <div>
      <h2>Seller profile page</h2>
      <form onSubmit={handleSubmit}>
        <label>Owner name</label>
        <input
          name='ownerName'
          type='text'
          placeholder='Enter owner name'
          value={store.ownerName}
          onChange={handleChange}
        />
        {errors.ownerName && <p>{errors.ownerName}</p>}

        <label>Currency</label>
        <input
          name='currency'
          type='text'
          placeholder='Enter currency'
          value={store.currency}
          onChange={handleChange}
        />
        {errors.currency && <p>{errors.currency}</p>}

        <label>Store name</label>
        <input
          name='storeName'
          type='text'
          placeholder='Enter store name'
          value={store.storeName}
          onChange={handleChange}
        />
        {errors.storeName && <p>{errors.storeName}</p>}

        <input type='submit' value='Edit Profile' />
      </form>
    </div>
  )

  return editProfile
}

export default SellerProflePage
