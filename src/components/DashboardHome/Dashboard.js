import React, { useEffect } from 'react'
import './Dashboard.css'
import Footer from './Footer'
import Content from './DashContent'
import { useSelector, useDispatch } from 'react-redux'
import * as creators from '../../state/actionCreators'
import { findByLabelText } from '@testing-library/react'
import NoLogo from '../../images/PureRetail_Logo.png'
const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(creators.getCurrentUser())
  }, [dispatch])
  const user = useSelector(state => state.user.user)
  const url = `${window.location.origin.toString()}/store/${user &&
    user.storeName &&
    user.storeName
      .toLowerCase()
      .split(' ')
      .join('-')}-${user && user._id}`
  const storeLogo = user.imageUrl ? user.imageUrl : NoLogo

  return (
    <div className='mainDiv'>
      <div className='dashboardHeader'>
        <div className='welcomeHeader'>
          Welcome, <br />
          <span className='name'>{user.ownerName ? user.ownerName : 'Seller'}!</span>
        </div>
        <div className='dashboardLogo'>
          <img src={storeLogo} alt="Store Logo" />
        </div>
      </div>
      <div className='storeUrl'>
        <p id='storeUrl'>{user && url}</p>
      </div>
      <div className='dashDiv'>
        <Content />
      </div>

      {/* <Footer /> */}
    </div>
  )
}

export default Dashboard
