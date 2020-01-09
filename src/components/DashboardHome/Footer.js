import React from 'react';
import './Dashboard.css'
import {Icon} from 'antd';

const Footer = ()=> {
    return (
        <div className='Footer'>

            <div className='iconFlex'>
            <Icon type="home" className='icons' />
            <p>Home</p>
            </div>

            <div className="iconFlex">
            <Icon type="shop" className='icons'/>
            <p>Store</p>
            </div>

            <Icon type="plus-circle" theme="filled" style={{color:'#ff6663'}} className='icons' id="addStore"/>

            <div className='iconFlex'>
            <Icon type="wallet" className='icons'/>
            <p>Account</p>
            </div>

            <div className='iconFlex'>
            <Icon type="profile" className='icons'/>
            <p>Profile</p>
            </div>
        </div>

    )
}

export default Footer;