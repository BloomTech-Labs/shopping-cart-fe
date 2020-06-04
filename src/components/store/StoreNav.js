import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as creators from "../../state/actionCreators";
import NoLogo from "../../images/PureRetail_Logo.png";
import history from "../../history";
import search_icon from "../../images/search-icon.svg";
import cart_icon from "../../images/cart-icon.svg";
import axios from "axios";
import axiosWithAuth from "../Auth/axiosWithAuth";

const StoreNav = props => {
  console.log(props, "STORE NAV PROPS");
  console.log(props.store.storeUrl);

  const dispatch = useDispatch();
  const cartContents = useSelector(state => state.cart);
  const storeDetails = useSelector(state => state.user.user);
  const sellerId = localStorage.getItem("storeId");
  console.log(sellerId);
  const findRef = window.location.href;

  useEffect(() => {
    const Url =
      `https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/store/${sellerId}`;
    axiosWithAuth()
      .get(Url)
      .then(res => {
        console.log(res.data, "👻");
        const color = res.data.color; // use inline styling
        const image = res.data.logo;
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
      {console.log(props)}
      <div
        onClick={() => {
          history.goBack();
        }}
      >
        {storeDetails.imageUrl ? (
          <img className="storeLogo" src={storeDetails.imageUrl} />
        ) : (
          <img className="storeLogo" src={NoLogo} />
        )}
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
        <div className="badge">
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
