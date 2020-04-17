import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Tabs, Button, Spin } from 'antd'
import { NavLink } from 'react-router-dom'
import * as creators from '../../state/actionCreators'
import useCurrency from '../hooks/useCurrency'
import stockImage from '../../images/PureRetail_Logo.png'

const { TabPane } = Tabs
const { Meta } = Card

const StoreMain = props => {
  const { sellerId, cartContents, store } = props

  const dispatch = useDispatch()
  useEffect(() => {
    creators.setLoading(true)
    dispatch(creators.getProducts(sellerId))
    dispatch(creators.getStore(sellerId))
    dispatch(creators.setStoreUrl(window.location.href))
    creators.setLoading(false)
  }, [sellerId, dispatch])
  const inventory = useSelector(state => state.store)
  const storeDetails = store.user
  const searchString = useSelector(state => state.search)
  const currency = useCurrency(storeDetails.currency)
  const isLoading = useSelector(state => state.user.isLoading)

  function searchObj (obj, string) {
    const regExpFlags = 'gi'
    const regExp = new RegExp(string, regExpFlags)
    return JSON.stringify(obj).match(regExp)
  }
  const removeItem = item => {
    dispatch(creators.subtractFromCart(item))
  }
  const searchFilter = inventory.filter(function (obj) {
    return searchObj(obj, searchString)
  })
  const dispatchItem = item => {
    dispatch(creators.addToCart(item))
  }
  return (
    <div className='cover store'>
      <Spin spinning={isLoading}>
        <div className='store-top'>
          <div className='store-info'>
            <div className='store-logo' id='create-store-logo'>
              <div className='content' style={{ paddingTop: '0' }}>
                <div>
                  <h2 style={{ paddingTop: '0' }}>{storeDetails.storeName}</h2>
                </div>
                <div className='card-bucket'>
                  <Tabs className='tabs' defaultActiveKey='1'>
                    <TabPane tab='Small Detail' key='1'>
                      <div className='wrap'>
                        <Items
                          inventory={searchString ? searchFilter : inventory}
                          currency={currency}
                          dispatchItem={dispatchItem}
                          cartContents={cartContents}
                          removeItem={removeItem}
                        />
                      </div>
                    </TabPane>
                    <TabPane tab='Large Detail' key='2'>
                      <div className='large_wrap'>
                        <LargeItems
                          inventory={searchString ? searchFilter : inventory}
                          currency={currency}
                          dispatchItem={dispatchItem}
                          cartContents={cartContents}
                          removeItem={removeItem}
                        />
                      </div>
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  )
}

const Items = ({
  inventory,
  currency,
  dispatchItem,
  cartContents,
  removeItem
}) => {
  const btnChange = item => {
    const itemObj = cartContents.find(({ productId }) => productId === item._id)
    return itemObj
  }
  return inventory.map(item => (
    <Card
      key={item.name}
      hoverable
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'top',
        width: '45%',
        margin: '0.5rem',
        boxSizing: 'border-box',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        borderRadius: '1rem'
      }}
      cover={
        item.images[0] ? (
          <NavLink to={`/product/${item._id}`}>
            <img
              style={{ width: '100%', borderRadius: '1rem' }}
              alt='item'
              src={item.images[0]}
            />
          </NavLink>
        ) : (
          <NavLink to={`/product/${item._id}`}>
            <img
              style={{ width: '100%', borderRadius: '1rem' }}
              alt='item'
              src={stockImage}
            />
          </NavLink>
        )
      }
    >
      <Meta
        title={
          <div className='small-label'>
            <div className='item-text'>
              <NavLink to={`/product/${item._id}`}>
                <p>{item.name}</p>
                <div className='sprice'>
                  {currency}
                  {item.price}
                </div>
              </NavLink>
            </div>
            <div>
              {!btnChange(item) ? (
                <Button
                  onClick={() => dispatchItem(item)}
                  style={{ color: '#FF5A5A' }}
                  type='link'
                  size='large'
                >
                  Add to Cart
                </Button>
              ) : (
                <Button
                  onClick={() => removeItem(item)}
                  style={{ color: 'dodgerblue' }}
                  type='link'
                  size='large'
                >
                  Remove from Cart
                </Button>
              )}
            </div>
          </div>
        }
      />
    </Card>
  ))
}

const LargeItems = ({
  inventory,
  currency,
  dispatchItem,
  cartContents,
  removeItem
}) => {
  const btnChange = item => {
    const itemObj = cartContents.find(({ productId }) => productId === item._id)
    return itemObj
  }
  return inventory.map(item => (
    <Card
      key={item.name}
      bordered='false'
      className='cards'
      hoverable
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        margin: '0.5rem',
        borderRadius: '2rem',
        boxSizing: 'border-box',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
      }}
      cover={
        item.images[0] ? (
          <NavLink to={`/product/${item._id}`}>
            <img
              style={{ width: '100%', height: 'auto', margin: '0' }}
              alt='item'
              src={item.images[0]}
            />
          </NavLink>
        ) : (
          <NavLink to={`/product/${item._id}`}>
            <img
              style={{ width: '100%', height: 'auto', margin: '0' }}
              alt='item'
              src={stockImage}
            />
          </NavLink>
        )
      }
    >
      <Meta
        title={
          <div className='label'>
            <NavLink to={`/product/${item._id}`}>
              <h3 className='desc'>{item.name}</h3>
              <div className='price'>
                {currency}
                {item.price}
              </div>
            </NavLink>
            <div className='add'>
              {!btnChange(item) ? (
                <Button
                  onClick={() => dispatchItem(item)}
                  style={{ color: '#FF5A5A' }}
                  type='link'
                  size='large'
                >
                  Add to Cart
                </Button>
              ) : (
                <Button
                  onClick={() => removeItem(item)}
                  style={{ color: 'dodgerblue' }}
                  type='link'
                  size='large'
                >
                  Remove from Cart
                </Button>
              )}
            </div>
          </div>
        }
      />
    </Card>
  ))
}

export default StoreMain
