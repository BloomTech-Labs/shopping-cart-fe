import React from 'react';

const ProductCard = (props) => {
  console.log('this be props', props);
  return (
    <div className='cardWrapper'>
      <img className="cardImage" src={props.image} alt={props.description} />
      <div>{props.productName}</div>
      <div>{props.price}</div>
    </div>
  );
};

export default ProductCard;
