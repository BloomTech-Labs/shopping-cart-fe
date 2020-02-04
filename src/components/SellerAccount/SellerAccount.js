import React, { useState, useEffect } from 'react'
import { Card, Button } from 'antd'
import axios from 'axios'
import Nav from '../elements/nav'
import withAuth from '../Auth/axiosWithAuth'

const storeURL = 'https://shopping-cart-eu3.herokuapp.com/api/store'
const stripeURL = 'https://shopping-cart-eu3.herokuapp.com/api/auth/stripe'

function Account () {
  const [stripeId, setStripeId] = useState('')
  const [storeId, setStoreId] = useState('')
  useEffect(() => {
    withAuth()
      .get(storeURL)
      .then(res => {
        setStoreId(res.data._id)
        setStripeId(res.data.stripeId)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const connectStripe = e => {
    e.preventDefault()
    axios
      .post(stripeURL, { storeId })
      .then(res => {
        window.location.href = stripeURL
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='seller-account'>
      <div className='main'>
        <h2>Account</h2>
        <Card
          className='Card'
          title='Your Stripe ID'
          style={{ fontWeight: '900' }}
        >
          <p id='stripeID'>
            {stripeId || 'Your stripe account is not connected'}
          </p>
        </Card>
        {stripeId ? (
          <Button onClick={connectStripe}>Change Stripe Id</Button>
        ) : (
          <Button onClick={connectStripe}>Connect to Stripe</Button>
        )}
      </div>
      <Nav />
    </div>
  )
}

export default Account
