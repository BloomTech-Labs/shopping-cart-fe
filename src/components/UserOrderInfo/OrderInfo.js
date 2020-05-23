import React, { useState, useEffect } from "react"
import OrderProductTable from "./OrderProductTable"
import UserInfo from "./UserInfo"
import * as action from "../../state/actionCreators"
import { useSelector, useDispatch } from "react-redux"

function OrderInfo(props) {
  const dispatch = useDispatch()
  // const orderId = props.match.params.id
  useEffect(() => {
    dispatch(action.getOneOrder("5ec72317f4595e43404d4d25"))
  }, [dispatch])

  const order = useSelector((state) => state.order)
  
  const orderItem = useSelector((state) => state.order.orderItem)
  console.log("OrderItem", orderItem)

  const deleteProduct = (orderId, itemId) => {
      dispatch(action.deleteOrderProduct(orderId, itemId))
  }

 

  return (
    <div
      className="site-card-border-less-wrapper"
      style={{ display: "flex", justifyContent: "flex-start" }}
    >
      <UserInfo order={order} />
      <OrderProductTable orderItem={orderItem} deleteProduct= {deleteProduct} order={order} />
    </div>
  )
}

export default OrderInfo
