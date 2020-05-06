import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik, withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const WelcomeScreen = ({ values, touched, handleChange, errors, status }) => {
  const [owners, setOwners] = useState({
    businessName: '',
  });

  const formik = useFormik({
    initialValues: {
      businessName: '',
      ownerName: '',
      address: '',
      secondAddress: '',
      city: '',
      state: '',
      zipcode: '',
      hours: '', // format may need changed
      curbHours: '', // format may need changed
    },
    validationSchema: Yup.object({
      businessName: Yup.string()
        .max(25, 'Must be 15 characters or less')
        .required('Required'),
      ownerName: Yup.string()
        .max(25, 'Must be 20 characters or less')
        .required('Required'),
      address: Yup.string()
        .max(25, 'Must be 30 characters or less')
        .required('Required'),
      secondAddress: Yup.string()
        .max(25, 'Must be 30 characters or less')
        .required('Required'),
      city: Yup.string()
        .max(25, 'Must be 30 characters or less')
        .required('Required'),
      state: Yup.string()
        .max(25, 'Must be 30 characters or less')
        .required('Required'),
      zipcode: Yup.number()
        .max(25, 'Must be 30 characters or less')
        .required('Required'),
      hours: Yup.number()
        .max(25, 'Must be 30 characters or less')
        .required('Required'),
      curbHours: Yup.number()
        .max(25, 'Must be 30 characters or less')
        .required('Required'),
    }),
  });

  // right here onsubmit
  const onSubmit = (e) => {
    e.preventDefault(); // prevent re renders
  };

  const handlechange = (e) => {
    setOwners({ [e.target.name]: e.target.value });
  };
  return (
    <form>
      {/* Business Name */}
      <label htmlFor='business name'>Business Name</label>
      <Field
        name='businessName'
        type='text'
        onChange={handleChange}
        value={formik.values.businessName}
      />
      {touched.businessName && errors.businessName && (
        <p>{errors.businessName}</p>
      )}
      {/* Owner name */}
      <label htmlFor='ownerName'>Owner Name</label>
      <Field
        name='owner name'
        type='text'
        // onChange / Values here
      />

      {/* Address */}
      <label htmlFor='ownerName'>Address</label>
      <Field
        name='Address'
        type='text'
        // onChange / Values here
      />

      {/* Second Address */}
      <label htmlFor='ownerName'>Second Address</label>
      <Field
        name='Second Address'
        type='text'
        // onChange / Values here
      />

      {/* City */}
      <label htmlFor='ownerName'>City</label>
      <Field
        name='city'
        type='text'
        // onChange / Values here
      />

      {/* State */}
      <label htmlFor='ownerName'>State</label>
      <Field
        name='state'
        type='text'
        // onChange / Values here
      />

      {/* Zip Code */}
      <label htmlFor='ownerName'>Zip Code</label>
      <Field
        name='zip code'
        type='number'
        // onChange / Values here
      />

      {/* Hours */}
      <label htmlFor='ownerName'>Store Hours</label>
      <Field
        name='store hours'
        type='text'
        // onChange / Values here
      />

      {/* Curbside Hours */}
      <label htmlFor='ownerName'>Curbside Pickup Hours</label>
      <Field
        name='curbside hours'
        type='text'
        // onChange / Values here
      />

      <button type='submit'>Submit</button>
    </form>
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
    zipcode: Yup.number().required('Enter your Zip Code!'),
    hours: Yup.string().required('Enter your store hours!'),
    curbHours: Yup.string(),
  }),

  //   handleSubmit(values, { setStatus }) {
  //     axios
  //       .post("https://reqres.in/api/users", values)
  //       .then(res => {
  //         setStatus(res.data);
  //         // console.log(`Our data:`, res.data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }
})(WelcomeScreen);

export default WelcomeScreenForm;
