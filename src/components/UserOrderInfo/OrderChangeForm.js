import React, { useState, useEffect } from "react"

const OrderChangeForm = ({ product, editing, updateProduct,currentProduct  }) => {
  // The body some piece of state => Put request
  const [order, setOrder] = useState(currentProduct)

  useEffect(() => {
    setOrder(currentProduct)
  }, [currentProduct])

  const onChangeHandle = (e) => {
    setOrder({ [e.target.name]: e.target.value })
  }
  
  return (
    <div className={!editing ? "hidden" : "showEdit"}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          updateProduct(order.id, order)
        }}
      >
        <input
          type="number"
          name="quantity"
          placeholder={product.quantity}
          value={order.quantity}
          onChange={onChangeHandle}
        />
        {/* Product */}
        <p>{product.productName}</p>
        {/* Variant */}
        <label>Variants</label>

        <select
          name="variants"
          value={order.variants}
          onChange={onChangeHandle}
        >
          {product.variants.map((v) => {
            return (
              <option key={v} value={v}>
                {v}
              </option>
            )
          })}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default OrderChangeForm

