import React, { useEffect, useState } from "react"
import UpdateProduct from "./EditProductForm"

function OrderProductTable({ orderItem, deleteProduct, order, editProduct }) {
  const [toggle, setToggle] = useState(false)

  const handleClick = () => {
    setToggle(!toggle)
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Quantity</th>
          <th>Product</th>
        </tr>
      </thead>
      <tbody>
        {orderItem &&
          orderItem.map((item) => (
            <tr>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => editProduct(item)}>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        {toggle ? <UpdateProduct /> : null}
      </tbody>
    </table>
  )
}

export default OrderProductTable
