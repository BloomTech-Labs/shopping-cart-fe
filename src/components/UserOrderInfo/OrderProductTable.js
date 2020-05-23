import React, { useEffect, useState } from "react"
import OrderChangeForm from "./OrderChangeForm"
import OrderProductCard from "./OrderProductCard"

function OrderProductTable() {
  const ourProducts = [
    {
      id: 1,
      quantity: 2,
      productName: "Apple",
      variants: ["Small", "Medium", "Large", "XL"],
    },
    {
      id: 2,
      quantity: 5,
      productName: "Banana",
      variants: ["Smaller", "Mediumer", "Largeer", "XLer"],
    },
  ]
  const [products, setProducts] = useState(ourProducts)
  const [editing, setEditing] = useState(false)
  const [showProduct, setShowProduct] = useState(true)
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    quantity: null,
    productName: "",
    variant: "",
  })
  const updateProduct = (id, newProduct) => {
    setEditing(false)
    setShowProduct(true)
    setProducts(
      products.map((product) => (product.id === id ? newProduct : product))
    )
  }

  const editProduct = (product) => {
    setProducts(
    
    )
    setEditing(true)
    setShowProduct(false)
    setCurrentProduct({id: product.id, quantity: product.quantity, productName: product.productName, variant: product.variant })
    
  }

  console.log("Edit Product", editProduct)

  return (
    <div>
      {products.map((product) => (
        <div>
          <OrderChangeForm
            editing={editing}
            product={product}
            setEditing={setEditing}
            updateProduct={updateProduct}
            currentProduct= {currentProduct}
          />
          <OrderProductCard
            product={product}
            setEditing={setEditing}
            editing={editing}
            editProduct={editProduct}
            showProduct={showProduct}
            setShowProduct={setShowProduct}
          />
        </div>
      ))}
    </div>
  )
}

export default OrderProductTable
