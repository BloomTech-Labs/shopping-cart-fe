import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import WrappedRegistrationForm from './components/register'
import LoginForm from './components/login'
import CreateStoreForm from './components/createStore/firstView'
import AddLogoForm from './components/createStore/addLogo'
import EditProfile from './components/EditProfile/EditProfile'

function App() {
  return (
    <Switch>
      <Route path='/register'>
        <WrappedRegistrationForm />
      </Route>
      <Route path='/login'>
        <LoginForm />
      </Route>
      <Route path='/createstore'>
        <CreateStoreForm />
      </Route>
      <Route path='/addlogo'>
        <AddLogoForm />
      </Route>
      <Route path='/profile' component={EditProfile} />
    </Switch>
  )
}

export default App
