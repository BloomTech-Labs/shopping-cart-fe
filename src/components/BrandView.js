import React from 'react';
import LogoUpdate from './LogoUpdate';
import ColorPicker from './ColorPicker';
import history from '../history';

const BrandView = () => {
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
          history.push('/update');
        }}>
        Finish
      </button>
    </div>
  );
};

export default BrandView;
