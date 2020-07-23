import React from 'react'
import Stripe from './stripe'

function StripeMain (props) {
  const cartId = props.match.params.id
  return (
    <div data-testid='stripeMainWrapper'>
      <Stripe cartId={cartId} />
    </div>
  )
}

export default StripeMain
