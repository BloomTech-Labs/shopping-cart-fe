import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import WrappedRegistrationForm from './components/register'
import LoginForm from './components/login'
import ResetPasswordForm from './components/resetPassword'
import SetNewPasswordForm from './components/setNewPassword'
import CreateStoreForm from './components/createStore/firstView'
import AddLogoForm from './components/createStore/addLogo'
<<<<<<< HEAD
import Dashboard from './components/DashboardHome/Dashboard';
=======
import CreateItem from './components/CreateItem'
import Inventory from './components/inventory/inventory'
>>>>>>> f218f8a62f7e196cfa50824c26d774b71e2e92ac

function App () {
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
<<<<<<< HEAD
      <Route path='/dashboard'>
        <Dashboard />
=======
      <Route path='/createitem'>
        <CreateItem />
>>>>>>> f218f8a62f7e196cfa50824c26d774b71e2e92ac
      </Route>
    </Switch>
  )
}

export default App
