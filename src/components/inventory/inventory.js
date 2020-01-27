import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, Input, Tabs } from 'antd'
import { NavLink } from 'react-router-dom'
// import '../../less/index.less'
import * as creators from '../../state/actionCreators'
import Expanded from './expand'

const { TabPane } = Tabs
const { Search } = Input

const Inventory = () => {
  const [searchString, setSearchString] = useState('')
  const change = e => {
    setSearchString(e.target.value)
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(creators.getCurrentUser())
  }, [dispatch])

  const inventory = useSelector(state => state.store)
  const storeDetails = useSelector(state => state.user)

  const [sign, setSign] = useState('')
  const fixCurrency = (storeDetails) => {
    if (storeDetails.user.currency === 'POU') {
      setSign('£')
    } else if (storeDetails.user.currency === 'DOL') {
      setSign('$')
    } else if (storeDetails.user.currency === 'EUR') {
      setSign('€')
    } else if (storeDetails.user.currency === 'YEN') {
      setSign('¥')
    } else {
      return undefined
    }
  }
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

  return (
    <div className='cover inventory'>
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
            {storeDetails.user.storeName ? (
              <h2>{storeDetails.user.storeName}</h2>
            ) : (
              <h2>Your Store</h2>
            )}
          </div>
          <div>
            <Tabs className='tabs' defaultActiveKey='1'>
              <TabPane tab='Collapse' key='1'>
                <Items inventory={searchString ? searchFilter : inventory} currency={sign} />
              </TabPane>
              <TabPane tab='Expand' key='2'>
                <Expanded inventory={searchString ? searchFilter : inventory} currency={sign} />
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
    <List
      size='small'
      itemLayout='horizontal'
      dataSource={inventory}
      renderItem={item => {
        return (
          <List.Item className='block'>
            <List.Item.Meta
              title={
                <div className='list title short'>
                  <h3>{item.name}</h3>
              <div>{currency}{item.price}</div>
                </div>
              }
              description={
                <div className='list short'>
                  <div>{item.description}</div>
                  <NavLink to={`/updateitem/${item._id}`}>
                    <div>Edit</div>
                  </NavLink>
                </div>
              }
            />
          </List.Item>
        )
      }}
    />
  )
}

export default Inventory
