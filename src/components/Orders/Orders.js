import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import useCurrency from "../hooks/useCurrency"
import LifetimeSales from "../totoalSales/lifetimeSales"
import * as actionCreators from "../../state/actionCreators"
import moment from "moment"
const Orders = ({ currency }) => {
  const dispatch = useDispatch()

  const storeId = useSelector((state) => state.user.user._id)
  const sign = useCurrency(currency)

  useEffect(() => {
    dispatch(actionCreators.getSalesHistory())
    dispatch(actionCreators.getStoreOrders(storeId))
  }, [dispatch, storeId])

  const dashboard = useSelector((state) => state.dashboard)
  const orders = useSelector((state) => state.orders)
 

  return (
    <div className="dashboard">
      <div className="salesView">
        <LifetimeSales
          currency={sign}
          amount={dashboard && dashboard.totalSales}
          monthSales={dashboard && dashboard.monthSales}
        />
      </div>
      <div className="headerText">
        <h3>Welcome Back Emma Here are your</h3>
        <h1>Current Orders</h1>
      </div>
      <table className="orderTable">
        <tr>
          <th>Order #</th>
          <th>Product Name</th>
          <th>Total Items</th>
          <th>Status</th>
          <th>Date</th>
          <th></th>
        </tr>
        {orders &&
          orders.map((item) =>
            item.orderItem.map((product) => (
              <tr>
                <td>
                  {item._id
                    ? item._id.substr(item._id.length - 5)
                    : 0}
                </td>
                {/* <td>{product.product.productName}</td> */}
                <td>{product.quantity}</td>
                <td>Ready</td>
                <td>{moment(item.orderCreated).format("MM-DD-YYYY")}</td>
                <NavLink to={`/order/${item._id}`}>
                  <button>View Order</button>
                </NavLink>
              </tr>
            ))
          )}
      </table>
    </div>
  )
}

export default Orders
