import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import './Dashboard.css'
import Pane1 from './Pane1'
import Pane2 from './Pane2'

const { TabPane } = Tabs

const Content = ({ currency }) => {

  const [sign, setSign] = useState('')
  const fixCurrency = (currency) => {
    if (currency === 'POU') {
      setSign('£')
    } else if (currency === 'DOL') {
      setSign('$')
    } else if (currency === 'EUR') {
      setSign('€')
    } else if (currency === 'YEN') {
      setSign('¥')
    } else {
      return undefined
    }
  }
  useEffect(() => {
    fixCurrency(currency)
  }, [currency])

  return (
    <div>
      <Tabs defaultActiveKey='1' className='content'>
        <TabPane tab='Overview' key='1'>
          <Pane1 currency={sign} />
        </TabPane>
        <TabPane tab='Sales History' key='2'>
      Today
          <Pane2 />
          <Pane2 />
          <Pane2 />
      Yesterday
          <Pane2 />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Content
