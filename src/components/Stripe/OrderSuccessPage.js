import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const OrderSuccessPage = props => {
  const [storeUrl, setStoreUrl] = useState('')
  const [storeDetails, setStore] = useState({})
  useEffect(() => {
    setStoreUrl(localStorage.getItem('storeUrl'))
    setStore({ ...JSON.parse(localStorage.getItem('user')) })
  }, [])
  return (
    <div className='cover'>
      <div className='store-logo'>
        {storeDetails.imageUrl === null ? (
          undefined
        ) : (
          <img
            alt='logo'
            src={storeDetails.imageUrl}
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
        <Link to={storeUrl}>Back to {storeDetails.storeName}</Link>
      </Button>
    </div>
  )
}

export default OrderSuccessPage
