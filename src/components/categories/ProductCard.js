import React from 'react';

const ProductCard = (props) => {
  // needs styling
  return (
    <div className='cardWrapper'>
      <img className='cardImage' src={props.image} alt={props.description} />
      <div className='textbox'>
        <h4>{props.productName}</h4>
        <h3>${props.price}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
