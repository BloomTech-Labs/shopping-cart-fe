import React from 'react'
import axios from 'axios'
import { List, InputItem, WhiteSpace, Flex, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import logo from '../../images/PureRetail_Logo.png'
import '../Reusable/index.css'
import { ConfirmButton } from '../Reusable'

const signupURL = 'https://shopping-cart-eu3.herokuapp.com/api/auth/register'

const ResetPassword = props => {
  function showToast (error) {
    Toast.info(error, 1)
  }
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields({ force: true }, (err, values) => {
      const payload = {
        phone: values.number,
        password: values.password
      }
      if (!err) {
        axios.post(signupURL, payload)
          .then(res => {
            showToast('Signed Up')
            props.form.resetFields()
          })
          .catch(error => {
            window.alert(error.message)
          })
      } else {
        window.alert('Validation failed')
      }
    })
  }
  const { getFieldProps, getFieldError } = props.form
  return (
    <form>
      <div className='flex-container'>
        <div id='logo'>
          <img src={logo} alt='PureRetail Logo' />
        </div>
        <WhiteSpace />
        <div className='form'>
          <List
            renderHeader={() => (
              <div style={{ marginBottom: '2em' }}>Reset Password</div>
            )}
            renderFooter={() =>
              getFieldError('number', 'confirm') && getFieldError('number', 'confirm').join(',')}
          >
            <Flex direction='column'>
              <div>Enter your registered phone number to receive a password reset link via SMS:</div>
              <InputItem
                {...getFieldProps('number', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input number'
                    }
                  ]
                })}
                clear
                error={!!getFieldError('number')}
                onErrorClick={() => {
                  showToast(getFieldError('number').join('、'))
                }}
                type='number'
                placeholder='Phone number'
              >
                <div style={{ backgroundImage: 'url(https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/phone1-512.png)', backgroundSize: 'cover', height: '1.2rem', width: '1.2rem' }} />
              </InputItem>
            </Flex>
          </List>
        </div>
        <ConfirmButton text='Get link' handleSubmit={handleSubmit} />
        <WhiteSpace />
        <div>
          <a href='/login'>Back to login</a>
        </div>
        <div>
          <a href='/login'>Contact support</a>
        </div>
      </div>
    </form>
  )
}
const ResetPasswordWrapper = createForm()(ResetPassword)
export default ResetPasswordWrapper
