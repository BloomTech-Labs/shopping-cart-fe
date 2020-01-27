import React, { useEffect } from 'react'
import './Dashboard.css'
import Content from './DashContent'
import { useSelector, useDispatch } from 'react-redux'
import * as creators from '../../state/actionCreators'
import { findByLabelText } from '@testing-library/react'
import NoLogo from '../../images/PureRetail_Logo.png'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon
} from 'react-share'

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
          <span className='name'>
            {user.ownerName ? user.ownerName : 'Seller'}!
          </span>
        </div>
        <div className='dashboardLogo'>
          <img src={storeLogo} alt='Store Logo' />
        </div>
      </div>
      <div className='storeUrl'>
        <p id='storeUrl'>{user && url}</p>
        <div className='share'>
          <FacebookShareButton url={user && url}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={user && url}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={user && url}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={user && url}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <EmailShareButton url={user && url}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </div>
      <div className='dashDiv'>
        <Content currency={user.currency} />
      </div>
    </div>
  )
}

export default Dashboard
