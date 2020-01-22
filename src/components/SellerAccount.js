import React from 'react'
import '../less/index.less'
// import Inventory from './inventory'
import Nav from './inventory/nav'
import {Card} from 'antd';
// import Footer from '../DashboardHome/Footer'

function Account () {
  return (
    <div style={{backgroundColor: "yellow"}}>
      <div>
          <h2>Account</h2>
          <h3>Account info</h3>
          <p>(this is how you get paid)</p>
        <Card />
      </div>
      <Nav />
    </div>
  )
}

export default Account;
