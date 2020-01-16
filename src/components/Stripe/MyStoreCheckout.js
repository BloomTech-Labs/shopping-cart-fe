import React from 'react';
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './CheckoutForm';

const MyStoreCheckout = () => {
    return (
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    );
}

export default MyStoreCheckout;