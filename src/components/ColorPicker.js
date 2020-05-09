import React, { useState } from 'react';
import { TwitterPicker } from 'react-color';

const ColorPicker = () => {
  const [color, setColor] = useState('');
  return (
    <div>
      Color Picker showing?
      <TwitterPicker
        color={color}
        onChangeComplete={(color) => {
          setColor(color.hex);
        }}
      />
      <div
        style={{
          backgroundColor: color,
          height: '300px',
          transition: 'ease all 500ms',
        }}></div>
    </div>
  );
};

export default ColorPicker;
