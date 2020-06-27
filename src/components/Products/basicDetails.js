import React from 'react';

//Destructured props are coming from createProductView.js
const BasicDetails = ({
  productData,
  setProductData,
  errorState,
  inventory,
}) => {
  function changeHandler(e) {
    e.preventDefault();
    setProductData({ ...productData, [e.target.name]: e.target.value });
  }

  return (
    <div className='basicDetailsContainer' data-testid='basicDetailsContainer'>
      <h3>Basic Details:</h3>

      <div className='formContainer' data-testid='basicDetailsFormContainer'>
        <div className='inputContainer' data-testid="basicDetailsInputContainer">
          <label className={errorState === 'productName' ? 'errorLabel' : ''}>
            Product Name
          </label>
          <input
            className='productName'
            name='productName'
            type='text'
            placeholder='Awesome T-Shirt'
            onChange={changeHandler}
            value={productData.productName}
          />
          <div data-testid="addProductNameError"className={errorState === 'productName' ? 'error' : 'hideError'}>
            Add a Product name
          </div>
        </div>
        <div className='inputContainer' data-testid="basicDetailsInputWrapper">
          <label className={errorState === 'price' ? 'errorLabel' : ''}>
            Price
          </label>
          <div className='dollar' data-testid="dollarWrapper">
            <input
              className='price'
              name='price'
              type='number'
              placeholder='100.00'
              onChange={changeHandler}
              value={productData.price}
            />
            <div data-testid="priceName" className={errorState === 'price' ? 'error' : 'hideError'}>
              Add a Price name
            </div>
          </div>
        </div>
        <div className='inputContainer' data-testid="secondaryInputWrapper">
          <label className={errorState === 'category' ? 'errorLabel' : ''}>
            Category
          </label>
          <input
            className='category'
            list='category'
            name='category'
            placeholder='Select a category'
            onChange={changeHandler}
            value={productData.category}
          />
          <div data-testid="categoryNameError" className={errorState === 'category' ? 'error' : 'hideError'}>
            Add a Category name
          </div>
          <datalist id='category'>
            {inventory.allUniqueCategories
              ? inventory.allUniqueCategories.map((option) => {
                  return <option value={option} key={Math.random()} />;
                })
              : ''}
          </datalist>
        </div>
      </div>
      <div className='description' data-testid="basicDetailsDescriptionWrapper">
        <label>Description</label>
        <textarea
          name='description'
          rows='3'
          placeholder='Give your product some details'
          value={productData.description}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
};

export default BasicDetails;
