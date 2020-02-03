import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import Logo from './elements/logo'

const Support = () => {
  return (
    <div className='cover' style={{ justifyContent: 'space-between' }}>
      <div style={{ marginTop: '2rem'}}>
          <Logo />
          <div>
            <h2 id='header' style={{ marginTop: '3rem'}}>Support</h2>
            <p style={{ fontSize: 'medium' }}>Please contact</p>
            <p style={{ fontSize: 'large' }}>
              <a href='mailto:pureretail12345@gmail.com'>pureretail12345@gmail.com</a>
            </p>
            <p style={{ fontSize: 'medium' }}>for support.</p>
          </div>
      </div>
      <div style={{ marginBottom: '2rem'}}>
        <Link to='/'>
            <Button>Back to Login</Button>
        </Link>
      </div>
    </div>
  )
}

export default Support
