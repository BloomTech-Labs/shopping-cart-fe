import React, { useEffect, useState } from "react"
import OrderChangeForm from "./OrderChangeForm"
import OrderProductCard from "./OrderProductCard"

function OrderProductTable(props) {
  const ourProducts = [
    {
      id: "1",
      product: {
        id: "1",
        name: "Banana",
        variant: [
          {
            id: "11",
            variantName: "Color",
            variantPrice: 1000,
            variantOption: "Very Orange",
          },
          {
            id: "12",
            variantName: "size",
            variantPrice: 2000,
            variantOption: "Medium",
          },
        ],
      },
      quantity: 1,
    },
    {
      id: "2",
      product: {
        id: "2",
        name: "Apple",
        variant: [
          {
            id: "13",
            variantName: "size",
            variantPrice: 5,
            variantOption: "Small",
          },
          {
            id: "14",
            variantName: "size",
            variantPrice: 6,
            variantOption: "Medium",
          },
        ],
      },
      quantity: 1,
    },
  ]

  const [products, setProducts] = useState(ourProducts)
  const [editing, setEditing] = useState(false)

  const [productInput, setProductInput] = useState({
    id: Date.now(),
    product: {
      id: null,
      name: "",
      variant: [
        {
          id: null,
          variantName: "size",
          variantPrice: null,
          variantOption: "",
        },
      ],
    },
    quantity: 1,
  })

  const deleteProduct = (id) => {
    setProducts(products.filter((item) => item.id !== id))
  }

  const updateProduct = (id, updatedProduct) => {
    setProducts(
      products.map((item) => (item.id === id ? updatedProduct : item))
    )
  }

  const editProduct = (item) => {
    setProductInput({
      id: item.id,
      quantity: item.quantity,
      variantOption:  [...item.product.variant[0].variantOption ],
    })
  }

  return (
    <div>
      {products.map((item) => (
        <div>
          <OrderChangeForm
            item={item}
            updateProduct={updateProduct}
            productInput={productInput}
          />
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
