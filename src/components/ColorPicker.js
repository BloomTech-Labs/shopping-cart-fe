import React, { useState } from 'react';
import { TwitterPicker } from 'react-color';
import { connect } from 'react-redux';
import { colorUpload } from '../state/actionCreators';

const ColorPicker = (props) => {
  const [color, setColor] = useState('');
  return (
    <div className='colorPicker' data-testid='colorpickerwrapper'>
      <h3 className='selectBrandColor'>Select your brand color!</h3>
      <TwitterPicker
      data-testid='colorpicker'
        color={color}
        onChangeComplete={(color) => {
          setColor(color.hex);
          props.colorUpload(color.hex);
          props.setUserInfo({ ...props.userInfo, color: color.hex });
        }}
      />
      <div
      data-testid="colorpickerbox"
        style={{
          backgroundColor: color,
          height: '50px',
          width: '100%',
          transition: 'ease all 500ms',
        }}></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    color: state.color,
  };
};

export default connect(mapStateToProps, { colorUpload })(ColorPicker);
