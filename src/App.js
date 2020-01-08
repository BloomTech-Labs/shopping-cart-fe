import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import WrappedRegistrationForm from './components/register'
import LoginForm from './components/login'
import ResetPasswordForm from './components/resetPassword'
import SetNewPasswordForm from './components/setNewPassword'
import CreateStoreForm from './components/createStore/firstView'
import AddLogoForm from './components/createStore/addLogo'
import EditProfile from './components/EditProfile/EditProfile'
import CreateItem from './components/CreateItem'
import Inventory from './components/inventory/inventory'

function App() {
  return (
    <Switch>
      <Route path='/register'>
        <WrappedRegistrationForm />
      </Route>
      <Route path='/inventory'>
        <Inventory />
      </Route>
      <Route path='/login'>
        <LoginForm />
      </Route>
      <Route path='/resetpassword'>
        <ResetPasswordForm />
      </Route>
      <Route path='/setnewpassword'>
        <SetNewPasswordForm />
      </Route>
      <Route path='/createstore'>
        <CreateStoreForm />
      </Route>
      <Route path='/addlogo'>
        <AddLogoForm />
      </Route>
      <Route path='/profile' component={EditProfile} />
      <Route path='/createitem'>
        <CreateItem />
      </Route>
    </Switch>
  )
}

export default App
