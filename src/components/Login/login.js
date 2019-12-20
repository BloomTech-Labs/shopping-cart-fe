import React, { useState } from 'react'
import axios from 'axios'
import { List, InputItem, WhiteSpace, Flex, Toast } from 'antd-mobile'
import { createForm } from 'rc-form';
import logo from '../../images/PureRetail_Logo.png'
import '../Reusable/index.css'
import { ConfirmButton } from '../Reusable'

const loginURL = 'https://shopping-cart-eu3.herokuapp.com/api/auth/login';

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
        axios.post(loginURL, payload)
          .then(res => {
            showToast('Logged!');
            localStorage.setItem('token', res.data.token);
            props.history.push('/dashboard');
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
        <div className='form'>
          <List
            renderHeader={() => (
              <div style={{ marginBottom: '2em' }}>
                Log in
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
                      message: 'Please input phone numbner'
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
                      required: true,
                      message: 'Password required'
                    }
                  ]
                })}
                type='password'
                placeholder='Password'
              >
                <div style={{ backgroundImage: 'url(https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/lock-512.png)', backgroundSize: 'cover', height: '1.5rem', width: '1.5rem' }} />
              </InputItem>
              <WhiteSpace />
              
              <WhiteSpace />
            </Flex>
          </List>
          <ConfirmButton text='Log in' handleSubmit={handleSubmit} />
        <WhiteSpace />
        <div>{errMessage}</div>
        <div id='or-log-in'>
          or <a href='/register'>register</a> instead
        </div>
      </div>
        </div>
        
    </form>
  )
}
const BasicInputExampleWrapper = createForm()(BasicInputExample)
export default BasicInputExampleWrapper
