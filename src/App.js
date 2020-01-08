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
import PrivateRoute from './components/Auth/PrivateRoute'
// import Inventory from './components/inventory/inventory'
import Main from './components/inventory'

function App() {
  return (
    <Switch>
      <Route path='/register'>
        <WrappedRegistrationForm />
      </Route>
      <PrivateRoute path='/inventory' component={Main} />
      <Route path='/login'>
        <LoginForm />
      </Route>
      <PrivateRoute path='/resetpassword' component={ResetPasswordForm} />
      <PrivateRoute path='/setnewpassword' component={SetNewPasswordForm} />
      <PrivateRoute path='/createstore' component={CreateStoreForm} />
      <PrivateRoute path='/addlogo' component={AddLogoForm} />
      <PrivateRoute path='/profile' component={EditProfile} />
      <PrivateRoute path='/createitem' component={CreateItem} />
    </Switch>
  )
}

export default App
