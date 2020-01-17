import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Input, Tabs, Affix, Icon, Button, Badge } from 'antd'
import '../../less/index.less'
import * as creators from '../../state/actionCreators'

const { TabPane } = Tabs
const { Search } = Input
const { Meta } = Card

const StoreMain = (props) => {
  const { sellerId } = props
  const [searchString, setSearchString] = useState('')
  const [currency, setCurrency] = useState('')
  const [top] = useState(10)
  const [scroll, setScroll] = useState(false)
  const change = e => {
    setSearchString(e.target.value)
  }
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
  // window.onscroll = function()
  // {
  //   setScroll(true)
  // }
  return (
    <div className='cover store'>
      <div className='store-top'>
        <div className='store-info'>
          <div className='store-logo'>
            {storeDetails.imageUrl === null ? undefined : <img alt='logo' src={storeDetails.imageUrl} className='image' />}
            <div className='cart'>
              <Affix offsetTop={top}>
                <Badge count={5} style={{ backgroundColor: 'gold', color: 'black' }}>
                  <Icon type='shopping-cart' style={{ fontSize: '3rem' }} />
                </Badge>
              </Affix>
            </div>
          </div>
          <div className='storeName'>
            <h2>{storeDetails.storeName}</h2>
          </div>
        </div>
        <Affix offsetTop={top}>
          <div className={scroll ? 'searchbar' : 'transparent'}>
            <Search
              onChange={change}
              placeholder='search'
              style={{ width: 200 }}
            />
          </div>
        </Affix>
        <div className='content'>
          <div>
            <h2>{storeDetails.name}</h2>
          </div>
          <div>
            <Tabs className='tabs' defaultActiveKey='1'>
              <TabPane tab='Large Detail' key='1'>
                <div className='large_wrap'>
                  <LargeItems inventory={searchString ? searchFilter : inventory} currency={currency} />
                </div>
              </TabPane>
              <TabPane tab='Small Detail' key='2'>
                <div className='wrap'>
                  <Items inventory={searchString ? searchFilter : inventory} currency={currency} />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

const Items = ({ inventory, currency }) => {
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
                <Button style={{ color: '#FF5A5A' }} type='link' size='large'>Add to Cart</Button>
              </div>
            </div>
          }
        />
      </Card>
    ))
  )
}

const LargeItems = ({ inventory, currency }) => {
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
          ? <img style={{ width: '100%', height: '32rem', margin: '0'}} alt='item' src={item.images[0]} />
          : undefined}
      >
        <Meta
          title={
            <div className='label'>
              <h3 className='desc'>{item.name}</h3>
              <div className='price'>{currency}{item.price}</div>
              <div className='add'>
                <Button onClick={() => {console.log(item) }} style={{color: '#FF5A5A'}} type='link' size='large'>Add to Cart</Button>
              </div>
            </div>
          }
        />
      </Card>
    ))
  )
}

export default StoreMain
