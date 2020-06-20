import React from "react";
import { NavLink } from "react-router-dom";

const ProductCard = props => {
  const { images, name, price, _id } = props.inventory;
  return (
    <div className="productCardContainer">
      <NavLink to={`/product/${_id}`}>
        <img className="productImage" src={images[0]} />
        <div className="productInfo">
          <p>{name}</p>
          <h3>${price}</h3>
        </div>
      </NavLink>
    </div>
  );
};

export default ProductCard;
