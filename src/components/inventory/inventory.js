import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, List, Input, Tabs } from 'antd'
import '../../less/index.less'
import * as creators from '../../state/actionCreators'
import Expanded from './expand'

const { TabPane } = Tabs
const { Search } = Input

const Inventory = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(creators.getCurrentUser())
  }, [dispatch])
  const inventory = useSelector(state => state.store)
  console.log(inventory)
  return (
    <div className='cover inventory'>
      <div className='top'>
        <div className='search'>
          <Search
            placeholder='search'
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </div>
        <div className='content'>
          <div>
            <h2>Your Store</h2>
          </div>
          <div>
            <Tabs className='tabs' defaultActiveKey='1'>
              <TabPane tab='Collapse' key='1'>
                <Items inventory={inventory} />
              </TabPane>
              <TabPane tab='Expand' key='2'>
                <Expanded inventory={inventory} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <div className='nav'>
        <ul id='nav_ul'>
          <li><Icon className='icon' type='home' />Home</li>
          <li><Icon className='icon' type='shop' />Store</li>
          <li id='add'><Icon className='icon' theme='filled' type='plus-circle' /></li>
          <li><Icon className='icon' type='wallet' />Account</li>
          <li><Icon className='icon' type='user' />Profile</li>
        </ul>
      </div>
    </div>
  )
}

const Items = ({ inventory }) => {
  return (
    <List
      size='small'
      itemLayout='horizontal'
      dataSource={inventory}
      renderItem={item => (
        <List.Item className='block'>
          <List.Item.Meta
            title={
              <div className='list title'>
                <h3>{item.name}</h3>
                <div>{item.price}</div>
              </div>
            }
            description={
              <div className='list'>
                <div>{item.description}</div>
                <div>Edit</div>
              </div>
            }
          />
        </List.Item>
      )}
    />
  )
}

export default Inventory
