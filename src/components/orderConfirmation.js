import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, message, Button } from 'antd'
import '../less/index.less'
import * as creators from '../state/actionCreators'
import AxiosAuth from './Auth/axiosWithAuth'

const Confirmation = (props) => {
  const cartId = props.match.params.id
  const cartContents = useSelector(state => state.savedCart)
  const dispatch = useDispatch()
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      const payload = {
        agreedPrice: values.agreedPrice,
        total: cartContents.total
      }
      if (!err) {
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
  return (
    <div className='payments-cover'>
      <div className='checkout'>
        <h4>Check out Confirmation</h4>
        <div className='order'>
          <p>Order Summary</p>
          <div className='summary'>
            {cartContents.contents &&
            cartContents.contents.length &&
              cartContents.contents.map(item => (
                <div className='units stop' key={item._id}>{item.name} ({item.quantity} units) - <span style={{ color: '#FF6663' }}>{item.price}</span></div>
              ))}
          </div>
          <div className='summary left'>
            <div className='units'><span style={{ color: '#FF6663' }}>Total:</span> <span>{cartContents.total}</span></div>
            <div className='units'><span style={{ color: '#FF6663' }}>Agreed price:</span> <span>{cartContents.agreedPrice}</span></div>
            {/* <div className='units'><span style={{ color: '#FF6663' }}>Delivery preference:</span> <span>{cartContents.delivery}</span></div> */}
            <div className='units'><span style={{ color: '#FF6663' }}>Payment preference:</span> <span>{cartContents.paymentPreference}</span></div>
            <div className='units'><span style={{ color: '#FF6663' }}>Date saved:</span> <span>{cartContents.checkoutDate}</span></div>
          </div>
        </div>
      </div>
      <div className='lower'>
        <Form onSubmit={handleSubmit}>
          <Form.Item label='Agreed price'>
            {getFieldDecorator('agreedPrice', {
              rules: [
                {
                  message: 'Enter agreed price'
                },
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
