import React from "react"
import dollar from "../../images/sales.svg"

const LifetimeSales = ({ currency, amount, monthSales }) => {
  return (
    <div>
      {amount > 0 ? (
        <div className="lifetimeSale">
          <div className="sales">
            <img
              src={dollar}
              style={{ width: "8rem", height: "4rem" }}
              alt="dollar"
            />
            <div className="salesDiv">
              <h3>Sales this week</h3>
              <h2>
                {currency}
                {amount}
              </h2>
            </div>
          </div>
          <div className="sales">
            <img
              src={dollar}
              style={{ width: "8rem", height: "4rem" }}
              alt="dollar"
            />
            <div className="salesDiv">
              <h3>Sales this month</h3>
              <h2>
                {currency}
                {monthSales}
              </h2>
            </div>
          </div>
          <div className="sales">
            <img
              src={dollar}
              style={{ width: "8rem", height: "4rem" }}
              alt="dollar"
            />
            <div className="salesDiv">
              <h3>Sales this year</h3>
              <h2>
                {currency}
                {amount}
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="lifetimeSale">
          <div className="sales">
            <img
              src={dollar}
              style={{ width: "8rem", height: "4rem" }}
              alt="dollar"
            />
            <div className="salesDiv">
              <h3>Sales this week</h3>
              <h2>No sales yet</h2>
            </div>
          </div>
          <div className="sales">
            <img
              src={dollar}
              style={{ width: "8rem", height: "4rem" }}
              alt="dollar"
            />
            <div className="salesDiv">
              <h3>Sales this month</h3>
              <h2>No sales yet</h2>
            </div>
          </div>
          <div className="sales">
            <img
              src={dollar}
              style={{ width: "8rem", height: "4rem" }}
              alt="dollar"
            />
            <div className="salesDiv">
              <h3>Sales this year</h3>
              <h2>No sales yet{currency}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LifetimeSales
