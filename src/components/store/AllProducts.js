import React, { useEffect } from 'react';
// import ProductCard from './ProductCard';
import ProductCard from '../categories/ProductCard';

const AllProducts = ({
  inventory,
  searchFilter,
  searchString,
  categorySearch,
  testProducts,
  filteredProducts,
}) => {
  return (
    <div className='ProductAreaContainer'>
      {categorySearch.length === 0
        ? testProducts.map((item) => {
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
