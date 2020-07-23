import React, { useState } from 'react';
import timesIcon from '../../images/times-icon.svg';
import trashIcon from '../../images/trash_icon.svg';

const OrderContentsCards = ({ order, RemoveItem, orderCanceled }) => {
  const [readyToDelete, setReadyToDelete] = useState(false);

  function deleteDelay() {
    setReadyToDelete(true);
    setTimeout(function () {
      setReadyToDelete(false);
    }, 6000);
  }

  return (
    <div
      className='ProductCardContainer'
      data-testid='orderContentsCardsWrapper'>
      {order
        ? order.map((cv) => {
            return (
              <div key={Math.random()} className='OrderContents' data-testid="orderContentsCardSecondaryWrapper">
                <div className='orderItemInfo'>
                  <h3> {cv.quantity} </h3>
                  <img src={timesIcon} alt='' />
                  <div className='productContainer'>
                    {cv.product ? (
                      <h3> {cv.product.productName} </h3>
                    ) : (
                      <h3>"Product is deleted"</h3>
                    )}
                    <h4> {cv.chosenVariant ? cv.chosenVariant.option : ''}</h4>
                  </div>
                </div>
                <div className='orderActions'>
                  {readyToDelete ? (
                    <div className='deleteFunction'>
                      <div
                        className='deleteBTN'
                        onClick={() => {
                          RemoveItem(cv._id);
                        }}>
                        Delete Item?
                      </div>
                      <div className='loadBar' />
                    </div>
                  ) : (
                    <img
                      alt=''
                      className={orderCanceled ? 'hidden' : ''}
                      src={trashIcon}
                      onClick={() => {
                        deleteDelay();
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })
        : 'loading'}
    </div>
  );
};

export default OrderContentsCards;
