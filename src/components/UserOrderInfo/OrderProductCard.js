import React from "react"


const OrderProductCard = ({ item, deleteProduct, editProduct }) => {
  return (
    <div>
      <h3>Product: {item.product.productName} </h3>
      <h3>Quantity: {item.quantity} </h3>
      <h3>Variant: {item.product.variantDetails[0].option} </h3>
      <div>
        <button onClick={() => editProduct(item)}>Edit</button>
        <button onClick={() => deleteProduct(item._id)}>Delete</button>
      </div>
    </div>
  )
}
export default OrderProductCard
