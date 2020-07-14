import React from "react"
import ProductCard from "../categories/ProductCard"

const AllProducts = ({ categorySearch, filteredProducts, inventory }) => {
  return (
    <div className="mainProductContainer">
      {inventory.products.length > 0 ? (
        <div className="ProductAreaContainer">
          {categorySearch.length === 0
            ? inventory.products &&
              inventory.products.map((item) => {
                return (
                  <ProductCard
                    id={item._id}
                    image={item.images}
                    productName={item.productName}
                    price={item.price}
                  />
                )
              })
            : filteredProducts.map((item) => {
                return (
                  <ProductCard
                    id={item._id}
                    image={item.images}
                    productName={item.productName}
                    price={item.price}
                  />
                )
              })}
        </div>
      ) : (
        <div className="sorry-no-product">
          <h2 style={{ fontWeight: "bold" }}>
            Sorry No Product is available in this store!
          </h2>
        </div>
      )}
    </div>
  )
}
export default AllProducts
