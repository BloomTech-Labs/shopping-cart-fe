import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import history from "../../history";
import search_icon from "../../images/search-icon.svg";
import cart_icon from "../../images/cart-icon.svg";

const StoreNav = (props) => {
  const cartContents = useSelector(state => state.cart);
  const store = useSelector(state => state.user.user);
  const findRef = window.location.href;
  const totalQuantity = arr => {
    return arr.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  };
 
  return (
    <div data-testid="navMasterContainer" className="navMasterContainer">
      <div
        onClick={() => {
          history.goBack();
        }}
      >
        {(
          <a href={"/store/" + store._id  }>
            <img data-testid="storeLogo" className="storeLogo" src={store.logo} alt=""/>
             <h2>{store.businessName}</h2>
          </a>
        )}
      </div>
      <form className={findRef.includes("store") ? "fakeSearchBar" : "hidden"}>
        <img data-testid="searchIcon" className="searchIcon" src={search_icon} alt=""/>
        <input
          className="searchBar"
          placeholder="Search..."
          onChange={props.change}
        />
      </form>
      <div data-testid="cartAboutContainer" className="cartAboutContainer">
        <p className="aboutUs"> About Us</p>
        <div data-testid="badge" className="badge" style={{ background: `${store.color}` }}>
          <div data-testid="badgeNumber" className="badgeNumber">{totalQuantity(cartContents)}</div>
        </div>
        <NavLink to="/cart">
          <img alt="Cart icon" src={cart_icon} />
        </NavLink>
      </div>
    </div>
  );
};
export default StoreNav;
