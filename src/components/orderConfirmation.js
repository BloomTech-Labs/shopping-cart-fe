import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, message, Button, List, Popconfirm, DatePicker, Radio } from 'antd'
import moment from 'moment'
import '../less/index.less'
import * as creators from '../state/actionCreators'
import AxiosAuth from './Auth/axiosWithAuth'

const Confirmation = (props) => {
  const cartId = props.match.params.id
  const cartContents = useSelector(state => state.savedCart)
  const dispatch = useDispatch()
  const [editedCart, setEditedCart] = useState(cartContents)
  const totalPrice = (arr) => {
    return arr.reduce((sum, item) => {
      return sum + (item.price * item.quantity)
    }, 0)
  }
  const contents = editedCart.contents && editedCart.contents.map(cart => {
    //return cart.product and not cart._id
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
        console.log(payload)
        AxiosAuth()
          .put(`https://shopping-cart-eu3.herokuapp.com/api/store/cart/${cartId}/approve`, payload)
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
  const { getFieldDecorator } = props.form
  //   const formItemLayout = {
  //     labelCol: {
  //       xs: { span: 8 },
  //       sm: { span: 16 }
  //     },
  //     wrapperCol: {
  //       xs: { span: 8 },
  //       sm: { span: 16 }
  //     }
  //   }
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
  const add = (itemId) => {
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
  const minus = (num) => {
    if (num === 1) {
      return 1
    } else {
      return num - 1
    }
  }
  const subtract = (itemId) => {
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
  const remove = (itemId) => {
    const update = {
      ...editedCart,
      contents: editedCart.contents.filter(function (obj) {
        return obj._id !== itemId
      })
    }
    setEditedCart(update)
  }
  return (
    <div className='payments-cover'>
      <div className='checkout'>
        <h4>Check out Confirmation</h4>
        <div className='order'>
          <p>Order Summary</p>
          <div className='summary flex'>
            <List
              itemLayout='horizontal'
              dataSource={editedCart.contents}
              renderItem={item => (
                <List.Item>
                  <div className='controls'>
                    <div onClick={() => subtract(item._id)} className='clicks'>-</div>
                    <div className='clicks count'>{item.quantity}</div>
                    <div onClick={() => add(item._id)} className='clicks'>+</div>
                  </div>
                  <List.Item.Meta
                    title={item.name}
                    description={item.price}
                  />
                  <Popconfirm
                    title='Are you sure remove this item?'
                    onConfirm={() => remove(item._id)}
                    // onCancel={cancel}
                    okText='Yes'
                    cancelText='No'
                  >
                    <div className='cancel'>X</div>
                  </Popconfirm>
                </List.Item>
              )}
            />
          </div>
          <div className='summary left'>
            <div className='units'><span style={{ color: '#FF6663' }}>Total:</span> <span>{editedCart.contents ? totalPrice(editedCart.contents) : cartContents.total}</span></div>
          </div>
        </div>
      </div>
      <div className='lower'>
        <Form onSubmit={handleSubmit}>
          <Form.Item label='Agreed price'>
            {getFieldDecorator('agreedPrice', {
              initialValue: cartContents.agreedPrice,
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
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('paymentPreference', { initialValue: cartContents.paymentPreference })(
              <Radio.Group>
                <Radio value='Cash'>Pay with Cash</Radio>
                <Radio value='Card'>Pay with Card</Radio>
                <Radio value='USSD'>Pay with USSD</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label='Delivery option'>
              {getFieldDecorator('delivery')(
                <Radio.Group>
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
              <DatePicker />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {
              !cartContents.finalLock
                ? <Button type='primary' htmlType='submit'>
                  Approve cart
                  </Button>
                : <div style={{ color: '#FF6663' }}>
                  Cart Approved
                  </div>
            }
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

const ConfirmationPage = Form.create({ name: 'confirm' })(Confirmation)

export default ConfirmationPage
