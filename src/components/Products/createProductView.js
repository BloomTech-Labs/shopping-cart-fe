import React, { useState, useEffect } from 'react';
//components
import AxiosAuth from '../Auth/axiosWithAuth';
import Addphoto from './addPhoto';
import BasicDetails from './basicDetails';

const CreateProductView = () => {
	const [ productData, setProductData ] = useState({
		productName: '',
		price: '',
		category: '',
		description: '',
		photos: [],
		variants: [ {} ]
	});

	return (
		<div>
			<div className="createProductHeader">
				<h1>Create Product</h1>
				<button className="createProduct">Create Product</button>
			</div>
			<div className="basicDetailsVariantsContainer">
				<div className="leftContainer">
					<Addphoto productData={productData} setProductData={setProductData} />
				</div>
				<div className="rightContainer">
					<BasicDetails productData={productData} setProductData={setProductData} />
					{/* <BasicDetails /> */}
				</div>
			</div>
		</div>
	);
};

export default CreateProductView;
