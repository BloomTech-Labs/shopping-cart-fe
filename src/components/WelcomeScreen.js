import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { pushOnboardInfo } from '../state/actionCreators';
import { ADD_ONBOARDING } from '../state/actionTypes';

const WelcomeScreen = (props) => {
  const [sellerData, setSellerData] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    setSellerData({ [e.target.name]: e.target.value });
    console.log('this is the sellerdata', sellerData);
  };

  console.log('this be da props', props);
  return (
    <Form>
      {/* Business Name */}
      <label htmlFor='business name'>Business Name</label>
      <Field
        name='businessName'
        type='text'
        value={props.values.businessName}
        placeholder='business name'
        onChange={handleChange}
      />
      <br />
      {/* Owner name */}
      <label htmlFor='owner name'>Owner Name</label>
      <Field
        name='ownerName'
        type='text'
        value={props.values.ownerName}
        placeholder='your name'
        onChange={handleChange}
      />
      <br />
      {/* Address */}
      <label htmlFor='address'>Address</label>
      <Field
        name='Address'
        type='text'
        value={props.values.address}
        placeholder='address'
        onChange={handleChange}
      />
      <br />
      {/* Second Address */}
      <label htmlFor='owner name'>Second Address</label>
      <Field
        name='secondAddress'
        type='text'
        value={props.values.secondAddress}
        placeholder='secondary address'
        onChange={handleChange}
      />
      <br />
      {/* City */}
      <label htmlFor='city'>City</label>
      <Field
        name='city'
        type='text'
        value={props.values.city}
        placeholder='your city'
        onChange={handleChange}
      />
      <br />
      {/* State */}
      <label htmlFor='state'>State</label>
      <Field
        name='state'
        type='text'
        value={props.values.state}
        placeholder='your state'
        onChange={handleChange}
      />
      <br />
      {/* Zip Code */}
      <label htmlFor='zip code'>Zip Code</label>
      <Field
        name='zipCode'
        type='number'
        placeholder='your zip code'
        value={props.values.zipcode}
        onChange={handleChange}
      />
      <br />
      {/* Hours */}
      <label htmlFor='store hours'>Store Hours</label>
      <Field
        name='store hours'
        type='text'
        value={props.values.hours}
        placeholder='hours of operation'
        onChange={handleChange}
      />
      <br />
      {/* Curbside Hours */}
      <label htmlFor='curbside hours'>Curbside Pickup Hours</label>
      <Field
        name='curbsideHours'
        type='text'
        value={props.values.curbHours}
        placeholder='curbside pickup hours'
        onChange={handleChange}
      />
      <br />
      <button type='submit'>Submit</button>
    </Form>
  );
};

const WelcomeScreenForm = withFormik({
  mapPropsToValues: (values) => {
    return {
      businessName: values.businessName || '',
      ownerName: values.ownerName || '',
      address: values.address || '',
      secondAddress: values.secondAddress || '',
      city: values.city || '',
      state: values.state || '',
      zipcode: values.zipcode || '',
      hours: values.hours || '',
      curbHours: values.curbHours || '',
    };
  },

  validationSchema: Yup.object().shape({
    businessName: Yup.string().required('Enter your business name!'),
    ownerName: Yup.string().required('Enter your name!'),
    address: Yup.string().required('Enter your address!'),
    secondAddress: Yup.string(),
    city: Yup.string().required('Enter your city!'),
    state: Yup.string().required('Enter your state!'),
    zipcode: Yup.number().required('Enter your Zip Code!'),
    hours: Yup.string().required('Enter your store hours!'),
    curbHours: Yup.string(),
  }),

  handleSubmit: (values, formikBag) => {
    console.log(values);
  },
})(WelcomeScreen);

const mapStateToProps = (state) => {
  return {
    businessName: state.businessName,
    ownerName: state.ownerName,
    address: state.address,
    secondAddress: state.secondAddress,
    state: state.state,
    zipcode: state.zipcode,
    hours: state.hours,
    curbHours: state.curbHours,
  };
};

// connecting to our redux store
export default connect(mapStateToProps, { pushOnboardInfo })(WelcomeScreenForm);
