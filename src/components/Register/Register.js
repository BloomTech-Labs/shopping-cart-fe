import React, { useState } from 'react'
import axios from 'axios'
import { List, InputItem, WhiteSpace, Flex, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import logo from '../../images/PureRetail_Logo.png'
import '../Reusable/index.css'
import { ConfirmButton } from '../Reusable'

const signupURL = 'https://shopping-cart-eu3.herokuapp.com/api/auth/register'

const BasicInputExample = props => {
  const [confirmDirty] = useState(false)
  const [errMessage, setErrMessage] = useState('')
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
  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props
    if (value && value !== form.getFieldValue('password')) {
      //   callback('Two passwords that you enter is inconsistent!')
      setErrMessage('passwords do not match!')
    } else {
      callback()
      setErrMessage('')
    }
  }
  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }
  return (
    <form>
      <div className='flex-container'>
        <div id='logo'>
          <img src={logo} alt='PureRetail Logo' />
        </div>
        <div className='form'>
          <List
            renderHeader={() => (
              <div style={{ marginBottom: '2em' }}>
                Register new
                <br />
                account
              </div>
            )}
            renderFooter={() =>
              getFieldError('number', 'confirm') &&
              getFieldError('number', 'confirm').join(',')}
          >
            <Flex direction='column'>
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
              <WhiteSpace />
              <InputItem
                {...getFieldProps('password', {
                  rules: [
                    {
                      required: true
                    },
                    {
                      validator: validateToNextPassword
                    }
                  ]
                })}
                type='password'
                placeholder='Password'
              >
                <div style={{ backgroundImage: 'url(https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/lock-512.png)', backgroundSize: 'cover', height: '1.5rem', width: '1.5rem' }} />
              </InputItem>
              <WhiteSpace />
              <InputItem
                {...getFieldProps('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!'
                    },
                    {
                      validator: compareToFirstPassword
                    }
                  ]
                })}
                clear
                error={!!getFieldError('confirm')}
                onErrorClick={() => {
                  showToast(getFieldError('confirm').join('、'))
                }}
                type='password'
                placeholder='Confirm password'
              >
                <div style={{ backgroundImage: 'url(https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/lock-512.png)', backgroundSize: 'cover', height: '1.5rem', width: '1.5rem' }} />
              </InputItem>
              <WhiteSpace />
            </Flex>
          </List>
        </div>
        <ConfirmButton text='Register' handleSubmit={handleSubmit} />
        <WhiteSpace />
        <div>{errMessage}</div>
        <div id='or-log-in'>
          or <a href='#'>login</a> instead
        </div>
      </div>
    </form>
  )
}
const BasicInputExampleWrapper = createForm()(BasicInputExample)
export default BasicInputExampleWrapper
