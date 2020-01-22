import React, { useState, useEffect } from 'react'
import axiosWithAuth from '../Auth/axiosWithAuth'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Input, Select, Button, message, Spin, Modal } from 'antd'
import '../../less/index.less'
import logo from '../../images/PureRetail_Logo.png'
import {
  logout,
  setLoading,
  setStore as updateStore,
  deleteAccount,
  getCurrentUser
} from '../../state/actionCreators'
import history from '../../history'

const storeUrl = 'https://shopping-cart-eu3.herokuapp.com/api/store/'

const { Option } = Select

const EditProfile = ({ dispatch, isLoading, form }) => {
  const [store, setStore] = useState({
    ownerName: '',
    currency: '',
    storeName: '',
    imageUrl: ''
  })

  useEffect(() => {
    dispatch(setLoading(true))
    dispatch(getCurrentUser())
    axiosWithAuth()
      .get(storeUrl)
      .then(res => {
        const { ownerName, currency, storeName, address } = res.data
        setStore({ ownerName, currency, storeName, address })
        dispatch(setLoading(false))
      })
      .catch(err => {
        dispatch(setLoading(false))
        setErrors(err.response.data)
      })
  }, [dispatch])

  const [errors, setErrors] = useState({})

  const handleChange = e => {
    setStore({ ...store, [e.target.name]: e.target.value })
  }

  const handleLogout = () => {
    // delete token from local storage and redirect to login
    dispatch(logout())
    history.push('/')
  }

  const handleDeleteAccount = () => {
    const { confirm } = Modal
    confirm({
      title: 'Are you sure you want to delete your account?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () {
        dispatch(setLoading(true))
        dispatch(deleteAccount())
        dispatch(logout())
        history.push('/register')
      },
      onCancel () {}
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setLoading(true))
    setErrors({})
    form.validateFieldsAndScroll({ force: true }, (err, values) => {
      if (err) {
        message.error('Enter Required Fields')
      }

      axiosWithAuth()
        .put(storeUrl, values)
        .then(res => {
          dispatch(updateStore(res.data))
          message.success('Your store has been updated')
          history.push('/dashboard')
        })
        .catch(errors => {
          message.error(Object.values(errors.response.data)[0])
          setErrors(errors.response.data)
        })
    })
  }

  const { getFieldDecorator } = form

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

  const createStore = (
    <div className='cover'>
      <div id='logo'>
        <img src={logo} alt='PureRetail Logo' />
      </div>
      <p className='text'>You currently haven't created a store yet</p>
      <p className='text'>
        Click{' '}
        <Link className='link' to='/createstore'>
          here
        </Link>{' '}
        to create one
      </p>
      <Button onClick={handleLogout} type='primary' htmlType='button'>
        Logout
      </Button>
    </div>
  )

  const editProfile = (
    <Spin spinning={isLoading}>
      <div className='cover'>
        <div id='logo'>
          <img src={logo} alt='PureRetail Logo' />
        </div>
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          <div id='header'>Edit your profile</div>

          <Form.Item>
            {getFieldDecorator('ownerName', {
              initialValue: store.ownerName,
              rules: [
                {
                  message: 'Enter your name'
                },
                {
                  required: true,
                  message: 'Enter your name'
                }
              ]
            })(
              <Input
                onChange={handleChange}
                name='ownerName'
                placeholder='Name of Store owner'
              />
            )}
          </Form.Item>

          <Form.Item hasFeedback>
            {getFieldDecorator('currency', {
              initialValue: store.currency,
              rules: [
                {
                  required: true,
                  message: 'Select preferred currency'
                }
              ]
            })(
              <Select name='currency' placeholder='Select your currency'>
                <Option value='DOL'>DOL</Option>
                <Option value='POU'>POU</Option>
                <Option value='EUR'>EUR</Option>
                <Option value='YEN'>YEN</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('storeName', {
              initialValue: store.storeName,
              rules: [
                {
                  message: 'Store name is required'
                },
                {
                  required: true,
                  message: 'Store name is required'
                }
              ]
            })(
              <Input
                onChange={handleChange}
                name='storeName'
                placeholder='Store name'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('address', {
              initialValue: store.address,
              rules: [
                {
                  message: 'Store address is required'
                },
                {
                  required: true,
                  message: 'Store address is required'
                }
              ]
            })(
              <Input
                onChange={handleChange}
                name='address'
                placeholder='Store address'
              />
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
              Update
            </Button>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button onClick={handleLogout} type='primary' htmlType='button'>
              Logout
            </Button>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              onClick={handleDeleteAccount}
              id='delete-btn'
              type='link'
              htmlType='button'
            >
              Delete account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  )

  return errors.message ? createStore : editProfile
}

const EditForm = Form.create()(EditProfile)

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
})

export default connect(mapStateToProps, null)(EditForm)
