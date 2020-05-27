import React, { useState } from "react"
import { DeleteOutlined } from "@ant-design/icons"

const OrderProductCard = ({ item, deleteProduct }) => {
  return (
    <div>
      <h3>Product: {item.product.name} </h3>
      <h3>Quantity: {item.quantity} </h3>
      <h3>Variant: {item.product.variant[0].variantOption} </h3>
      <div>
        <button>Edit</button>
        <button onClick={() => deleteProduct(item.id)}>Delete</button>
        {/* above button  */}
        {/* <p c>Are you sure?</p>
        <button >
          <DeleteOutlined />
          Confirm Delete
        </button>
        <button>No</button> */}
      </div>
    </div>
  )
}
export default OrderProductCard
