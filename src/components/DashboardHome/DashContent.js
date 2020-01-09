import React from 'react'
import { Tabs } from 'antd'
import './Dashboard.css'
import Pane1 from './Pane1'
import Pane2 from './Pane2'

const { TabPane } = Tabs

const Content = () => {
  return (
    <div>
      <Tabs defaultActiveKey='1' className='content'>
        <TabPane tab='Overview' key='1'>
          <Pane1 />
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
