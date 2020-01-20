import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Radio, DatePicker } from 'antd'
import { useSelector } from 'react-redux'
import '../../less/index.less'

const SaveCart = (props) => {
  const cartContents = useSelector(state => state.cart)
  const checkoutCart = cartContents.filter(item => {
    return item.quantity > 0
  })
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFieldsAndScroll({ force: true }, (err, values) => {
      const payload = {
        whatsappNumber: values.whatsappNumber,
        delivery: values.delivery,
        payment: values.payment,
        address: values.address
      }
      if (!err) {
        console.log(payload)
      }
    })
  }
  const { getFieldDecorator } = props.form

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  }
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
  const config = {
    rules: [{ type: 'object', required: false, message: 'Please select time!' }]
  }
  return (
    <div className='savecart-cover'>
      <div id='inner'>
        <div className='checkout'>
          {/* <h4>Check out</h4> */}
          <div className='order'>
            <p>Order Summary</p>
            <div className='summary'>
              {
                checkoutCart.map(item => (
                  <div className='units' key={item.productId}>{item.name}({item.quantity} units) - {item.price}</div>
                ))
              }
            </div>
          </div>
          <div id='linkbox'>
            <p>Here's a link to the sellers Whatsapp number, if you have any questions.</p>
            <div className='whatsapp'>
              <span>Whatsapp</span> <img alt='whatsapp' src='https://cdn4.iconfinder.com/data/icons/a-s-social-set/256/whatsapp-512.png' style={{width: '3rem', height: '3rem' }} />
            </div>
          </div>
        </div>
        <div className='lower'>
          {/* <h4>Cart details</h4> */}
          <Form {...formItemLayout} onSubmit={handleSubmit}>
            <div id='header'>
              <p>
            Take a second to tell us your collection/delivery and payments preferences.
              </p>
            </div>
            <Form.Item label='Whatsapp number'>
              {getFieldDecorator('whatsappNumber', {
                rules: [
                  {
                    message: 'Enter your Whatsapp number'
                  },
                  {
                    required: false,
                    message: 'Enter your Whatsapp number'
                  }
                ]
              })(<Input placeholder='Whatsapp number' />)}
            </Form.Item>
            <Form.Item label='Delivery option'>
              {getFieldDecorator('delivery')(
                <Radio.Group>
                  <Radio value='Delivery'>Delivery</Radio>
                  <Radio value='Collection'>Collection</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <span id='info'>
                Enter your delivery address in the field below if you opt for delivery.
                If you would rather collect the item in person, the seller will contact you with the Whatsapp number you provided above
            </span>
            <Form.Item label='Delivery Address'>
              {getFieldDecorator('address', {
                rules: [{ required: true, message: 'Please input your adress!' }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label='Collection/Delivery date'>
              {getFieldDecorator('date-picker', config)(<DatePicker />)}
            </Form.Item>
            <Form.Item label='Payment preference'>
              {getFieldDecorator('payment')(
                <Radio.Group>
                  <Radio value='Cash'>Pay with Cash</Radio>
                  <Radio value='Card'>Pay with Card</Radio>
                  <Radio value='USSD'>Pay with USSD</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type='primary' htmlType='submit'>
            Save cart
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

const SaveCartForm = Form.create({ name: 'register' })(SaveCart)

export default SaveCartForm
