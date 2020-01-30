import React from 'react'
import { Link } from 'react-router-dom'
import '../less/index.less'
import Logo from './elements/logo'

const Support = () => {
  return (
    <div style={{
      padding: '3rem',
      textAlign: 'center'
    }}
    >
      <Logo />
      <div>
        <h2>Support</h2>
        <p style={{ margin: '5rem 0rem', fontSize: 'medium' }}>Please contact<br />pureretail12345@gmail.com<br />for support.</p>
      </div>
      <div style={{ fontSize: 'medium', marginTop: '20rem' }}>
        <Link to='/'>Back to Login</Link>
      </div>
    </div>
  )
}

export default Support
