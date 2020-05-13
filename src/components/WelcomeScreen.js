import React from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { postOnboard } from '../state/actionCreators';

const WelcomeScreen = (props) => {
  console.log('touch me', Yup);
  return (
    <div className='welcomeForm'>
      <h1 className='welcomeHeader'>Welcome</h1>
      <h2 className='welcomeP'>
        To finish the account creation process fill out the forms below
      </h2>
      <Form>
        <main className='infoColumns'>
          <section className='middleWelcomeFields'>
            <label htmlFor='business name' className='labelFont'>
              Business Name
            </label>
            <Field
              name='businessName'
              type='text'
              value={props.values.businessName}
              placeholder='business name'
              className='fieldsChar'
            />
            {props.touched.businessName && props.errors.businessName && (
              <p className='errorWelcome'>enter please</p>
            )}

            <label htmlFor='owner name' className='labelFont'>
              Owner Name
            </label>
            <Field
              name='ownerName'
              type='text'
              value={props.values.ownerName}
              placeholder='your name'
              className='fieldsChar'
            />
            {props.touched.ownerName && props.errors.ownerName && (
              <p className='errorWelcome'>enter, please</p>
            )}
            <label htmlFor='address' className='labelFont'>
              Address
            </label>
            <Field
              name='address'
              type='text'
              value={props.values.address}
              placeholder='address'
              className='fieldsChar'
            />
            {props.touched.address && props.errors.address && (
              <p className='errorWelcome'>address, please</p>
            )}
            <label htmlFor='owner name' className='labelFont'>
              Second Address
            </label>

            <Field
              name='secondAddress'
              type='text'
              value={props.values.secondAddress}
              placeholder='secondary address'
              className='fieldsChar'
            />
            {props.touched.secondAddress && props.errors.secondAddress && (
              <p className='errorWelcome'>enter if needed</p>
            )}
            <label htmlFor='city' className='labelFont'>
              City
            </label>

            <Field
              name='city'
              type='text'
              value={props.values.city}
              placeholder='your city'
              className='fieldsChar'
            />
            {props.touched.city && props.errors.city && (
              <p className='errorWelcome'>City required</p>
            )}

            <label htmlFor='state' className='labelFont'>
              State
            </label>

            <Field
              name='state'
              type='text'
              value={props.values.state}
              placeholder='your state'
              className='fieldsChar'
            />
            {props.touched.state && props.errors.state && (
              <p className='errorWelcome'>enter State</p>
            )}
            <label htmlFor='zip code' className='labelFont'>
              Zip Code
            </label>
            <Field
              name='zipcode'
              type='number'
              maxLength={5}
              placeholder='your zip code'
              value={props.values.zipcode}
              className='fieldsChar'
            />
            <ErrorMessage name='zipcode'>
              {(msg) => <div className='errorWelcome'>{msg}</div>}
            </ErrorMessage>
          </section>
          <section className='curbHoursSection'>
            <label htmlFor='store hours' className='labelFont'>
              Store Hours
            </label>
            <Field
              name='hours'
              type='text'
              value={props.values.hours}
              placeholder='hours of operation'
              className='fieldsChar'
            />
            {props.touched.hours && props.errors.hours && (
              <p className='errorWelcome'>enter Hours of Operation</p>
            )}
            <label htmlFor='curbside hours' className='labelFont'>
              Curbside Pickup Hours
            </label>
            <Field
              name='curbHours'
              type='text'
              value={props.values.curbHours}
              placeholder='curbside pickup hours'
              className='fieldsChar'
            />
            {props.touched.curbHours && props.errors.curbHours && (
              <p className='errorWelcome'>enter Curbside hours</p>
            )}
          </section>
        </main>
        <button className='addBranding' type='submit'>
          Add Information
        </button>
      </Form>
    </div>
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
    zipcode: Yup.string()
      .max(5, '5 digits only!')
      .min(5, 'must be 5 digits')
      .required('Enter your Zip Code!'),

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
