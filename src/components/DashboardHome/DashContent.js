import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tabs } from 'antd'
import useCurrency from '../hooks/useCurrency'
import Pane1 from './Pane1'
import Pane2 from './Pane2'
import * as actionCreators from '../../state/actionCreators'

const { TabPane } = Tabs

const Content = ({ currency, storeId }) => {
  const dispatch = useDispatch()
  const sign = useCurrency(currency)
  useEffect(() => {
    dispatch(actionCreators.getSalesHistory())
  }, [dispatch, storeId])
  const dashboard = useSelector(state => state.dashboard)
  return (
    <div>
      <Tabs defaultActiveKey='1' className='content'>
        <TabPane tab='Overview' key='1'>
          <Pane1
            currency={sign}
            amount={dashboard && dashboard.totalSales}
            monthSales={dashboard && dashboard.monthSales}
          />
        </TabPane>
        <TabPane tab='Sales History' key='2'>
          {dashboard &&
          dashboard.transactionDetails &&
          dashboard.transactionDetails.length > 0 ? (
            dashboard.transactionDetails.map(sale => (
              <Pane2
                currencySymbol={sign}
                currency={currency.toUpperCase()}
                key={sale._id}
                name={sale.name.trim()}
                price={sale.price}
                description={sale.description}
                checkoutDate={sale.checkoutDate}
              />
            ))
          ) : (
            <p>You haven't made any sales yet</p>
          )}
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Content

// get dashboard details from the dashboard component
// run the component did mount function from the main component
