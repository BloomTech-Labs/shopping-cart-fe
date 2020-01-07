import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import EditProfile from './components/EditProfile/EditProfile'

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
          <Route path='/profile' component={EditProfile} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
