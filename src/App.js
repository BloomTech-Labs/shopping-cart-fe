import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
<<<<<<< HEAD
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import EditProfile from './components/EditProfile/EditProfile'
=======
import WrappedRegistrationForm from './components/register'
import LoginForm from './components/login'
import CreateStoreForm from './components/createStore/firstView'
import AddLogoForm from './components/createStore/addLogo'
>>>>>>> 1e07f924718f4e997e83933c5a6f7c12a918cb0b

function App() {
  return (
<<<<<<< HEAD
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
=======
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
    </Switch>
>>>>>>> 1e07f924718f4e997e83933c5a6f7c12a918cb0b
  )
}

export default App
