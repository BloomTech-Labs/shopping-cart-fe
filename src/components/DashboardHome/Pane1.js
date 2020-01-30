import React from 'react'

const Pane1 = ({ currency, amount, monthSales }) => {
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
            {monthSales}
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
