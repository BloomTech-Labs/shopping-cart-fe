import React from 'react'
import { message } from 'antd'
import { injectStripe } from 'react-stripe-elements'
import CardSection from './CardSection'
import history from '../../history'

const CheckoutForm = (props) => {
  const handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault()

    // See our confirmCardPayment documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
    props.stripe.confirmCardPayment(props.clientId, {
      payment_method: {
        card: props.elements.getElement('card'),
        billing_details: {
          name: 'Jenny Rosen'
        }
      }
    }).then(res => {
      if (res.paymentIntent) {
        history.push('/success')
      } else {
        message.error('Transaction failed')
      }
    }).catch(err => {
      message.error(err.message)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button>Confirm order</button>
    </form>
  )
}

export default injectStripe(CheckoutForm)
