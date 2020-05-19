import React, { useState, useEffect, useLayoutEffect } from 'react';
//components
import AxiosAuth from '../../components/Auth/axiosWithAuth';
import Addphoto from './addPhoto';
import BasicDetails from './basicDetails';
import AddVariants from './addVariants';
const CreateProductView = () => {
	//state that enables or disables the Create Product button
	const [ pushState, setPushState ] = useState(false);
	const [ stopFirstLoad, setStopFirstLoad ] = useState(false);
	const [ errorState, setErrorState ] = useState('');
	// The object that will be pushed to database (it is not stored in redux)
	const [ productData, setProductData ] = useState({
		productName: '',
		price: '',
		category: '',
		description: '',
		photos: [],
		variants: []
	});

	useLayoutEffect(
		() => {
			if (stopFirstLoad == false) {
				return console.log('boopers');
			}

			if (!productData.productName) {
				return setErrorState('productName');
			}
			if (!productData.price) {
				return setErrorState('price');
			}
			if (!productData.category) {
				return setErrorState('category');
			}

			setErrorState('');
		},
		[ productData, stopFirstLoad ]
	);

	function submitHandler() {
		setStopFirstLoad(true);
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
					<BasicDetails
						productData={productData}
						setProductData={setProductData}
						setErrorState={setErrorState}
						errorState={errorState}
					/>
					<AddVariants productData={productData} setProductData={setProductData} />
				</div>
			</div>
		</div>
	);
};

export default CreateProductView;
