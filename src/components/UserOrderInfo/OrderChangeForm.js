import React, { useState, useEffect } from "react"

const OrderChangeForm = ({ item, productInput, updateProduct }) => {
  const [input, setInput] = useState(productInput)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProduct(input.id, input)
  }

  console.log("console log for input", input)
  console.log("console log for product", input.product)
  console.log("console log for variant", input.product.variant)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          disabled
          type="text"
          name="name"
          value={item.product.name}
          placeholder={item.product.name}
        />
        <input
          type="number"
          value={productInput.quantity}
          placeholder={item.quantity}
          onChange={(e) => {
            setInput({
              ...input,
              quantity: e.target.value,
            })
          }}
        />

        <select
          value={input.product.variant[0].variantOption}
          onChange={(e) => {
            setInput({
              ...input.product.variant[0],
              variantOption: e.target.value
            })
          }}
        >
          {item.product.variant.map((v, index) => {
            return (
              <option key={index} value={v.variantOption}>
                {v.variantOption}
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
