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
  const storeId = useSelector(state => state.user.user._id);
  const findRef = window.location.href;
  useEffect(() => {
    const Url = `https://shopping-cart-be.herokuapp.com/api/store/${storeId}`;
    axiosWithAuth()
      .get(Url)
      .then(res => {
        setColor(res.data.color);
        setLogo(res.data.logo);
      })
      .catch(error => console.log(error));
    dispatch(creators.getStore(storeId));
  }, [storeId, dispatch]);
  const totalQuantity = arr => {
    return arr.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  };
  const change = e => {
    dispatch(creators.setString(e.target.value));
  };
  return (
    <div data-testid="navMasterContainer" className="navMasterContainer">
      <div
        onClick={() => {
          history.goBack();
        }}
      >
        {(
          <a href={"/store/" + storeId}>
            <img data-testid="storeLogo" className="storeLogo" src={logo} />
          </a>
        ) }
      </div>
      <form className={findRef.includes("store") ? "fakeSearchBar" : "hidden"}>
        <img data-testid="searchIcon" className="searchIcon" src={search_icon} />
        <input
          className="searchBar"
          placeholder="Search..."
          onChange={props.change}
        />
      </form>
      <div data-testid="cartAboutContainer" className="cartAboutContainer">
        <p className="aboutUs"> About Us</p>
        <div className="badge" style={{ background: `${color}` }}>
          <div className="badgeNumber">{totalQuantity(cartContents)}</div>
        </div>
        <NavLink to="/cart">
          <img alt='Cart icon' src={cart_icon} />
        </NavLink>
      </div>
    </div>
  );
};
export default StoreNav;
