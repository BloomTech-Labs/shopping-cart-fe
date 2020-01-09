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
<<<<<<< HEAD
import Inventory from './components/inventory/inventory'
import Dashboard from './components/DashboardHome/Dashboard'
=======
import PrivateRoute from './components/Auth/PrivateRoute'
>>>>>>> 54e8346e48147a2f0108c917f183f1e5d97472d4
// import Inventory from './components/inventory/inventory'
import Main from './components/inventory'

function App() {
  return (
    <Switch>
      <Route path='/register'>
        <WrappedRegistrationForm />
      </Route>
      <PrivateRoute path='/inventory' component={Main} />
      <Route exact path='/'>
        <LoginForm />
      </Route>
<<<<<<< HEAD
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
      <Route path='/profile'>
        <EditProfile />
      </Route>
      <Route path='/createitem'>
        <CreateItem />
      </Route>
      <Route path='/dashboard'>
        <Dashboard />
      </Route>
=======
      <PrivateRoute path='/resetpassword' component={ResetPasswordForm} />
      <PrivateRoute path='/setnewpassword' component={SetNewPasswordForm} />
      <PrivateRoute path='/createstore' component={CreateStoreForm} />
      <PrivateRoute path='/addlogo' component={AddLogoForm} />
      <PrivateRoute path='/profile' component={EditProfile} />
      <PrivateRoute path='/createitem' component={CreateItem} />
>>>>>>> 54e8346e48147a2f0108c917f183f1e5d97472d4
    </Switch>
  )
}

export default App
