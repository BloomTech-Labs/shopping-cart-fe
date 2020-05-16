import React, { useState, useEffect } from 'react';
//components
import AxiosAuth from '../../components/Auth/axiosWithAuth';
import Addphoto from './addPhoto';
import BasicDetails from './basicDetails';
import AddVariants from './addVariants';
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
		variants: []
	});

	//validation
	function submitHandler() {
		AxiosAuth()
			.post('https://shopping-cart-be.herokuapp.com/api/store/products', productData)
			.then((res) => {
				console.log(res);
				setProductData({
					productName: '',
					price: '',
					category: '',
					description: '',
					photos: [],
					variants: []
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className="createProductView">
			<div className="createProductHeader">
				<h1>Create Product</h1>
				<button onClick={submitHandler} className="createProduct">
					Create Product
				</button>
			</div>
			<div className="basicDetailsVariantsContainer">
				<div className="leftContainer">
					<Addphoto productData={productData} setProductData={setProductData} />
				</div>
				<div className="rightContainer">
					<BasicDetails productData={productData} setProductData={setProductData} />
					<AddVariants productData={productData} setProductData={setProductData} />
				</div>
			</div>
		</div>
	);
};

export default CreateProductView;
