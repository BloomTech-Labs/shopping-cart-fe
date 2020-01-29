import React from 'react'
import './Dashboard.css'
import { Icon } from 'antd'
import moment from 'moment'

const Pane2 = ({ name, description, price, checkoutDate }) => {
  const date = moment(checkoutDate)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'usd',
    minimumFractionDigits: 2
  })
  return (
    <div className='Card2'>
      <div className='PaneFlex'>
        <Icon type='check-circle' style={{ color: '#BFD7EA' }} />
        <div className='StoreTitle'>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <div className='StorePrice'>
          <h2>{date.format('MMM D YYYY')}</h2>
          <p>{price}</p>
        </div>
      </div>
    </div>
  )
}

export default Pane2
