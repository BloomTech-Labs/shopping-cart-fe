import React from 'react'
import axios from 'axios'
import {
  Form,
  Input,
  Icon,
  Button,
  message
} from 'antd'
import '../less/index.less'
import logo from '../images/PureRetail_Logo.png'

const loginURL = 'https://shopping-cart-eu3.herokuapp.com/api/auth/login'
const Login = (props) => {
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      const payload = {
        phone: values.number,
        password: values.password
      }
      if (!err) {
        axios.post(loginURL, payload)
          .then(res => {
            message.success('Logged!')
            localStorage.setItem('token', res.data.token)
            props.history.push('/dashboard')
          })
          .catch(error => {
            message.error(error.message)
          })
      } else {
        message.error('Validation failed')
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
  return (
    <div className="cover">
      <div id='logo'>
        <img src={logo} alt='PureRetail Logo' />
      </div>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <div id="header">
          <h2>Reset Password</h2>
        </div>
        <div id="instruction_text">
          <p>Enter your registered phone number to receive a password reset link via SMS:</p>
        </div>
        <Form.Item>
          {getFieldDecorator('number', {
            rules: [
              {
                message: 'Enter valid phone number',
              },
              {
                required: true,
                message: 'Enter valid phone number',
              }
            ]
          })(<Input
            placeholder="Phone number"
            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
              Get link
          </Button>
        </Form.Item>
      </Form>
      <div id="back-to-login">
        <p>Back to log in</p>
      </div>
      <div id="contact-support">
        <p><a>Contact support</a></p>
      </div>
    </div>
  )
}
const LoginForm = Form.create({ name: 'register' })(Login)

export default LoginForm
