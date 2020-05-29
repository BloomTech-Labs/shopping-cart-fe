import React, { useState, useEffect, useCallback } from 'react';
import history from '../../history';
import AxiosAuth from '../../components/Auth/axiosWithAuth';
import Addphoto from './addPhoto';
import BasicDetails from './basicDetails';
import AddVariants from './addVariants';
import Navbar from '../Navbar';

const CreateProductView = () => {
	// valdation for posting - if true that it posts and pushes to the dashboard screen
	const [ readyToPost, setReadyToPost ] = useState(false);
	//Prevents useEffect from running on inital load
	const [ checkErrors, setCheckErros ] = useState(false);
	//Keeps track of what field is empty
	const [ errorState, setErrorState ] = useState();
	// The object that is posted
	const [ productData, setProductData ] = useState({
		productName: '',
		price: '',
		category: '',
		description: '',
		images: [],
		variantName: '',
		variantDetails: []
	});

	//The state that holds the "addVaraint" component info (onClick creates an obj that is added to the Variants array)
	const [ formData, setFormData ] = useState({
		variantOption: '',
		variantPrice: ''
	});
	//Used to check input fields for validation in real time

	// Post to the server if all checks out
	function submitHandler() {
		console.log('errorState', errorState);

		if (!productData.productName) {
			return setErrorState('productName');
		}
		console.log('errorState', errorState);
		if (!productData.price) {
			return setErrorState('price');
		}
		console.log('errorState', errorState);
		if (!productData.category) {
			return setErrorState('category');
		}

		if (productData.images.length < 1) {
			return setErrorState('images');
		}

		AxiosAuth()
			.post('https://shopping-cart-be.herokuapp.com/api/store/products', productData)
			.then((res) => {
				console.log('🍕🔥✅', res);
				history.push('/dashboard');
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<>
		<Navbar />
		<div className="createProductView">
			
			<div className="createProductHeader">
				<h1>Create Product</h1>
				<button onClick={submitHandler} className="createProduct">
					Save Product
				</button>
			</div>
			<div className="basicDetailsVariantsContainer">
				<div className="leftContainer">
					<Addphoto
						productData={productData}
						setProductData={setProductData}
						errorState={errorState}
						setErrorState={setErrorState}
					/>
				</div>
				<div className="rightContainer">
					<BasicDetails
						productData={productData}
						setProductData={setProductData}
						setErrorState={setErrorState}
						errorState={errorState}
					/>
					<AddVariants
						setFormData={setFormData}
						formData={formData}
						productData={productData}
						setProductData={setProductData}
					/>
				</div>
			</div>
		</div>
		</>
	);
};

export default CreateProductView;
