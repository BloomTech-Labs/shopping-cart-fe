import React from 'react'
// import logo from './logo.svg'
import './App.css'
// import { Button } from 'antd-mobile'
import Signup from './components/Signup'

function App () {
  return (
    <div className='App'>
      {/* <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          @mogwai, @shaunorpen and @kvothe waz here.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
      <Button>Start!</Button> */}
      <Signup />
    </div>
  )
}

export default App
