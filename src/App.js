import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import SellerProflePage from './components/SellerProfile/SellerProfile'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/profile' component={SellerProflePage} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
