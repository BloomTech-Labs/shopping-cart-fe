import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StripeProvider } from 'react-stripe-elements'
import axios from 'axios'
import { Collapse } from 'antd'
import '../../less/index.less'

import MyStoreCheckout from './MyStoreCheckout'

const { Panel } = Collapse

const Stripe = () => {
  const [clientId, setClientId] = useState('')
  const cartContents = useSelector(state => state.savedCart)
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
    <div className='payments-cover'>
      <div className='checkout'>
        <h4>Check out</h4>
        <div className='order'>
          <p>Order Summary</p>
          <div className='summary'>
            {
              cartContents.content.map(item => (
                <div className='units' key={item.productId}>{item.name}({item.quantity} units) - {item.price}</div>
              ))
            }
          </div>
          <div className='summary left'>
            <div className='units'><span style={{ color: '#FF6663' }}>Total:</span> <span>{cartContents.total}</span></div>
            <div className='units'><span style={{ color: '#FF6663' }}>Delivery preference:</span> <span>{cartContents.delivery}</span></div>
            <div className='units'><span style={{ color: '#FF6663' }}>Payment preference:</span> <span>{cartContents.payment}</span></div>
            <div className='units'><span style={{ color: '#FF6663' }}>Date saved:</span> <span>{cartContents.date}</span></div>
          </div>
        </div>
      </div>
      <div className='lower'>
        <h4>Payment Methods</h4>
        <Collapse accordion>
          <Panel header='Pay with card' key='1'>
            <StripeProvider apiKey='pk_test_TYooMQauvdEDq54NiTphI7jx'>
              <MyStoreCheckout clientId={clientId} />
            </StripeProvider>
          </Panel>
          <Panel header='Pay with USSD' key='2'>
            <div className='cash-text'>
            Transfer $239.35 to the seller, and once
            they confirm receipt, you’ll be redirected
            automatically to the order confirmation page.
            (Note: the speed of this process depends on how
            quickly the seller can confirm receipt.)
            </div>
            <div className='cash-text'>
              <div>Seller Bank Number: 0151655066</div>
              <div>Seller Bank: GTBank</div>
              <div>Seller Account Name: Okpara Madubuochi</div>
              <div>Your bill: $239.35</div>
            </div>
          </Panel>
          <Panel header='Pay in person' key='3'>
            <div className='cash-text'>
            Please note that payment in person depends entirely
            on the seller’s willingness to keep these items in
            waiting for you. Most sellers tend to favor people who
            are buying items immediately.
            </div>
            <div className='cash-text'>
            Follow these instructions to pay in person:
              <div>1. Click here to copy your cart URL</div>
              <div>2. Click the WhatsApp icon below to share your cart
              URL and discuss arrangements for paying in person.
              </div>
            </div>
            <div className='cash-text'>
            This arrangement deals in honor: reneging on this
            arrangement prevents the seller from clearing items
            they could have sold to someone else and makes
            them lose faith in humanity. You wouldn’t want that,
            would you?
            </div>
          </Panel>
        </Collapse>
        <div className='save'>
          <div className='save-btn'>
            Complete transaction
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stripe
