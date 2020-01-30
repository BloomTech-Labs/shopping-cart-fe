import React from "react";
import logo from "../../images/PureRetail_Logo.png";
import { useSelector } from "react-redux";

const Logo = () => {
  const {user} = useSelector(state => state.user);
  return (
    <div id="logo">
      <img src={user.imageUrl || logo} alt="PureRetail Logo" />
    </div>
  );
};

export default Logo;
