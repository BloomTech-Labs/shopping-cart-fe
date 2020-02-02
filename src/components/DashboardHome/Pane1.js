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
          {monthSales > 0 ? (
            <p className='earnings'>
              <span className='currency'>{currency}</span>
              {monthSales}
            </p>
          ) : (
            <p className='currency'>No sales made this month</p>
          )}
        </div>
        <div className='Cards2'>
          <p style={{ color: 'white', paddingTop: '20px' }}>
            Lifetime earnings:
          </p>
          {amount > 0 ? (
            <p className='earnings'>
              <span className='currency'>{currency}</span>
              {amount}
            </p>
          ) : (
            <p className='currency'>No sales made yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Pane1
