import React from 'react'
import { Elements } from 'react-stripe-elements'

import InjectedCheckoutForm from './CheckoutForm'

const MyStoreCheckout = (props) => {
  return (
    <Elements>
      <InjectedCheckoutForm clientId={props.clientId} />
    </Elements>
  )
}

export default MyStoreCheckout
