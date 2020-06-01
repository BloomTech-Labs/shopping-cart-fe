import React, { useEffect, useState } from "react"
import OrderChangeForm from "./OrderChangeForm"
import OrderProductCard from "./OrderProductCard"

function OrderProductTable({ orderItem, oneProduct }) {
  const [products, setProducts] = useState()
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setProducts(orderItem)
  }, [orderItem])

  console.log("products", products)
  const [productInput, setProductInput] = useState({
    _id: "",
    product: {
      _id: null,
      name: "",
      variantName: "size",
      variantDetails: [
        {
          _id: null,
          price: null,
          option: "",
        },
      ],
    },
    quantity: 1,
  })

  const deleteProduct = (_id) => {
    setProducts(products.filter((item) => item._id !== _id))
  }

  const updateProduct = (_id, updatedProduct) => {
    setEditing(false)
    setProducts(
      products.map((item) => (item._id === _id ? updatedProduct : item))
    )
  }

  const editProduct = (item) => {
    setEditing(true)
    setProductInput({
      _id: item._id,
      quantity: item.quantity,
      product: {
        ...item.product,
      },
    })
  }
  
  return (
    <div>
      {editing && (
        <OrderChangeForm
          updateProduct={updateProduct}
          productInput={productInput}
          products={products}
          editing={editing}
          oneProduct={oneProduct}
        />
      )}
      {products &&
        products.map((item) => (
          <div>
            <OrderProductCard
              item={item}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
            />
          </div>
        ))}
    </div>
  )
}

export default OrderProductTable
