import React, { useState, useEffect } from 'react';
//components
import AxiosAuth from '../Auth/axiosWithAuth';
import Addphoto from './addPhoto';
import BasicDetails from './basicDetails';

const CreateProductView = () => {
	//state that enables or disables the Create Product button
	const [ pushState, setPushState ] = useState(false);
	// The object that will be pushed to database (it is not stored in redux)
	const [ productData, setProductData ] = useState({
		productName: '',
		price: '',
		category: '',
		description: '',
		photos: [],
		variants: [ {} ]
	});

	//validation
	function submitHandler() {
		if (productData.photos.length === 0) {
			return console.log('You need at least one photo!');
		}
	}

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
