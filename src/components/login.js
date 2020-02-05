import React from 'react'
import axios from 'axios'
import withAuth from './Auth/axiosWithAuth'
import { Link } from 'react-router-dom'
import { Form, Input, Icon, Button, message, Spin } from 'antd'
import Logo from './elements/logo'
import image from '../images/register.png'
import history from '../history'
import { connect } from 'react-redux'
import { setLoading, setErrors, clearErrors } from '../state/actionCreators'

const loginURL = 'https://shopping-cart-eu3.herokuapp.com/api/auth/login'
const storeURL = 'https://shopping-cart-eu3.herokuapp.com/api/store'
const Login = props => {
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      const payload = {
        phone: values.number.trim(),
        password: values.password
      }
      if (!err) {
        props.dispatch(setLoading(true))
        axios
          .post(loginURL, payload)
          .then(res => {
            message.success('Login Successful')
            localStorage.setItem('token', res.data.token)
            props.dispatch(clearErrors())

            // check if user has store
            withAuth()
              .get(storeURL)
              .then(res => {
                if (res.data._id) {
                  history.push('/dashboard')
                } else {
                  history.push('/createstore')
                }
              })
              .catch(error => {
                if (error.response.data.message === 'No store found') {
                  history.push('/createstore')
                } else {
                  message.error(Object.values(error.response.data)[0])
                }
              })
          })
          .catch(error => {
            props.dispatch(setLoading(false))
            props.dispatch(setErrors(error.response.data))
            message.error(Object.values(error.response.data)[0])
          })
      } else {
        message.error('Enter Required Fields')
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

  const loginForm = (
    <Spin spinning={props.isLoading}>
      <div className='cover'>
        <div className='desktop-logo'>
          <h2 className='register-text'>Login to your account</h2>
          <div className='desktop-logo-large'>
            <img src={image} alt='PureRetail Logo' width='300' height='300' />
          </div>
        </div>
        <Logo />
        <div className='desktop-form'>
          <Form {...formItemLayout} onSubmit={handleSubmit}>
            <div id='header' data-testid='log-in'>
              <h2>Login</h2>
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
                  className='form-input'
                  placeholder='Phone number'
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
                  }
                ]
              })(
                <Input.Password
                  className='form-input'
                  placeholder='Password'
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.70)' }} />
                  }
                />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type='primary' htmlType='submit'>
                Login
              </Button>
            </Form.Item>
          </Form>
          <div id='or_login'>
            <p>
              or <Link to='/register'>register</Link> instead
            </p>
            <p>
              <Link to='/resetpassword'>Forgot password?</Link>
            </p>
          </div>
        </div>
      </div>
    </Spin>
  )

  return loginForm
}
const LoginForm = Form.create({ name: 'register' })(Login)

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  errors: state.user.errors
})

export default connect(mapStateToProps, null)(LoginForm)
