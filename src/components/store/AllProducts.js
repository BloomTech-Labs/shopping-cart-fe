import React, { useEffect } from 'react';
import ProductCard from './ProductCard';

const AllProducts = ({ inventory, searchFilter, searchString }) => {
	return (
		<div className="ProductAreaContainer">
			{searchString ? (
				searchFilter.map((cv) => {
					return <ProductCard inventory={cv} key={cv._id} />;
				})
			) : inventory ? (
				inventory.map((cv) => {
					return <ProductCard inventory={cv} key={cv._id} />;
				})
			) : (
				''
			)}
		</div>
	);
};

export default AllProducts;
