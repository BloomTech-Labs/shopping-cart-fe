import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Input, Tabs } from 'antd'
import '../../less/index.less'
import * as creators from '../../state/actionCreators'
// import Expanded from './expand'

const { TabPane } = Tabs
const { Search } = Input
const { Meta } = Card

const StoreMain = (props) => {
  const { sellerId } = props
  const [searchString, setSearchString] = useState('')
  const change = e => {
    setSearchString(e.target.value)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(creators.getProducts(sellerId))
    dispatch(creators.getStore())
  }, [sellerId, dispatch])

  const inventory = useSelector(state => state.store)
  const storeDetails = useSelector(state => state.user)

  function searchObj (obj, string) {
    const regExpFlags = 'gi'
    const regExp = new RegExp(string, regExpFlags)
    return JSON.stringify(obj).match(regExp)
  }

  const searchFilter = inventory.filter(function (obj) {
    return searchObj(obj, searchString)
  })

  return (
    <div className='cover'>
      <div className='top'>
        <div className='search'>
          <Search
            onChange={change}
            placeholder='search'
            style={{ width: 200 }}
          />
        </div>
        <div className='content'>
          <div>
            <h2>{storeDetails.name}</h2>
          </div>
          <div>
            <Tabs className='tabs' defaultActiveKey='1'>
              <TabPane tab='Large Detail' key='1'>
                <div className='large_wrap'>
                  <LargeItems inventory={searchString ? searchFilter : inventory} />
                </div>
              </TabPane>
              <TabPane tab='Small Detail' key='2'>
                <div className='wrap'>
                  <Items inventory={searchString ? searchFilter : inventory} />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

const Items = ({ inventory }) => {
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
            height: '20rem',
            margin: '0.5rem',
            boxSizing: 'border-box',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
          }
        }
        cover={
          item.images[0] ? <img style={{ width: '100%', height: '13rem' }} alt='item' src={item.images[0]} /> : undefined
        }
      >
        <Meta
          title={
            <div>
              <h3>{item.name}</h3>
            </div>
          }
        />
      </Card>
    ))
  )
}

const LargeItems = ({ inventory }) => {
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
            height: '37rem',
            margin: '0.5rem',
            boxSizing: 'border-box',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
          }
        }
        cover={item.images[0]
          ? <div>
            <img style={{ width: '100%', height: '32rem', margin: '0' }} alt='item' src={item.images[0]} />
            <div className='overlay'>
                <div className='overlay_text'>Details</div>
                <div className='overlay_text'>Add</div>
            </div>
          </div>
          : undefined
        }
      >
        <Meta
          title={
            <div className='label'>
              <h3>{item.name}</h3>
            </div>
          }
        />
      </Card>
    ))
  )
}

export default StoreMain
