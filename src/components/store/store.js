import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Tabs, Button } from 'antd'
import '../../less/index.less'
import * as creators from '../../state/actionCreators'

const { TabPane } = Tabs
const { Meta } = Card

const StoreMain = (props) => {
  const { sellerId } = props
  const [currency, setCurrency] = useState('')
  const fixCurrency = (storeDetails) => {
    if (storeDetails.currency === 'POU') {
      setCurrency('£')
    } else if (storeDetails.currency === 'DOL') {
      setCurrency('$')
    } else if (storeDetails.currency === 'EUR') {
      setCurrency('€')
    } else if (storeDetails.currency === 'YEN') {
      setCurrency('¥')
    } else {
      return undefined
    }
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(creators.getProducts(sellerId))
    dispatch(creators.getStore(sellerId))
  }, [sellerId, dispatch])
  const inventory = useSelector(state => state.store)
  const storeDetails = useSelector(state => state.user.user)
  const searchString = useSelector(state => state.search)
  const cartContents = useSelector(state => state.cart)
  console.log(cartContents)
  useEffect(() => {
    fixCurrency(storeDetails)
  }, [storeDetails])

  function searchObj (obj, string) {
    const regExpFlags = 'gi'
    const regExp = new RegExp(string, regExpFlags)
    return JSON.stringify(obj).match(regExp)
  }
  const searchFilter = inventory.filter(function (obj) {
    return searchObj(obj, searchString)
  })
  const dispatchItem = (item) => {
    dispatch(creators.addToCart(item))
  }
  const removeItem = (item) => {
    dispatch(creators.subtractFromCart(item))
  }
  return (
    <div className='cover store'>
      <div className='store-top'>
        <div className='store-info'>
          <div className='store-logo'>
            {storeDetails.imageUrl === null ? undefined : <img alt='logo' src={storeDetails.imageUrl} className='image' />}
          </div>
          <div className='storeName'>
            <h2>{storeDetails.storeName}</h2>
          </div>
        </div>
        <div className='content'>
          <div>
            <h2>{storeDetails.name}</h2>
          </div>
          <div>
            <Tabs className='tabs' defaultActiveKey='1'>
              <TabPane tab='Large Detail' key='1'>
                <div className='large_wrap'>
                  <LargeItems inventory={searchString ? searchFilter : inventory} currency={currency} dispatchItem={dispatchItem} cartContents={cartContents} removeItem={removeItem} />
                </div>
              </TabPane>
              <TabPane tab='Small Detail' key='2'>
                <div className='wrap'>
                  <Items inventory={searchString ? searchFilter : inventory} currency={currency} dispatchItem={dispatchItem} cartContents={cartContents} removeItem={removeItem} />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

const Items = ({ inventory, currency, dispatchItem, cartContents, removeItem }) => {
  const btnChange = (item) => {
    const itemObj = cartContents.find(({ productId }) => productId === item._id)
    return itemObj
  }
  return (
    inventory.map(item => (
      <Card
        key={item.name}
        hoverable
        style={
          {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '45%',
            margin: '0.5rem',
            boxSizing: 'border-box',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
          }
        }
        cover={
          item.images[0]
            ? <img style={{ width: '100%', height: '13rem' }} alt='item' src={item.images[0]} />
            : undefined
        }
      >
        <Meta
          title={
            <div className='small-label'>
              <p>{item.name}</p>
              <div className='sprice'>{currency}{item.price}</div>
              <div className='sadd'>
                {!btnChange(item)
                  ? <Button onClick={() => dispatchItem(item)} style={{ color: '#FF5A5A' }} type='link' size='large'>Add to Cart</Button>
                  : <Button onClick={() => removeItem(item)} style={{ color: 'dodgerblue' }} type='link' size='large'>Remove from Cart</Button>}
              </div>
            </div>
          }
        />
      </Card>
    ))
  )
}

const LargeItems = ({ inventory, currency, dispatchItem, cartContents, removeItem }) => {
  const btnChange = (item) => {
    const itemObj = cartContents.find(({ productId }) => productId === item._id)
    return itemObj
  }
  return (
    inventory.map(item => (
      <Card
        key={item.name}
        bordered='false'
        hoverable
        style={
          {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '90%',
            margin: '0.5rem',
            borderRadius: '2rem',
            boxSizing: 'border-box',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
          }
        }
        cover={item.images[0]
          ? <img style={{ width: '100%', height: '32rem', margin: '0' }} alt='item' src={item.images[0]} />
          : undefined}
      >
        <Meta
          title={
            <div className='label'>
              <h3 className='desc'>{item.name}</h3>
              <div className='price'>{currency}{item.price}</div>
              <div className='add'>
                {!btnChange(item)
                  ? <Button onClick={() => dispatchItem(item)} style={{ color: '#FF5A5A' }} type='link' size='large'>Add to Cart</Button>
                  : <Button onClick={() => removeItem(item)} style={{ color: 'dodgerblue' }} type='link' size='large'>Remove from Cart</Button>}
              </div>
            </div>
          }
        />
      </Card>
    ))
  )
}

export default StoreMain
