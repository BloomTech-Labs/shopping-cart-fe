import React, { useState } from 'react';
import trashIcon from '../../images/trash_icon.svg';
//Destructured props are coming from createProductView.js
const AddVariants = ({
  formData,
  setFormData,
  productData,
  setProductData,
}) => {
  //active = If a user has selected to start adding variants
  const [active, setActive] = useState(false);
  // This slice of state is used for error handling with just the variants
  const [errorState, setErrorState] = useState();

  function changeHandler(e) {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function variantNameHandler(e) {
    e.preventDefault();
    setProductData({ ...productData, [e.target.name]: e.target.value });
  }

  //if any variants exsist set the varaint dropdown to true
  setTimeout(function () {
    if (productData.variantDetails.length > 0) {
      return setActive(true);
    }
  }, 50);

  function submitHandler(e) {
    e.preventDefault();
    if (!productData.variantName) {
      return setErrorState('variantName');
    }

    if (!formData.option) {
      return setErrorState('variantOption');
    }

    if (!formData.price) {
      return setErrorState('variantPrice');
    }

    setErrorState('');

    setProductData({
      ...productData,
      ['variantDetails']: [...productData.variantDetails, formData],
    });
    setFormData({
      option: '',
      price: '',
    });
  }

  function removeVariant(arg) {
    const newState = productData.variantDetails.filter((cv) => {
      return cv.option !== arg;
    });
    return setProductData({ ...productData, ['variantDetails']: newState });
  }

  function clearVariants() {
    setProductData({
      ...productData,
      ['variantDetails']: [],
      ['variantName']: '',
    });
    setFormData({
      option: '',
      price: '',
    });
  }

  return (
    <div className='masterContainer' data-testid='addVariantsMainWrapper'>
      <div
        className='createProductContainer'
        data-testid='createProductContainer'>
        <div
          className='HeaderContainer'
          data-testid='createProductHeaderWrapper'>
          <div
            className='textContainer'
            data-testid='createProductTextContainer'>
            <h3>Variants:</h3>
            <p>
              Product options a customer can choose from.{' '}
              <a href='https://www.google.com/search?q=Defnine+A+variant&rlz=1C5CHFA_enUS872US872&oq=Defnine+A+variant&aqs=chrome..69i57j0l7.3486j1j7&sourceid=chrome&ie=UTF-8'>
                Learn More
              </a>
            </p>
          </div>
          <button
            data-testid='createVariantsButton'
            onClick={() => {
              setActive(true);
            }}
            className={active ? 'disabled' : 'setActive'}>
            Create Variants
          </button>
        </div>

        {active ? (
          <div className='VariantFormContainer'>
            <form onSubmit={submitHandler}>
              <div className='variantNameContainer'>
                <div className='inputContainer'>
                  <label
                    className={
                      errorState === 'variantName' ? 'errorLabel' : ''
                    }>
                    Variant Name
                  </label>
                  {productData.variantDetails.length >= 1 ? (
                    <div className='VariantNameContainer'>
                      <div className='createdVariantName'>
                        {productData.variantName}
                      </div>{' '}
                      <p
                        className={
                          productData.variantDetails.length >= 1
                            ? 'clearBTN'
                            : 'clearBTN clearDisabled '
                        }
                        onClick={clearVariants}>
                        Clear Variants
                      </p>
                    </div>
                  ) : (
                    <input
                      type='text'
                      name='variantName'
                      placeholder='Variant Name Here'
                      value={productData.variantName}
                      onChange={variantNameHandler}
                    />
                  )}
                </div>
              </div>
              <div
                className={
                  errorState === 'variantName' ? 'error' : 'hideError'
                }>
                Add a variant name
              </div>
              <div className='addVariantContainer'>
                <div className='inputContainer'>
                  <label
                    className={
                      errorState === 'variantOption' ? 'errorLabel' : ''
                    }
                    htmlFor='option'>
                    Variant Option
                  </label>
                  <input
                    type='text'
                    name='option'
                    placeholder='example: Large'
                    value={formData.option}
                    onChange={changeHandler}
                  />
                  <div
                    className={
                      errorState === 'variantOption' ? 'error' : 'hideError'
                    }>
                    Add a variant name
                  </div>
                </div>

                <div className='inputContainer'>
                  <label
                    className={
                      errorState === 'variantPrice' ? 'errorLabel' : ''
                    }
                    htmlFor='variantPrice'>
                    Variant Price
                  </label>
                  <input
                    type='number'
                    name='price'
                    placeholder='Example: 1.99'
                    value={formData.price}
                    onChange={changeHandler}
                  />
                  <div
                    className={
                      errorState === 'variantPrice' ? 'error' : 'hideError'
                    }>
                    Add a variant name
                  </div>
                </div>

                <div className='addBTNContainer'>
                  <button type='submit'>Add Option</button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          ''
        )}
      </div>
      {productData.variantDetails.length >= 1
        ? productData.variantDetails.map((cv) => {
            return (
              <VaraintChild
                data={cv}
                removeVariant={removeVariant}
                key={Math.random() * Math.random()}
              />
            );
          })
        : ''}
    </div>
  );
};

export default AddVariants;

//Child component
const VaraintChild = (props) => {
  return (
    <div className='cardContainer' data-testid='variantChildWrapper'>
      <p>
        {props.data.option} | ${props.data.price}
      </p>
      <img
        className='trashcan'
        src={trashIcon}
        alt='A trash can icon, when clicked delete a variant'
        onClick={() => {
          props.removeVariant(props.data.option);
        }}
      />
    </div>
  );
};
