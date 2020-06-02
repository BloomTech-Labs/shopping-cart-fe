import React, { useEffect } from 'react';
// import ProductCard from './ProductCard';
import ProductCard from '../categories/ProductCard';

const AllProducts = ({
  searchFilter,
  searchString,
  categorySearch,
  testProducts,
  filteredProducts,
  inventory,
}) => {
  console.log(inventory);
  return (
    <div className='ProductAreaContainer'>
      {categorySearch.length === 0
        ? inventory.map((item) => {
            return (
              <ProductCard
                id={item._id}
                image={item.images}
                productName={item.productName}
                price={item.price}
              />
            );
          })
        : filteredProducts.map((item) => {
            return (
              <ProductCard
                id={item._id}
                image={item.images}
                productName={item.productName}
                price={item.price}
              />
            );
          })}
    </div>
  );
};

export default AllProducts;
