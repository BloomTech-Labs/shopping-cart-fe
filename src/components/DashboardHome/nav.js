import React from 'react'
import { Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import '../../less/index.less'

function Nav () {
  return (
    <div className='nav' style={{ backgroundColor: 'white' }}>
      <ul id='nav_ul'>
        <li className='li'><NavLink to='dashboard' activeClassName='activeLink'><Icon className='icon' type='home' /><p>Home</p></NavLink></li>
        <li className='li'><NavLink to='inventory' activeClassName='activeLink'><Icon className='icon' type='shop' /><p>Store</p></NavLink></li>
        <li id='add'><NavLink className='navlink' to='createItem'><Icon className='icon' theme='filled' type='plus-circle' /></NavLink></li>
        <li className='li'><Icon className='icon' type='wallet' /><p>Account</p></li>
        <li className='li'><NavLink to='profile' activeClassName='activeLink'><Icon className='icon' type='user' /><p>Profile</p></NavLink></li>
      </ul>
    </div>
  )
}

export default Nav
