import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductCard = (props) => {
  return (
    <NavLink to={`/product/${props.id}`}>
      <div className='cardWrapper'>
        <img
          className='cardImage'
          src={props.image[0]}
          alt={props.description}
        />
        <div className='textbox'>
          <h3>{props.productName}</h3>
          <p>${props.price}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCard;
