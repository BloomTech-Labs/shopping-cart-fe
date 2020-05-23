import React, { useState } from "react"
import { DeleteOutlined } from "@ant-design/icons"

const OrderProductCard = (props) => {
  const [hide, setHide] = useState(true)

  return (

    <div className={props.showProduct ? "productChar" : "hidden"}>
      <div>Product: {props.product.productName}</div>
      <div>Quantity: {props.product.quantity}</div>
      <div>Variant: {props.product.variant}</div>
      <div>
        <button onClick={() => props.editProduct(props.product.id)}>Edit</button>
        <button className={hide ? "" : ""}>Delete</button>
        {/* above button  */}
        <p className={"hidden"}>Are you sure?</p>
        <button className={"hidden"} deleteProduct={props.deleteProduct}>
          <DeleteOutlined />
          Confirm Delete
        </button>
        <button>No</button>
      </div>
    </div>
  )
}
export default OrderProductCard
