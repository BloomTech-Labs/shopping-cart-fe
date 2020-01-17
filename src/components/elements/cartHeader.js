import React from 'react'
import { Row, Col, Icon, Badge } from 'antd'

import NoLogo from '../../images/PureRetail_Logo.png'

const CartHeader = () => {
  return (<Row className='cart-header' type='flex' justify='space-between' align='middle'>
    <Col span={6} className='logo'>
      <img src={NoLogo} alt='Store Logo' />
    </Col>
    <Col span={12} className='total'>Total: {'$121.44'}</Col>
    <Col span={6} className='icon'>
      <Badge count={0} overflowCount={9} showZero>
        <Icon type='shopping-cart' />
      </Badge>
    </Col>
          </Row>)
}

export default CartHeader
