import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
import * as creators from "../state/actionCreators"
import { useSelector, useDispatch } from "react-redux"
import NoLogo from "../images/PureRetail_Logo.png"


const Navbar = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(creators.getCurrentUser())
  }, [dispatch])

  const user = useSelector((state) => state.user.user)

  const url = `${window.location.origin.toString()}/store/${
    user && user.storeName && user.storeName.toLowerCase().split(" ").join("-")
  }-${user && user._id}`

  const storeLogo = user.imageUrl ? user.imageUrl : NoLogo

  return (
    <div className="nav-bar">
      <div className="link-container">
        <div className="nav-links">
          <img
            src={NoLogo}
            alt="Pure Retail Logo"
            className="pure-retail-logo"
          />
          <div>
            <div>
              <NavLink to="dashboard" activeClassName="activeLink">
                <p>Home</p>
              </NavLink>
            </div>
          </div>
          <div>
            <div>
              <NavLink to="inventory" activeClassName="activeLink">
                <p>Store</p>
              </NavLink>
            </div>
          </div>
          <div>
            <div>
              <NavLink to="account" activeClassName="activeLink">
                <p>Account</p>
              </NavLink>
            </div>
          </div>
          <div>
            <div>
              <NavLink to="profileview" activeClassName="activeLink">
                <p>Profile</p>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="btn-container">
         <div className = "btn-list">
            <NavLink className = "nav-link-button" to="createItem">
              <button className="nav-primary">Create Product</button>
            </NavLink>
            <a href={url}>
              <button className="nav-secondary">View Store</button>
            </a>
            </div>
            <img src={storeLogo} alt="Store Logo" className="nav-store-logo" />
          </div>
      </div>
    </div>
  )
}

export default Navbar
