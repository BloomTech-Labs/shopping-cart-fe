import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, List, message, Modal } from 'antd';
import * as creators from '../../state/actionCreators';
import { NavLink } from 'react-router-dom';
import AddEmail from '../elements/saveForlaterModal';
import history from '../../history';
import useCurrency from '../hooks/useCurrency';

const ReviewMain = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formRef, setFormRef] = useState(null);
  const cartContents = useSelector((state) => state.cart);
  const sellerId = useSelector((state) => state.user.user._id);
  const dispatch = useDispatch();
  const storeDetails = useSelector((state) => state.user.user);
  const sign = useCurrency(storeDetails.currency);

  useEffect(() => {
    console.log('🔥 cartContnets', cartContents);
  }, [cartContents]);

  const increment = (id) => {
    dispatch(creators.increment(id));
  };
  const decrement = (id) => {
    dispatch(creators.decrement(id));
  };
  const removeItem = (item) => {
    dispatch(creators.subtractFromCart(item));
  };
  const showModal = () => {
    setIsVisible(true);
  };
  const handleCancel = () => {
    setIsVisible(false);
  };
  const saveFormRef = useCallback((node) => {
    if (node !== null) {
      setFormRef(node);
    }
  }, []);
  const totalPrice = (arr) => {
    return arr.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  };
  const success = () => {
    const secondsToGo = 3;
    const modal = Modal.success({
      title: 'Sent! ',
      content: 'Check your email for your cart link',
    });
    setTimeout(() => {
      history.push(`/store/${sellerId}`);
      modal.destroy();
    }, secondsToGo * 1000);
  };
  const handleCreate = (props) => {
    formRef.validateFields((err, values) => {
      if (!err) {
        const contents = cartContents.map((cart) => {
          return { product: cart.productId, quantity: cart.quantity };
        });
        const payload = {
          email: values.email,
          contents: contents,
          total: totalPrice(cartContents),
          agreedPrice: totalPrice(cartContents),
          paymentPreference: 'card',
        };
        axios
          .post(
            `https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/store/${sellerId}/cart`,
            payload
          )
          .then((res) => {
            formRef.resetFields();
            success();
            setIsVisible(false);
          })
          .catch((error) => {
            message.error(error.message);
          });
      }
    });
  };
  return (
    <div className='cover review'>
      <div className='store-top review-top'>
        <div className='review-text'>
          <Icon type='shopping-cart' style={{ fontSize: '3rem' }} />
          <div id='rev'>
            <h4>Review Your Order</h4>
            <p id='grey'>
              This is your chance to check your order before going to payments.
              Make it count.
            </p>
          </div>
          <div>
            <p>
              Got a question about your order? You can ask the seller on
              Whatsapp by clicking here.
            </p>
          </div>
        </div>
        <div className='content'>
          <List
            itemLayout='horizontal'
            dataSource={cartContents}
            renderItem={(item) => (
              <List.Item>
                <div className='controls'>
                  <div
                    onClick={() => decrement(item.productId)}
                    className='clicks'>
                    -
                  </div>
                  <div className='clicks count'>{item.quantity}</div>
                  <div
                    onClick={() =>
                      item.quantity >= 20
                        ? message.warning(
                            "You can't add more than 20 quantities per item"
                          )
                        : increment(item.productId)
                    }
                    className='clicks'>
                    +
                  </div>
                </div>
                <List.Item.Meta
                  title={item.name}
                  description={`${sign}${item.price}`}
                />
                <div
                  onClick={() => removeItem({ _id: item.productId })}
                  className='cancel'>
                  X
                </div>
              </List.Item>
            )}
          />
          {cartContents.length > 0 ? (
            <div className='button-body'>
              <div
                onClick={showModal}
                style={{ backgroundColor: '#0B3954' }}
                className='button'>
                Save for later
              </div>
              <AddEmail
                ref={saveFormRef}
                visible={isVisible}
                onCancel={handleCancel}
                onCreate={handleCreate}
              />
              <NavLink to='/savecart'>
                <div style={{ backgroundColor: '#FF6663' }} className='button'>
                  Go to Checkout
                </div>
              </NavLink>
            </div>
          ) : (
            'Please add items to your cart!'
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewMain;
