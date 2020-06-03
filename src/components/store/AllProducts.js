import React, { useEffect } from 'react';
import ProductCard from '../categories/ProductCard';

const AllProducts = ({
  categorySearch,
  filteredProducts,
  inventory,
}) => {
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
