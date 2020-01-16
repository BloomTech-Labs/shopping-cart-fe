import React from 'react';
import {StripeProvider} from 'react-stripe-elements';
import '../../less/index.less'

import MyStoreCheckout from './MyStoreCheckout';

const Stripe = () => {
  return (
    <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx" >
      <MyStoreCheckout />
    </StripeProvider>
  );
};

export default Stripe;