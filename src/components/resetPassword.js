import React, {useState} from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'
import {
  Form,
  Input,
  Icon,
  Button,
  message
} from 'antd'
import '../less/index.less'
import logo from '../images/PureRetail_Logo.png'

const URL = 'https://shopping-cart-eu3.herokuapp.com/api/auth/recover'
const ResetPassword = (props) => {
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      const payload = {
        phone: values.number
      }
      if (!err) {
        axios.post(URL, payload)
          .then(res => {
            message.success('Your password reset is on its way!')
            props.history.push('/login')
          })
          .catch(error => {
            message.error(error.message)
          })
      } else {
        message.error('Please enter a valid phone number to proceed.')
      }
    })
  }
  const { getFieldDecorator } = props.form
  const handleConfirmBlur = e => {
    const { value } = e.target
    setConfirmDirty(!!value)
  }
  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }
  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
    const [confirmDirty, setConfirmDirty] = useState(false)  
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
        <Route exact path='/resetpassword'>
          <div id="instruction-text">
            <p>Enter your registered phone number to receive a password reset link via SMS:</p>
          </div>
          <Form.Item>
            {getFieldDecorator('number', {
              rules: [
                {
                  message: 'Enter a valid phone number',
                },
                {
                  required: true,
                  message: 'Enter a valid phone number',
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
        </Route>
        <Route path='/resetpassword/:token'>
        <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            })(<Input.Password 
                placeholder="Password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={handleConfirmBlur} 
                placeholder="Confirm Password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Route>
      </Form>
      <div id="back-to-login">
        <p>Back to log in</p>
      </div>
      <div id="contact-support">
        <p>Contact support</p>
      </div>
    </div>
  )
}
const ResetPasswordForm = Form.create({ name: 'resetPassword' })(ResetPassword)

export default ResetPasswordForm
