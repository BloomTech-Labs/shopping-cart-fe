import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Form,
  Input,
  message,
  Button,
  List,
  Popconfirm,
  DatePicker,
  Radio
} from 'antd'
import moment from 'moment'
import * as creators from '../state/actionCreators'
import AxiosAuth from './Auth/axiosWithAuth'
import useCurrency from './hooks/useCurrency'
import history from '../history'
import axios from 'axios'

const Confirmation = props => {
  const cartId = props.match.params.id
  const cartContents = useSelector(state => state.savedCart)
  const storeDetails = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const [editedCart, setEditedCart] = useState(cartContents)
  const sign = useCurrency(storeDetails.currency)
  const totalPrice = arr => {
    return arr.reduce((sum, item) => {
      return sum + item.price * item.quantity
    }, 0)
  }
  const contents =
    editedCart.contents &&
    editedCart.contents.map(cart => {
      // return cart.product and not cart._id
      return { product: cart.product, quantity: cart.quantity }
    })

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      const payload = {
        storeId: cartContents.storeId,
        agreedPrice: parseInt(values.agreedPrice),
        total: totalPrice(editedCart.contents),
        checkoutDate: values.checkoutDate._d,
        paymentPreference: values.paymentPreference,
        deliveryOrCollection: values.delivery,
        contents
      }
      if (!err) {
        AxiosAuth()
          .put(
            `https://shopping-cart-eu3.herokuapp.com/api/store/cart/${cartId}/approve`,
            payload
          )
          .then(res => {
            dispatch(creators.getCart(cartId))
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        message.error('Enter Required Fields')
      }
    })
  }

  const disabledDate = current =>
    // Can not select days before today
    current &&
    current <
      moment()
        .endOf('day')
        .subtract(1, 'day')

  const confirmPayment = e => {
    e.preventDefault()
    const payload = {
      amount: cartContents.agreedPrice * 100,
      cartId: cartId
    }
    axios
      .put(
        'https://shopping-cart-eu3.herokuapp.com/api/payment/complete',
        payload
      )
      .then(res => {
        dispatch(creators.getCart(cartId))
      })
      .catch(err => {
        message.error('An Error Occurred', err)
      })
  }

  const routeToDash = () => {
    history.push('/dashboard')
  }

  const { getFieldDecorator } = props.form
  // const formItemLayout = {
  //   labelCol: {
  //     xs: { span: 8 },
  //     sm: { span: 16 }
  //   },
  //   wrapperCol: {
  //     xs: { span: 8 },
  //     sm: { span: 16 }
  //   }
  // }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  }
  useEffect(() => {
    dispatch(creators.getCart(cartId))
  }, [dispatch, cartId])
  useEffect(() => {
    setEditedCart(cartContents)
  }, [cartContents])
  useEffect(() => {
    dispatch(creators.getStore(cartContents.storeId))
  }, [dispatch, cartContents.storeId])
  const add = itemId => {
    const update = {
      ...editedCart,
      contents: editedCart.contents.map(item => {
        if (item._id === itemId) {
          const bol = {
            ...item,
            quantity: item.quantity + 1
          }
          return bol
        } else {
          return { ...item }
        }
      })
    }
    setEditedCart(update)
  }
  const minus = num => {
    if (num === 1) {
      return 1
    } else {
      return num - 1
    }
  }
  const subtract = itemId => {
    const update = {
      ...editedCart,
      contents: editedCart.contents.map(item => {
        if (item._id === itemId) {
          const semi = {
            ...item,
            quantity: minus(item.quantity)
          }
          return semi
        } else {
          return { ...item }
        }
      })
    }
    setEditedCart(update)
  }
  const remove = itemId => {
    const update = {
      ...editedCart,
      contents: editedCart.contents.filter(function(obj) {
        return obj._id !== itemId
      })
    }
    setEditedCart(update)
  }
  return (
    <div className='payments-cover'>
      <div className='checkout'>
        <h4>Cart Confirmation</h4>
        <div className='order'>
          <p>Order Summary</p>
          <div className='summary flex'>
            <List
              itemLayout='horizontal'
              dataSource={editedCart.contents}
              renderItem={item => (
                <List.Item>
                  {!cartContents.finalLock ? (
                    <div className='controls'>
                      <div
                        onClick={() => subtract(item._id)}
                        className='clicks'
                      >
                        -
                      </div>
                      <div className='clicks count'>{item.quantity}</div>
                      <div onClick={() => add(item._id)} className='clicks'>
                        +
                      </div>
                    </div>
                  ) : (
                    <div className='controls'>
                      <div className='clicks count'>{item.quantity}</div>
                    </div>
                  )}
                  <List.Item.Meta
                    title={item.name}
                    description={`${sign}${item.price}`}
                  />
                  {!cartContents.finalLock ? (
                    <Popconfirm
                      title='Are you sure remove this item?'
                      onConfirm={() => remove(item._id)}
                      // onCancel={cancel}
                      okText='Yes'
                      cancelText='No'
                    >
                      <div className='cancel'>X</div>
                    </Popconfirm>
                  ) : null}
                </List.Item>
              )}
            />
          </div>
          <div className='summary left'>
            <div className='units'>
              <span style={{ color: '#FF6663' }}>Total:</span>{' '}
              <span>
                {sign}
                {editedCart.contents
                  ? totalPrice(editedCart.contents).toFixed(2)
                  : cartContents.total
                  ? cartContents.total.toFixed(2)
                  : undefined}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='lower'>
        <Form
          onSubmit={!cartContents.finalLock ? handleSubmit : confirmPayment}
        >
          <Form.Item label='Agreed price'>
            {getFieldDecorator('agreedPrice', {
              initialValue: cartContents.agreedPrice
                ? cartContents.agreedPrice.toFixed(2)
                : undefined,
              rules: [
                {
                  required: true,
                  message: 'Enter agreed price'
                }
              ]
            })(
              <Input
                className='form-input'
                placeholder='Agreed Price'
                disabled={cartContents.finalLock}
                addonBefore={sign}
              />
            )}
          </Form.Item>
          <Form.Item label='Payment preference'>
            {getFieldDecorator('paymentPreference', {
              initialValue: cartContents.paymentPreference,
              rules: [
                {
                  required: true,
                  message: 'Select Payment Preference'
                }
              ]
            })(
              <Radio.Group disabled={cartContents.finalLock}>
                <Radio value='Cash'>Pay with Cash</Radio>
                <Radio value='Card'>Pay with Card</Radio>
                <Radio value='USSD'>Pay with USSD</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label='Delivery preference'>
            {getFieldDecorator('delivery', {
              rules: [
                {
                  required: true,
                  message: 'Enter Delivery preference'
                }
              ]
            })(
              <Radio.Group disabled={cartContents.finalLock}>
                <Radio value='Delivery'>Delivery</Radio>
                <Radio value='Collection'>Collection</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label='Collection/Delivery Date'>
            {getFieldDecorator('checkoutDate', {
              initialValue: moment(cartContents.checkoutDate),
              type: 'object',
              rules: [
                {
                  required: true,
                  message: 'Enter Collection Date'
                }
              ]
            })(
              <DatePicker
                disabled={cartContents.finalLock}
                disabledDate={disabledDate}
              />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {!cartContents.finalLock ? (
              <Button type='primary' htmlType='submit'>
                Approve cart
              </Button>
            ) : null}
            {cartContents.finalLock && !cartContents.checkedOut ? (
              <Popconfirm
                title='Are you sure you want to confirm?'
                onConfirm={confirmPayment}
                okText='Yes'
                cancelText='No'
              >
                <Button type='primary'>Confirm Payment</Button>
              </Popconfirm>
            ) : null}
            {cartContents.checkedOut && cartContents.finalLock ? (
              <div
                onClick={routeToDash}
                style={{ backgroundColor: '#FF6663', color: 'white' }}
              >
                Transaction Complete! Go to Dashboard.
              </div>
            ) : null}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

const ConfirmationPage = Form.create({ name: 'confirm' })(Confirmation)

export default ConfirmationPage
