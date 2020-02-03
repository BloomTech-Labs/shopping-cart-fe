import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import Logo from './elements/logo'

const NoMatch = () => {
  return (
    <div className='cover' style={{ justifyContent: 'space-between' }}>
      <div style={{ marginTop: '2rem'}}>
          <Logo />
          <div>
            <h2 id='header' style={{ marginTop: '3rem'}}>404: Not Found</h2>
            <p style={{ fontSize: 'medium' }}>Oops! It looks like the page you're looking for doesn't exist. Sorry!</p>
          </div>
      </div>
      <div style={{ marginBottom: '2rem'}}>
        <Link to='/support'>
            <Button>Get Support</Button>
        </Link>
      </div>
    </div>
  )
}

export default NoMatch