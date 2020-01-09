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
import UpdateItem from './components/updateItem'
import PrivateRoute from './components/Auth/PrivateRoute'
import PublicRoute from './components/Auth/PublicRoute'
import Dashboard from './components/DashboardHome/Dashboard'
// import Inventory from './components/inventory/inventory'
import Main from './components/inventory'

function App () {
  return (
    <Switch>
      <PublicRoute path='/register' component={WrappedRegistrationForm} />
      <PublicRoute exact path='/' component={LoginForm} />
      <PrivateRoute path='/inventory' component={Main} />
      <PrivateRoute path='/resetpassword' component={ResetPasswordForm} />
      <PrivateRoute path='/setnewpassword' component={SetNewPasswordForm} />
      <PrivateRoute path='/createstore' component={CreateStoreForm} />
      <PrivateRoute path='/addlogo' component={AddLogoForm} />
      <PrivateRoute path='/profile' component={EditProfile} />
      <PrivateRoute path='/createitem' component={CreateItem} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
      <PrivateRoute path='/updateitem/:id' component={UpdateItem} />
    </Switch>
  )
}

export default App
