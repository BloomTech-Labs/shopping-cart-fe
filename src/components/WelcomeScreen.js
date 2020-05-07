import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { postOnboard } from '../state/actionCreators';
import rootReducer from '../state/reducers/index';

const WelcomeScreen = (props) => {
  console.log(props);
  useEffect((values) => {
    console.log('refreshing');
    postOnboard(values);
  }, []);

  return (
    <Form>
      {/* Business Name */}
      <label htmlFor='business name'>Business Name</label>
      <Field
        name='businessName'
        type='text'
        value={props.values.businessName}
        placeholder='business name'
      />
      {props.touched && props.errors.businessName && <p>enter please</p>}
      <br />
      {/* Owner name */}
      <label htmlFor='owner name'>Owner Name</label>
      <Field
        name='ownerName'
        type='text'
        value={props.values.ownerName}
        placeholder='your name'
      />
      <br />
      {/* Address */}
      <label htmlFor='address'>Address</label>
      <Field
        name='address'
        type='text'
        value={props.values.address}
        placeholder='address'
      />
      <br />
      {/* Second Address */}
      <label htmlFor='owner name'>Second Address</label>
      <Field
        name='secondAddress'
        type='text'
        value={props.values.secondAddress}
        placeholder='secondary address'
      />
      <br />
      {/* City */}
      <label htmlFor='city'>City</label>
      <Field
        name='city'
        type='text'
        value={props.values.city}
        placeholder='your city'
      />
      <br />
      {/* State */}
      <label htmlFor='state'>State</label>
      <Field
        name='state'
        type='text'
        value={props.values.state}
        placeholder='your state'
      />
      <br />
      {/* Zip Code */}
      <label htmlFor='zip code'>Zip Code</label>
      <Field
        name='zipcode'
        type='text'
        placeholder='your zip code'
        value={props.values.zipcode}
      />
      <br />
      {/* Hours */}
      <label htmlFor='store hours'>Store Hours</label>
      <Field
        name='hours'
        type='text'
        value={props.values.hours}
        placeholder='hours of operation'
      />
      <br />
      {/* Curbside Hours */}
      <label htmlFor='curbside hours'>Curbside Pickup Hours</label>
      <Field
        name='curbHours'
        type='text'
        value={props.values.curbHours}
        placeholder='curbside pickup hours'
      />
      <br />
      <button type='submit'>Submit</button>
    </Form>
  );
};

const WelcomeScreenForm = withFormik({
  mapPropsToValues({
    businessName,
    ownerName,
    address,
    secondAddress,
    city,
    state,
    zipcode,
    hours,
    curbHours,
  }) {
    return {
      businessName: businessName || '',
      ownerName: ownerName || '',
      address: address || '',
      secondAddress: secondAddress || '',
      city: city || '',
      state: state || '',
      zipcode: zipcode || '',
      hours: hours || '',
      curbHours: curbHours || '',
    };
  },

  validationSchema: Yup.object().shape({
    businessName: Yup.string().required('Enter your business name!'),
    ownerName: Yup.string().required('Enter your name!'),
    address: Yup.string().required('Enter your address!'),
    secondAddress: Yup.string(),
    city: Yup.string().required('Enter your city!'),
    state: Yup.string().required('Enter your state!'),
    zipcode: Yup.string().required('Enter your Zip Code!'),
    hours: Yup.string().required('Enter your store hours!'),
    curbHours: Yup.string(),
  }),

  handleSubmit: (values, formikBag) => {
    formikBag.props.postOnboard(values);
  },
})(WelcomeScreen);

const mapStateToProps = (state) => {
  return {
    businessName: state.onboard.businessName,
    ownerName: state.onboard.ownerName,
    address: state.onboard.address,
    secondAddress: state.onboard.secondAddress,
    state: state.onboard.state,
    zipcode: state.onboard.zipcode,
    hours: state.onboard.hours,
    curbHours: state.onboard.curbHours,
  };
};

export default connect(mapStateToProps, { postOnboard })(WelcomeScreenForm);
