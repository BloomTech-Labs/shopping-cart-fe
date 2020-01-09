import React from 'react'
import './Dashboard.css'
import {Icon} from 'antd';

const Pane2 = ()=> {
    return (
        <div className="Card2">
        <div className="PaneFlex">
        <Icon type="check-circle" style={{color:'#BFD7EA'}}/>
        <div className="StoreTitle">
        <h2>Calvin Klein Boxers Shorts</h2>
        <p>Fine linen, rare edition, worn by Bieber</p>
        </div>
        <div className='StorePrice'>
            <h2>+₦500</h2>
            <p>Dec. 14</p>
        </div>
        </div>
        </div>
    )
}

export default Pane2;