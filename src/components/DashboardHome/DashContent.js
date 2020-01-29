import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tabs } from 'antd'
import './Dashboard.css'
import Pane1 from './Pane1'
import Pane2 from './Pane2'
import * as actionCreators from '../../state/actionCreators'

const { TabPane } = Tabs

const Content = ({ currency, storeId }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionCreators.getSalesHistory(storeId))
  }, [dispatch, storeId])
  const user = useSelector(state => state.user.user)
  const dashboard = useSelector(state => state.dashboard)
  console.log(dashboard && dashboard.transactionDetails)
  return (
    <div>
      <Tabs defaultActiveKey='1' className='content'>
        <TabPane tab='Overview' key='1'>
          <Pane1
            currency={currency}
            amount={dashboard && dashboard.totalSales}
          />
        </TabPane>
        <TabPane tab='Sales History' key='2'>
          {dashboard &&
            dashboard.transactionDetails &&
            dashboard.transactionDetails.length &&
            dashboard.transactionDetails.map(sale => (
              <Pane2
                key={sale._id}
                name={sale.name}
                price={sale.paidAmount}
                description={sale.description}
                checkoutDate={sale.checkoutDate}
              />
            ))}
          <Pane2 />
          {/* Today
          <Pane2 />
          <Pane2 />
          Yesterday
          <Pane2 /> */}
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Content

// get dashboard details from the dashboard component
// run the component did mount function from the main component
