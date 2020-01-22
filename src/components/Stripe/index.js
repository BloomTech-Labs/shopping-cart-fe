import React from 'react'
import '../../less/index.less'
import Stripe from './stripe'

function StripeMain (props) {
  const cartId = props.match.params.id
  return (
    <div>
      <Stripe cartId={cartId} />
    </div>
  )
}

export default StripeMain
