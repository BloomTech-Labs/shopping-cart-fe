import React from 'react'
import './Dashboard.css'

const Pane1 = ({ currency, amount }) => {
  console.log(currency)
  return (
    <div>
      <h2 style={{ textAlign: 'left', marginLeft: '40px', paddingTop: '20px' }}>
        Earnings
      </h2>
      <div id='cards'>
        <div className='Cards2'>
          <p style={{ color: 'white', paddingTop: '20px' }}>
            This month you earned:
          </p>
          <p className='earnings'>
            <span className='currency'>{currency}</span>
            {amount}
          </p>
        </div>
        <div className='Cards2'>
          <p style={{ color: 'white', paddingTop: '20px' }}>
            Lifetime earnings:
          </p>
          <p className='earnings'>
            <span className='currency'>{currency}</span>
            {amount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Pane1
