import React from 'react';

const Pane1 = ()=> {
    return (
        <div>
            <h2 style={{textAlign: 'left', marginLeft:'40px', paddingTop:'20px'}}>Earnings</h2>
        <div className="Cards">
            <p style={{color:'white', paddingTop:'40px'}}>This month you earned:</p>
        </div>
        <div className="Cards2">
            <p style={{color:'white', paddingTop:'40px'}}>Lifetime earnings:</p>
        </div>
        </div>
    )
}

export default Pane1