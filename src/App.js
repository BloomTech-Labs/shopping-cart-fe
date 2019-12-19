import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import FirstViewWrapper from './components/Onboarding/firstView'
import Register from './components/Register/Register'
import Login from './components/Login/login'
import SecondViewWrapper from './components/Onboarding/secondView'

function App () {
  return (
    <Switch>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/createstore'>
        <FirstViewWrapper />
      </Route>
      <Route path='/addlogo'>
        <SecondViewWrapper />
      </Route>
    </Switch>
  )
}

export default App
