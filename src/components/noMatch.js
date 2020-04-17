import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import Logo from './elements/logo'

const NoMatch = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      height: '100vh',
      textAlign: 'center',
      padding: '4rem 2rem'
    }}
    >
      <div>
        <Logo />
        <div>
          <h2 id='header' style={{ marginTop: '3rem' }}>404: Not Found</h2>
          <p style={{ fontSize: 'medium' }}>Oops! It looks like the page you're looking for doesn't exist. Sorry!</p>
        </div>
      </div>
      <div style={{ marginTop: '7rem' }}>
        <Link to='/support'>
          <Button>Get Support</Button>
        </Link>
      </div>
    </div>
  )
}

export default NoMatch
