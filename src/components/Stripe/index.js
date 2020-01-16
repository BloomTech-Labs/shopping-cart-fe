import React, { useEffect, useState } from 'react'
import { StripeProvider } from 'react-stripe-elements'
import axios from 'axios'
import { Collapse } from 'antd'
import '../../less/index.less'

import MyStoreCheckout from './MyStoreCheckout'

const { Panel } = Collapse

const Stripe = () => {
  const [clientId, setClientId] = useState('')
  useEffect(() => {
    axios.post('http://localhost:4000/api/payment/charge', { amount: 4000 })
      .then(res => {
        setClientId(res.data.paymentIntent.client_secret)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <Collapse accordion>
      <Panel header='Pay with card' key='1'>
        <StripeProvider apiKey='pk_test_TYooMQauvdEDq54NiTphI7jx'>
          <MyStoreCheckout clientId={clientId}/>
        </StripeProvider>
      </Panel>
      <Panel header='Pay with USSD' key='2' disabled />
      <Panel header='Pay with cash' key='3' disabled />
    </Collapse>
  )
}

export default Stripe
