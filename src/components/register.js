import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Input, Icon, Button, message, Spin } from 'antd'
import Logo from './elements/logo'
import image from '../images/register.png'
import history from '../history'
import { setLoading, setErrors, clearErrors } from '../state/actionCreators'
import { connect } from 'react-redux'

const signupURL = 'https://shopping-cart-eu3.herokuapp.com/api/auth/register'
const RegistrationForm = props => {
  const [confirmDirty, setConfirmDirty] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      const payload = {
        phone: values.number,
        password: values.password
      }
      if (!err) {
        props.dispatch(setLoading(true))
        axios
          .post(signupURL, payload)
          .then(res => {
            message.success('Signed Up')
            localStorage.setItem('token', res.data.token)
            props.dispatch(clearErrors())
            history.push('/createstore')
          })
          .catch(error => {
            props.dispatch(setErrors(error.response.data))
            props.dispatch(setLoading(false))
            message.error(Object.values(error.response.data)[0])
          })
      } else {
        message.error('Enter Required Fields')
      }
    })
  }
  const handleConfirmBlur = e => {
    const { value } = e.target
    setConfirmDirty(!!value)
  }
  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords do not match!')
    } else {
      callback()
    }
  }
  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props

    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
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

  const registerForm = (
    <Spin spinning={props.isLoading}>
      <div className='cover'>
        <div className='desktop-logo'>
          <h2 className='register-text'>Register new account</h2>
          <div className='desktop-logo-large'>
            <img src={image} alt='PureRetail Logo' width='300' height='300' />
          </div>
        </div>
        <Logo />
        <div className='desktop-form'>
          <Form {...formItemLayout} onSubmit={handleSubmit}>
            <div id='header'>
              <h2>
                Register new <br /> account
              </h2>
            </div>
            <Form.Item>
              {getFieldDecorator('number', {
                rules: [
                  {
                    message: 'Enter valid phone number'
                  },
                  {
                    required: true,
                    message: 'Enter valid phone number'
                  }
                ]
              })(
                <Input
                  className='input'
                  placeholder='e.g. 2348000001231'
                  prefix={
                    <Icon type='phone' style={{ color: 'rgba(0,0,0,.70)' }} />
                  }
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!'
                  },
                  {
                    validator: validateToNextPassword
                  }
                ]
              })(
                <Input.Password
                  className='input'
                  placeholder='Password'
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.70)' }} />
                  }
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!'
                  },
                  {
                    validator: compareToFirstPassword
                  }
                ]
              })(
                <Input.Password
                  className='input'
                  onBlur={handleConfirmBlur}
                  placeholder='Confirm Password'
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.70)' }} />
                  }
                />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type='primary' htmlType='submit'>
                Register
              </Button>
            </Form.Item>
          </Form>
          <div id='or_login'>
            <p>
              or <Link to='/'>login</Link> instead
            </p>
          </div>
        </div>
      </div>
    </Spin>
  )

  return registerForm
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(
  RegistrationForm
)

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  errors: state.user.errors
})

export default connect(mapStateToProps, null)(WrappedRegistrationForm)
