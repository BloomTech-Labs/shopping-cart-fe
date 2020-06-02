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
  return (
    <div className='ProductAreaContainer'>
      {categorySearch.length === 0
        ? inventory.map((item) => {
            return (
              <ProductCard
                image={item.images}
                productName={item.productName}
                price={item.price}
              />
            );
          })
        : filteredProducts.map((item) => {
            return (
              <ProductCard
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
