import React, { useState, useEffect } from "react"
import OrderDetail from "./OrderDetail"
import UserInfo from "./UserInfo"
import * as action from "../../state/actionCreators"
import { useSelector, useDispatch } from "react-redux"

function OrderInfo(props) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(action.getOneOrder("5ebc90555800f634d81f61d1"))
  }, [dispatch])

  const order = useSelector((state) => state.order)
  console.log(order)
  const orderItem = useSelector((state) => state.order.orderItem)
  console.log("OrderItem", orderItem)

  // const deleteOrder = (id) => {
  //   dispatch(action.deleteOrder(id))
  // }

  // const items = orderItem.map(item => {
  //   return {product: item.product, quantity: item.quantity}
  // })

  // console.log(items)


  return (
    <div
      className="site-card-border-less-wrapper"
      style={{ display: "flex", justifyContent: "flex-start" }}
    >
     
      <UserInfo order={order} />
      <OrderDetail />
      <div>
        {orderItem && orderItem.map(item => (
          <h1>{item.product}</h1>
        ))}
      </div>
    </div>
  )
}

export default OrderInfo
