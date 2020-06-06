
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as creators from "../../state/actionCreators";
import NoLogo from "../../images/PureRetail_Logo.png";
import history from "../../history";
import search_icon from "../../images/search-icon.svg";
import cart_icon from "../../images/cart-icon.svg";
import axiosWithAuth from "../Auth/axiosWithAuth";

const StoreNav = props => {

  const [color, setColor] = useState();
  const [logo, setLogo] = useState();

  const dispatch = useDispatch();
  const cartContents = useSelector(state => state.cart);
  const storeDetails = useSelector(state => state.user.user);
  const sellerId = localStorage.getItem("storeId");
  const findRef = window.location.href;

  useEffect(() => {
    const Url = `https://shopping-cart-be.herokuapp.com/${sellerId}`;
    axiosWithAuth()
      .get(Url)
      .then(res => {
        setColor(res.data.color);
        setLogo(res.data.logo);
      })
      .catch(error => console.log(error));

    dispatch(creators.getStore(sellerId));
  }, [sellerId, dispatch]);

  const totalQuantity = arr => {
    return arr.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  };

  const change = e => {
    dispatch(creators.setString(e.target.value));
  };

  return (
    <div className="navMasterContainer">
      <div
        onClick={() => {
          history.goBack();
        }}
      >
        <img className="storeLogo" src={logo} />
        {/* {logo ? (
          <img className="storeLogo" src={logo} />
        ) : (
          <img className="storeLogo" src={NoLogo} />
        )} */}
      </div>

      <div className={findRef.includes("store") ? "fakeSearchBar" : "hidden"}>
        <img className="searchIcon" src={search_icon} />
        <input
          className="searchBar"
          placeholder="Search..."
          onChange={change}
        />
      </div>

      <div className="cartAboutContainer">
        <p className="aboutUs"> About Us</p>
        <div className="badge" style={{ background: `${color}` }}>
          <div className="badgeNumber">{totalQuantity(cartContents)}</div>
        </div>
        <NavLink to="/cart">
          <img src={cart_icon} />
        </NavLink>
      </div>
    </div>
  );
};

export default StoreNav;
