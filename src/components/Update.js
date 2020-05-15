import React, { useState } from 'react';
import axios from 'axios';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import {
  logoUpload,
  colorUpload,
  deleteSellerInfo,
  deleteSellerLogo,
  deleteSellerColor,
  postOnboard,
} from '../state/actionCreators';
import { TwitterPicker } from 'react-color';
import history from '../history';

const Update = (props) => {
  const [cloudUrl, setCloudUrl] = useState(props.logo);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(props.color.color);

  console.log(props);
  const uploadImage = (e) => {
    const files = e.target.files;
    setLoading(true);
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'shopping-cart-logo');
    axios
      .post('https://api.cloudinary.com/v1_1/dnsl4nbz4/image/upload', data)
      .then((res) => {
        setCloudUrl(res.data.secure_url);
        props.logoUpload(res.data.secure_url);
      });
    setLoading(false);
  };

  return (
    <div>
      <h1>Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <img style={{ height: '50px' }} alt='logo' src={props.logo.logo} />
      )}
      <input id='uploadButton' type='file' onChange={uploadImage} />
      <label htmlFor='uploadButton'>Change logo</label>
      {/* Color stuffs */}
      <div>
        <h3>Select your brand color!</h3>
        <TwitterPicker
          color={color}
          onChangeComplete={(color) => {
            setColor(color.hex);
            props.colorUpload(color.hex);
          }}
        />
        <div
          style={{
            backgroundColor: props.color.color,
            height: '50px',
            transition: 'ease all 500ms',
          }}>
          Your Color
        </div>
      </div>
      {/* Form stuffs */}
      <Form>
        <main className='infoColumns'>
          <section className='middleWelcomeFields'>
            <label htmlFor='business name' className='labelFont'>
              Business Name*
            </label>
            <Field
              name='businessName'
              type='text'
              value={props.values.businessName}
              placeholder={props.address}
              className='fieldsChar'
            />
            {props.touched.businessName && props.errors.businessName && (
              <p className='errorWelcome'>enter, please</p>
            )}

            <label htmlFor='owner name' className='labelFont'>
              Owner Name*
            </label>
            <Field
              name='ownerName'
              type='text'
              value={props.values.ownerName}
              placeholder={props.ownerName}
              className='fieldsChar'
            />
            {props.touched.ownerName && props.errors.ownerName && (
              <p className='errorWelcome'>enter, please</p>
            )}
            <label htmlFor='address' className='labelFont'>
              Address*
            </label>
            <Field
              name='address'
              type='text'
              value={props.values.address}
              placeholder={props.address}
              className='fieldsChar'
            />
            {props.touched.address && props.errors.address && (
              <p className='errorWelcome'>address, please</p>
            )}
            <label htmlFor='owner name' className='labelFont'>
              Second Address
            </label>
            {/* Started again with placeholders here */}
            <Field
              name='secondAddress'
              type='text'
              value={props.values.secondAddress}
              placeholder={props.secondAddress}
              className='fieldsChar'
            />
            {props.touched.secondAddress && props.errors.secondAddress && (
              <p className='errorWelcome'>enter if needed</p>
            )}
            <label htmlFor='city' className='labelFont'>
              City*
            </label>

            <Field
              name='city'
              type='text'
              value={props.values.city}
              placeholder={props.city}
              className='fieldsChar'
            />
            {props.touched.city && props.errors.city && (
              <p className='errorWelcome'>City required</p>
            )}

            <label htmlFor='state' className='labelFont'>
              State*
            </label>

            <Field
              name='state'
              type='text'
              value={props.values.state}
              placeholder={props.state}
              className='fieldsChar'
            />
            {props.touched.state && props.errors.state && (
              <p className='errorWelcome'>enter State</p>
            )}
            <label htmlFor='zip code' className='labelFont'>
              Zip Code*
            </label>
            <Field
              name='zipcode'
              type='number'
              maxLength={5}
              placeholder={props.zipcode}
              value={props.values.zipcode}
              className='fieldsChar'
            />
            <ErrorMessage name='zipcode'>
              {(msg) => <div className='errorWelcome'>{msg}</div>}
            </ErrorMessage>
          </section>
          <section className='curbHoursSection'>
            <label htmlFor='store hours' className='labelFont'>
              Store Hours*
            </label>
            <Field
              name='hours'
              type='text'
              value={props.values.hours}
              placeholder={props.hours}
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
              placeholder={props.curbHours}
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
        <button
          onClick={() => {
            localStorage.clear();
            history.push('/');
          }}>
          Logout
        </button>
        <button
          onClick={() => {
            props.deleteSellerInfo();
            props.deleteSellerLogo();
            props.deleteSellerColor();
            // uncomment below after delete logic finished
            history.push('/welcome');
          }}>
          Delete Store
        </button>
      </Form>
    </div>
  );
};

const ProfileUpdater = withFormik({
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
})(Update);

const mapStateToProps = (state) => {
  return {
    businessName: state.onboard.businessName,
    ownerName: state.onboard.ownerName,
    address: state.onboard.address,
    secondAddress: state.onboard.secondAddress,
    city: state.onboard.city,
    state: state.onboard.state,
    zipcode: state.onboard.zipcode,
    hours: state.onboard.hours,
    curbHours: state.onboard.curbHours,
    logo: state.logo,
    color: state.color,
  };
};

export default connect(mapStateToProps, {
  logoUpload,
  colorUpload,
  deleteSellerInfo,
  deleteSellerLogo,
  deleteSellerColor,
  postOnboard,
})(ProfileUpdater);

// still needs
// postOnboard needs history.push taken off somehow or we can't use it inside of the 'Update' component - thinking I should call this 'put onboard' instead
// some sort of 'in-between' for delete store and maybe log out
// styling
