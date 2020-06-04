import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AxiosAuth from '../Auth/axiosWithAuth';
import history from '../../history';
import * as creators from '../../state/actionCreators';
//components
import Addphoto from './addPhoto';
import BasicDetails from './basicDetails';
import AddVariants from './addVariants';

// TODO: Update the JS file name to UpdateProductView
// TODO: Edit all files assosated with this one on ApplicationCache.js to be correct as well
// TODO: Get rid of #DeleteMe.js

function UpdateItem(props) {
  const dispatch = useDispatch();
  const itemId = props.match.params.id;
  const sellerId = localStorage.getItem('sellerId');

  useEffect(() => {
    dispatch(creators.getProducts(sellerId));
  }, [sellerId, dispatch]);

  useEffect(() => {
    AxiosAuth()
      .get(
        `https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/store/products/${itemId}`
      )
      .then((res) => {
        console.log('This is res', res.data);
        setProductData(res.data);
      });
  }, []);

  // inventory gets all of the products from the redux store (redux store is calling the db)
  const inventory = useSelector((state) => state.store);

  //Keeps track of what field is empty
  const [errorState, setErrorState] = useState();
  // The object that is posted
  const [productData, setProductData] = useState({
    productName: '',
    price: '',
    category: '',
    description: '',
    images: [],
    variantName: '',
    variantDetails: [],
  });

  //The state that holds the "addVaraint" component info (onClick creates an obj that is added to the Variants array)
  const [formData, setFormData] = useState({
    variantOption: '',
    variantPrice: '',
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
        'https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/store/products',
        productData
      )
      .then((res) => {
        history.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <>
        {/* <Navbar /> */}
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
    </div>
  );
}

export default UpdateItem;
