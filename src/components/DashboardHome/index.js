import React from 'react'
import '../../less/index.less'
// import EditProfile from './EditProfile'
import Nav from '../elements/nav'
import Dashboard from './Dashboard'
// import Footer from '../DashboardHome/Footer'

const Home = () => {
  return (
    <div>
      <Dashboard />
      <Nav />
    </div>
  )
}

export default Home
