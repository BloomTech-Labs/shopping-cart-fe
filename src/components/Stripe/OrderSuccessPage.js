import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { useSelector } from 'react-redux'

const OrderSuccessPage = props => {
  const storeDetails = useSelector(state => state.user.user)
  const storeUrl = `/store/${storeDetails &&
    storeDetails.storeName &&
    storeDetails.storeName
      .toLowerCase()
      .split(' ')
      .join('-')}-${storeDetails && storeDetails._id}`

  return (
    <div className='cover'>
      <div className='store-logo'>
        {storeDetails && storeDetails.imageUrl === null ? (
          undefined
        ) : (
          <img
            alt='logo'
            src={storeDetails && storeDetails.imageUrl}
            className='image'
            width='150'
            style={{ borderRadius: '50%' }}
          />
        )}
      </div>
      <h2 className='text'>Order confirmed Successfully!</h2>
      <p className='text'>Your order for the item was successfully processed</p>
      <p className='text'>
        Arrangements are being made for you to receive your product
      </p>

      <Button id='delete-btn' type='link' htmlType='button'>
        <Link onClick={() => localStorage.clear()} to={storeUrl}>
          Back to {storeDetails && storeDetails.storeName}
        </Link>
      </Button>
    </div>
  )
}

export default OrderSuccessPage
