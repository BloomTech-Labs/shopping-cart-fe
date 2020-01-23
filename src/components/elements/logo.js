import React from 'react'
import logo from '../../images/PureRetail_Logo.png'

const Logo = ({ image }) => (
  <div id='logo'>
    <img src={image || logo} alt='PureRetail Logo' />
  </div>
)

export default Logo
