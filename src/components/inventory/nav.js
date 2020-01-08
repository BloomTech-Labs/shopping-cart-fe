import React from 'react'
import { Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import '../../less/index.less'

function Nav () {
  return (
    <div className='nav'>
      <ul id='nav_ul'>
        <li><Icon className='icon' type='home' />Home</li>
        <li><NavLink to='inventory'><Icon className='icon' type='shop' />Store</NavLink></li>
        <li id='add'><NavLink className='navlink' to='createItem'><Icon className='icon' theme='filled' type='plus-circle' /></NavLink></li>
        <li><Icon className='icon' type='wallet' />Account</li>
        <li><Icon className='icon' type='user' />Profile</li>
      </ul>
    </div>
  )
}

export default Nav
