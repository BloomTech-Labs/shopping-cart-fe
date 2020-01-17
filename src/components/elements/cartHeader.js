import React from "react";
import { Row, Col, Icon, Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";

import NoLogo from "../../images/PureRetail_Logo.png";

const CartHeader = ({ logoPath, 
                      badgeCount = 0, 
                      currency = '', 
                      totalDue = 0, 
                      displayBack, 
                      displayTotal }) => {
  return (<Row className='cart-header' type='flex' justify='space-between' align='middle'>
    <Col span={6} className='logo'>
      {displayBack 
      ? <Icon type='left-circle' /> 
      : <img src={logoPath ? logoPath : NoLogo} alt='Store Logo' />}
    </Col>
    <Col span={12} className='total'>{displayTotal ? `Total: ${currency}${totalDue}` : ''}</Col>
    <Col span={6} className='icon'>
      <Badge count={badgeCount} overflowCount={9} showZero>
        <Icon type='shopping-cart' />
      </Badge>
    </Col>
          </Row>)
}

export default CartHeader;
