import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const Stripe = () => {
  const handleToken = (token, addresses) => {
    console.log({ token, addresses })
  }

  return (
    <div>
      <StripeCheckout
        stripeKey='pk_test_H8Ph7y3z5k1zPreo3Hu2i94Q00LVbX4bY3'
        token={handleToken}
      />
    </div>
  )
}

export default Stripe
