import React from 'react'
import { Icon } from 'antd'
import moment from 'moment'

const Pane2 = ({ currencySymbol, name, description, price, checkoutDate }) => {
  const date = moment(checkoutDate)

  return (
    <div className='Card2'>
      <div className='PaneFlex'>
        <Icon type='check-circle' style={{ color: '#BFD7EA' }} />
        <div className='StoreTitle'>
          <h2 className='pull-left'>{name}</h2>
          <p className='pull-left'>{description}</p>
        </div>
        <div className='StorePrice'>
          <h2>{date.format('MMM D YYYY')}</h2>
          <p>
            {currencySymbol}
            {price}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Pane2
