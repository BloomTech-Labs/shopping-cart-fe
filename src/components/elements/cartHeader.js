import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Row, Col, Icon, Badge, Input } from 'antd'
import * as creators from '../../state/actionCreators'

import NoLogo from '../../images/PureRetail_Logo.png'
const { Search } = Input
const CartHeader = ({
  logoPath,
  badgeCount = 0,
  currency = '',
  totalDue = 0,
  displayBack,
  displayTotal,
  top = false
}) => {
  const dispatch = useDispatch()
  const change = e => {
    dispatch(creators.setString(e.target.value))
  }
  return (<Row className={top ? 'color ' + 'cart-header' : 'cart-header'} type='flex' justify='space-between' align='middle'>
    <Col span={6} className='logo'>
      {displayBack
        ? <Icon type='left-circle' />
        : <img src={logoPath || NoLogo} alt='Store Logo' />}
    </Col>
    <Col span={12} className='total'>{displayTotal ? `Total: ${currency}${totalDue}` : <Search
      onChange={change}
      placeholder='search'
    />}
    </Col>
    <NavLink to='/review'>
      <Col span={6} className='icon'>
        <Badge style={{ backgroundColor: 'gold', color: 'black' }} count={badgeCount} overflowCount={9} showZero>
          <Icon type='shopping-cart' style={{ color: 'black' }} />
        </Badge>
      </Col>
    </NavLink>
          </Row>)
}

export default CartHeader
