import React, { useState } from "react"
import { DeleteOutlined } from "@ant-design/icons"

const OrderProductCard = (props) => {
  const [hide, setHide] = useState(true)
  // 1 - set up a boolean that triggers className changes (need the one above also) XX
  // 2 - Render the paragraph and yes/no buttons on change of this booloean
  // 3 - The current button for delete product -> className of hidden until is clicked
  // 4 - When the user clicks 'yes' that's going to be the button you currently have

  return (
    // productChar = the actual classname that you are using to style the component
    // the hidden = doesn't show the component at all
    // use placeholders instead of props
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
