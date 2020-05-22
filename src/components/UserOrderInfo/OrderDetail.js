import React, {useEffect, useState} from "react"

function OrderDetail({ orderItem, deleteProduct, order }) {



  return (
    <div>
      {orderItem &&
        orderItem.map((item) => {
          return (
            <div>
              <div>{item.product.name} </div>
              <div>{item.quantity}</div>
              <button onClick = {() => (deleteProduct(order._id, item._id))}>Remove</button>
              <button onClick = {() => ((order._id, item._id))}>Remove</button>
            </div>
          )
        })}
    </div>
  )
}

export default OrderDetail
