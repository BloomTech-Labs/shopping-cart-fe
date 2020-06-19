import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import useCurrency from "../hooks/useCurrency"
import LifetimeSales from "../totoalSales/lifetimeSales"
import * as actionCreators from "../../state/actionCreators"
import Moment from "react-moment"
const Orders = ({ currency }) => {
  const dispatch = useDispatch()

  const storeId = useSelector((state) => state.user.user._id)
  const sign = useCurrency(currency)

  useEffect(() => {
    dispatch(actionCreators.getSalesHistory())
    dispatch(actionCreators.getStoreOrders(storeId))
  }, [dispatch, storeId])

  const dashboard = useSelector((state) => state.dashboard)
  const allOrders = useSelector((state) => state.orders)
  console.log("allOrders", allOrders)
  console.log("Dashboard", dashboard)

  return (
    <div className="dashboard">
    <div className="salesView">
        <LifetimeSales
        currency={sign}
          amount={dashboard && dashboard.totalSales}
          monthSales={dashboard && dashboard.monthSales}
        />
      </div>
      <div className = "headerText">
        <h3>Welcome Back Emma Here are your</h3>
        <h1>Current Orders</h1>
      </div>
      <table className = "orderTable">
        <tr>
          <th>Order #</th>
          <th>Customer Name</th>
          <th>Total Items</th>
          <th>Status</th>
          <th>Date</th>
          <th></th>
        </tr>
        <tr>
          <td>1212</td>
          <td>Andy</td>
          <td>2</td>
          <td>Ready</td>
          <td>12/11/2020</td>
          <button>View Order</button>
        </tr>
        <tr>
          <td>1212</td>
          <td>Andy</td>
          <td>2</td>
          <td className = "statusRow">Ready</td>
          <td>12/11/2020</td>
          <button>View Order</button>
        </tr>
        <tr>
          <td>1212</td>
          <td>Andy</td>
          <td>2</td>
          <td>Ready</td>
          <td>12/11/2020</td>
          <button>View Order</button>
        </tr>
        <tr>
          <td>1212</td>
          <td>Andy</td>
          <td>2</td>
          <td>Ready</td>
          <td>12/11/2020</td>
          <button>View Order</button>
        </tr>
        <tr>
          <td>1212</td>
          <td>Andy</td>
          <td>2</td>
          <td>Ready</td>
          <td>12/11/2020</td>
          <button>View Order</button>
        </tr>
      </table>
    </div>
  )
}

export default Orders
