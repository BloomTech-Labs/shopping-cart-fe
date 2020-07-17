import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import history from "../../history"
import search_icon from "../../images/search-icon.svg"
import cart_icon from "../../images/cart-icon.svg"
import Modal from "../mapbox/modal"
import Geocode from "react-geocode"

const googleApiToken = "AIzaSyC0K-idf45E3-_5IAjc0PXB-5Ug6S4e9ag"

const StoreNav = (props) => {
  const [show, setShow] = useState(false)
  const cartContents = useSelector((state) => state.cart)
  const store = useSelector((state) => state.user.user)
  const [place, setPlace] = useState()

  useEffect(() => {
    Geocode.setApiKey(googleApiToken)
    Geocode.fromAddress(store.address + store.city)
      .then((response) => {
        setPlace(response.results[0])
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [store.address, store.city])

  const findRef = window.location.href
  const totalQuantity = (arr) => {
    return arr.reduce((sum, item) => {
      return sum + item.quantity
    }, 0)
  }
  const closeModal = () => {
    setShow(false)
  }
  const openModal = () => {
    setShow(true)
  }

  return (
    <div data-testid="navMasterContainer" className="navMasterContainer">
      <div
        onClick={() => {
          history.goBack()
        }}
      >
        {
          <a href={"/store/" + store._id}>
            <img
              data-testid="storeLogo"
              className="storeLogo"
              src={store.logo}
              alt=""
            />
            <h2>{store.businessName}</h2>
          </a>
        }
      </div>
      <form className={findRef.includes("store") ? "fakeSearchBar" : "hidden"}>
        <img
          data-testid="searchIcon"
          className="searchIcon"
          src={search_icon}
          alt=""
        />
        <input
          className="searchBar"
          placeholder="Search..."
          onChange={props.change}
        />
      </form>
      <div data-testid="cartAboutContainer" className="cartAboutContainer">
        {show ? <div onClick={closeModal} className="back-drop"></div> : null}
        <button className="aboutUs" onClick={openModal}>
          About Us
        </button>
        <Modal className="modal" show={show} close={closeModal} user={store} place = {place}/>
        <div
          data-testid="badge"
          className="badge"
          style={{ background: `${store.color}` }}
        >
          <div data-testid="badgeNumber" className="badgeNumber">
            {totalQuantity(cartContents)}
          </div>
        </div>
        <NavLink to="/cart">
          <img alt="Cart icon" src={cart_icon} />
        </NavLink>
      </div>
    </div>
  )
}
export default StoreNav
