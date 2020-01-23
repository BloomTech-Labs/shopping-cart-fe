import React from 'react'
import './SellerAccount.css'
import Nav from '../inventory/nav'
import {Card} from 'antd'
import withAuth from '../Auth/axiosWithAuth';
import { Input } from 'antd';

const StripeURL = "https://shopping-cart-eu3.herokuapp.com/api/store/account";

// this.state = {
//   stripeId: '',
// }

// function addStripeID () {

// }

function Account () {
  return (
    <div>
      <div className='main'>
          <h2>Account</h2>
          {/* <h3>Account info</h3> */}
          {/* <p id="subheader">(this is how you get paid)</p> */}
          <Card className='Card' title={"Your Stripe ID"} style={{fontWeight:"900" }}>
        <p id="stripeID">18172771818177</p>
        </Card>
        <Input placeholder="default size" />
      </div>
      <Nav />
    </div>
  )
}

export default Account;
