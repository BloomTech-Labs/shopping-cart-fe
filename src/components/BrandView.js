import React, { useEffect, useState } from 'react';
import LogoUpdate from './LogoUpdate';
import ColorPicker from './ColorPicker';
import history from '../history';
import { connect } from 'react-redux';
import {
  colorUpload,
  logoUpload,
  profileUpdate,
} from '../state/actionCreators';

const BrandView = (props) => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setUserInfo({
      businessName: props.businessName,
      ownerName: props.ownerName,
      address: props.address,
      secondAddress: props.secondAddress,
      city: props.city,
      state: props.state,
      zipcode: props.zipcode,
      hours: props.hours,
      curbHours: props.curbHours,
      color: props.color,
      logo: props.logo,
    });
  }, []);
  return (
    <div data-testid='brandwrapper' className='brandwrapper'>
      <div className='headerWrapper' data-testid='headerwrapper'>
        <h2 className='welcomeHeader'>Almost Done</h2>
        <h3>Add your logo and most prominent brand color</h3>
      </div>
      <div className='brandForms' data-testid='logocolorwrapper'>
        <LogoUpdate userInfo={userInfo} setUserInfo={setUserInfo} />
        <ColorPicker userInfo={userInfo} setUserInfo={setUserInfo} />
      </div>
      <button
        className='addBranding'
        onClick={() => {
          props.profileUpdate(userInfo);
          history.push('/dashboard');
        }}>
        Finish
      </button>
    </div>
  );
};

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
    color: state.onboard.color,
    logo: state.onboard.logo,
  };
};

export default connect(mapStateToProps, {
  colorUpload,
  logoUpload,
  profileUpdate,
})(BrandView);
