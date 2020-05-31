import React from 'react';

const ProductCard = (props) => {
  console.log('this be props', props);
  return (
    <div 
    style={{
      border: '2px solid darkblue' // replace with props.... color
    }}
    className='cardWrapper'>
      <img className='cardImage' src={props.image} alt={props.description} />
      <div className='textbox'>
        <h4>{props.productName}</h4>
        <h3>{props.price}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
