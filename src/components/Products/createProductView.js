import React, { useState, useEffect, useCallback } from 'react';
import history from '../../history';
import AxiosAuth from '../../components/Auth/axiosWithAuth';
import Addphoto from './addPhoto';
import BasicDetails from './basicDetails';
import AddVariants from './addVariants';
import Navbar from '../Navbar';
import { useSelector } from 'react-redux';

const CreateProductView = () => {
  // inventory gets all of the products from the redux store (redux store is calling the db)
  const inventory = useSelector((state) => state.store);
  //Keeps track of what field is empty
  const [errorState, setErrorState] = useState();
  // The full object that is posted
  const [productData, setProductData] = useState({
    productName: '',
    price: '',
    category: '',
    description: '',
    images: [],
    variantName: '',
    variantDetails: [],
  });

  //The state that holds the "addVaraint" component info (onClick creates an obj that is added to the variantDetails array)
  const [formData, setFormData] = useState({
    option: '',
    price: '',
  });

  function submitHandler() {
    if (!productData.productName) {
      return setErrorState('productName');
    }

    if (!productData.price) {
      return setErrorState('price');
    }

    if (!productData.category) {
      return setErrorState('category');
    }

    if (productData.images.length < 1) {
      return setErrorState('images');
    }

    AxiosAuth()
      .post(
        'https://shopping-cart-be.herokuapp.com/api/store/products',
        productData
      )
      .then((res) => {
        console.log(res);
        history.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Navbar />
      <div className='createProductView'>
        <div className='createProductHeader'>
          <h1>Create Product</h1>
          <button onClick={submitHandler} className='createProduct'>
            Save Product
          </button>
        </div>
        <div className='basicDetailsVariantsContainer'>
          <div className='leftContainer'>
            <Addphoto
              productData={productData}
              setProductData={setProductData}
              errorState={errorState}
              setErrorState={setErrorState}
            />
          </div>
          <div className='rightContainer'>
            <BasicDetails
              inventory={inventory}
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
