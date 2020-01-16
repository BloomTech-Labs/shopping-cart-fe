import React from 'react';
import {injectStripe} from 'react-stripe-elements';

import CardSection from './CardSection';

const CheckoutForm = (props) => {
  const handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // See our confirmCardPayment documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
    props.stripe.confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
      payment_method: {
        card: props.elements.getElement('card'),
        billing_details: {
          name: 'Jenny Rosen',
        },
      }
    }).then(res => {
        console.log(res)
        if(res.paymentIntent){
            alert('Transaction Succeeded')
        } else {
            alert('Transaction Failed')
        }
    }).catch(err => {
        alert(err.message)
    });
  };

    return (
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button>Confirm order</button>
      </form>
    );
}

export default injectStripe(CheckoutForm);