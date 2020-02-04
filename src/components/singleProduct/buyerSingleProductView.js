import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { Carousel, Button, Icon, Typography, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import * as creators from '../../state/actionCreators'
const { Paragraph } = Typography
function SingleProductView (props) {
  const [productState, setProductState] = useState([])
  const itemId = props.productId
  const dispatch = useDispatch()
  const cartContents = useSelector(state => state.cart)
  const isLoading = useSelector(state => state.user.isLoading)
  useEffect(() => {
    dispatch(creators.setLoading(true))
    axios
      .get(
        `https://shopping-cart-eu3.herokuapp.com/api/store/products/${itemId}`
      )
      .then(res => {
        setProductState(res.data)
        dispatch(creators.setLoading(false))
      })
      .catch(err => {
        dispatch(creators.setLoading(false))
        console.log(err)
      })
  }, [itemId, dispatch])

  const dispatchItem = item => {
    dispatch(creators.addToCart(item))
  }
  const removeItem = item => {
    dispatch(creators.subtractFromCart(item))
  }
  const btnChange = item => {
    const itemObj = cartContents.find(({ productId }) => productId === item._id)
    return itemObj
  }
  return (
    <div className='single-cover'>
      <Spin spinning={isLoading}>
        <div className='kol'>
          <Carousel className='img'>
            {productState.images &&
              productState.images.length &&
              productState.images.map((item, index) => (
                <div key={index}>
                  <img
                    style={{ width: '100%', margin: '0' }}
                    src={item}
                    alt='product'
                  />
                </div>
              ))}
          </Carousel>
          <div className='subKol'>
            <div className='subNameDesc'>
              <h1>{productState.name}</h1>
              <div>
                <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                  {productState.description}
                </Paragraph>
              </div>
            </div>
            <div className='subButton'>
              {!btnChange(productState) ? (
                <Button
                  style={{ border: '0' }}
                  onClick={() => dispatchItem(productState)}
                >
                  Add to Cart
                </Button>
              ) : (
                <Button
                  style={{ backgroundColor: '#FF6663', border: '0' }}
                  onClick={() => removeItem(productState)}
                >
                  Remove from Cart
                </Button>
              )}
            </div>
            <NavLink to='/review'>
              <div
                style={{
                  backgroundColor: '#00000',
                  border: '0',
                  borderRadius: '1.5rem'
                }}
                className='subFooter'
              >
                <h1>Go to your cart</h1>
                <Icon
                  style={{
                    fontSize: '2.5rem',
                    color: 'white',
                    marginTop: '0.9rem',
                    marginLeft: '0.4rem'
                  }}
                  type='shopping-cart'
                />
              </div>
            </NavLink>
          </div>
        </div>
      </Spin>
    </div>
  )
}

export default SingleProductView
