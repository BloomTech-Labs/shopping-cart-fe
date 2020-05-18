import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as creators from "../state/actionCreators";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "antd";
import { Button } from "antd";

import "antd/dist/antd.css";
import NoLogo from "../images/PureRetail_Logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(creators.getCurrentUser());
  }, [dispatch]);
  const user = useSelector((state) => state.user.user);
  const url = `${window.location.origin.toString()}/store/${
    user && user.storeName && user.storeName.toLowerCase().split(" ").join("-")
  }-${user && user._id}`;
  const storeLogo = user.imageUrl ? user.imageUrl : NoLogo;

  const style = { color: "#0092ff", padding: "8px 0" };

  return (
    <div className='nav-bar'>
      <Row
        justify='space-around'
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className='link-container'
      >
        <Row
          justify='space-between'
          align='middle'
          gutter={[8, 8]}
          className='nav-links'
        >
          <Col className='gutter-row' span={4}>
            <img
              src={NoLogo}
              alt='Pure Retail Logo'
              className='pure-retail-logo'
            />
          </Col>

          <Col className='gutter-row' span={4}>
            <div style={style}>
              <NavLink to='dashboard' activeClassName='activeLink'>
                <p>Home</p>
              </NavLink>
             
            </div>
          </Col>
          <Col className='gutter-row' span={4}>
            <div style={style}>
              <NavLink to='inventory' activeClassName='activeLink'>
                <p>Store</p>
              </NavLink>
             
            </div>
          </Col>
          <Col className='gutter-row' span={4}>
            <div style={style}>
              <NavLink to='account' activeClassName='activeLink'>
                <p>Account</p>
              </NavLink>
              
            </div>
          </Col>
          <Col className='gutter-row' span={4}>
            <div style={style}>
              <NavLink to='Profile' activeClassName='activeLink'>
                <p>Profile</p>
              </NavLink>
              
            </div>
          </Col>
        </Row>
        <Row
          justify='space-evenly'
          align='middle'
          gutter={[8, 8]}
          className='btn-container'
        >
          <Col>
            <NavLink className='navlink' to='createItem'>
              <Button className='nav-primary'>Create Product</Button>
            </NavLink>
          </Col>
          <Col>
            <a href={url} target='_blank'>
              <Button className='nav-secondary'>View Store</Button>
            </a>
          </Col>
        </Row>
        <img src={storeLogo} alt='Store Logo' className='nav-store-logo' />
      </Row>
     
    </div>
  );
};

export default Navbar;
