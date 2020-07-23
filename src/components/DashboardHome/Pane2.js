import React from 'react'
import { Icon } from 'antd'
import moment from 'moment'

const Pane2 = ({
  currencySymbol,
  name,
  description,
  price,
  checkoutDate,
  quantity
}) => {
  const date = moment(checkoutDate)

  return (
    <div className='Card2' data-testid='panelTwoDiv'>
      <div className='sales-history'>
        <Icon type='check-circle' style={{ color: '#BFD7EA', flexBasis: 1 }} />
        <div className='product-description'>
          <p>{name}</p>
          <p>{description.slice(0, 30)}...</p>
          <p>Quantity: {quantity}</p>
        </div>
        <div className='date-price'>
          <p>{date.format('MMM D YYYY')}</p>
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
