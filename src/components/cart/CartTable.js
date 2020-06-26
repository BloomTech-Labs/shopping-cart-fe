import React, { useState, useCallback, useEffect } from "react"
import * as creators from "../../state/actionCreators"
import { useDispatch, useSelector } from "react-redux"
import times_icon from "../../images/times-icon.svg"
import equals_icon from "../../images/equals-icon.svg"
import delete_icon from "../../images/delete-icon.svg"
import add_icon from "../../images/add-icon.svg"
import subtract_icon from "../../images/subtract-icon.svg"
import emptyCartGraphic from "../../images/emptyCartGraphic.svg"
import { NavLink } from "react-router-dom"
const CartTable = ({ cartContents, totalPrice, props }) => {
  const dispatch = useDispatch()

  const increment = (id) => {
    console.log("isDispatching ++", id)
    dispatch(creators.increment(id))
  }

  const decrement = (id) => {
    console.log("isDispatching --", id)
    dispatch(creators.decrement(id))
  }

  const removeItem = (item) => {
    console.log("isDispatching item", item)
    dispatch(creators.subtractFromCart(item))
  }

  console.log("cartContents", cartContents)

  return (
    <div className="cartMasterContainer">
      {cartContents.length > 0 ? (
        <div>
          <div className="tableHeader">
            <p className="productTitle"> Product</p>
            <p className="priceTitle"> Price</p>
            <p className="quantityTitle"> Quantity</p>
            <p className="totalTitle"> Total</p>
          </div>
          <div></div>
        </div>
      ) : (
        <div className="emptyCart">
          <img src={emptyCartGraphic} alt="cartImage" />
          <h1>This is awkward... </h1>
          <h2>You don’t have’t any items in your cart </h2>
        </div>
      )}

      {cartContents
        ? cartContents.map((cv) => {
            return (
              <div>
                <div className="cartProductCard">
                  <div className="productSection">
                    <img
                      className="cartImage"
                      src={cv.images[0]}
                      alt="cartImage"
                    />
                    <div className="productInfo">
                      <h3> {cv.productName} </h3>
                      <p>{cv.variantDetails[0].option}</p>
                    </div>
                  </div>
                  {cv.variantDetails[0].price ? (
                    <h3>${cv.variantDetails[0].price}</h3>
                  ) : (
                    <h3>${cv.price}</h3>
                  )}
                  <img src={times_icon} alt="cartImage" />
                  <div className="quantityContainer">
                    <img
                      className="quantityBTN"
                      alt="cartImage"
                      src={subtract_icon}
                      onClick={() => {
                        decrement(cv.productId)
                      }}
                    />
                    <div className="quantityCounter">
                      <h3>{cv.quantity}</h3>
                    </div>
                    <img
                      className="quantityBTN"
                      src={add_icon}
                      alt="cartImage"
                      onClick={() => {
                        increment(cv.productId)
                      }}
                    />
                  </div>

                  <img
                    className="equalsIcon"
                    alt="cartImage"
                    src={equals_icon}
                  />
                  {cv.variantDetails[0].option ? (
                    <h3>
                      $
                      {Number.parseFloat(
                        cv.variantDetails[0].price * cv.quantity
                      ).toFixed(2)}
                    </h3>
                  ) : (
                    <h3>
                      ${Number.parseFloat(cv.price * cv.quantity).toFixed(2)}
                    </h3>
                  )}

                  <img
                    className="deleteIcon"
                    src={delete_icon}
                    alt="cartImage"
                    onClick={() => {
                      console.log("click fired", cv)
                      removeItem(cv)
                    }}
                  />
                </div>
              </div>
            )
          })
        : ""}
      {cartContents.length > 0 ? (
        <div className="totalPrice">
          <div className = "total">Total: ${totalPrice(cartContents)}</div>
          <NavLink to="/savecart">
            <button>Checkout</button>
          </NavLink>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default CartTable
