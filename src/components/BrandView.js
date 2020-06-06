import React from 'react';
import LogoUpdate from './LogoUpdate';
import ColorPicker from './ColorPicker';
import history from '../history';
import { connect } from 'react-redux';
import { colorUpload, logoUpload } from '../state/actionCreators';

const BrandView = (props) => {
  return (
    <div className='brandWrapper'>
      <div className='headerWrapper'>
        <h2 className='welcomeHeader'>Almost Done</h2>
        <h3>Add your logo and most prominent brand color</h3>
      </div>
      <div className='brandForms'>
        <LogoUpdate />
        <ColorPicker />
      </div>
      <button
        className='addBranding'
        onClick={() => {
          // our put requests here for color / logo
          colorUpload(props.color);
          logoUpload(props.logo);
          history.push('/update');
        }}>
        Finish
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    color: state.color.color,
    logo: state.logo.logo,
  };
};

export default connect(mapStateToProps, { colorUpload, logoUpload })(BrandView);
