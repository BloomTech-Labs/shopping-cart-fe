import React, { useState, useEffect } from "react"
import axios from 'axios'

const OrderChangeForm = ({ productInput, updateProduct }) => {
  const [input, setInput] = useState(productInput)
  
  const [oneProduct, setOneProduct] = useState()

  useEffect(() => {
    axios.get(`http://localhost:4000/api/store/products/${input.product._id}`)
      .then(res => {
        setOneProduct(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [input.product._id])

  // useEffect(() => {
  //   axios.get(
  //     `http://localhost:4000/api/store/$/products`
  //   )
  //   .then(res => { 
  //     console.log("RES", res)
  //   })
  // }, [input._id])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    updateProduct(input._id, input)
  }
  
  const handleChange = (e) => {
    setInput({
      ...input,
      product: {
        ...input.product,
        variantDetails: [
          {
            option: e.target.value,
          },
        ],
      },
    })
  }
  
  console.log("Input:", input)
  // console.log("OneProduct", oneProduct)

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <select
          value={input.productName}
          onChange={handleChange}
        >
          
        </select>
        <input
          type="number"
          value={input.quantity}
          onChange={(e) => {
            setInput({
              ...input,
              quantity: e.target.value,
            })
          }}
        />
        <select
          value={input.product.variantDetails.option}
          onChange={handleChange}
        >
          {oneProduct && oneProduct.variantDetails.map((v) => (
            <option>{v.option}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default OrderChangeForm
