import React from 'react'
import './login.css'
import logo from '../../images/PureRetail_Logo.png'
import List from './input'

function Login () {
  return (
    <div class='login'>
      <img src={logo} className='logo' alt='Logo' />
      <p className='headers'>Log in</p>
      <List />
    </div>
  )
}

export default Login
