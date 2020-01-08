import React from 'react';
import './Dashboard.css';
import Footer from './Footer'

const Dashboard = ()=>{
    return (
        <div className='mainDiv'>
            <div className='welcomeHeader'>Welcome, <br/><span className='name'>Tolu!</span>
            <p id="storeUrl">vintagestamps.pureretail.com</p>
            </div>
            <div className='dashDiv'></div>
            <Footer/>
            

        </div>
    )
}

export default Dashboard;