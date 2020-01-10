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
  deleteStore,
  setStore as updateStore
} from '../../state/actionCreators'
import history from '../../history'

const storeUrl = 'https://shopping-cart-eu3.herokuapp.com/api/store/'

const { Option } = Select

const EditProfile = props => {
  const [store, setStore] = useState({
    ownerName: '',
    currency: '',
    storeName: '',
    imageUrl: ''
  })

  useEffect(() => {
    props.dispatch(setLoading(true))
    axiosWithAuth()
      .get(storeUrl)
      .then(res => {
        const { ownerName, currency, storeName } = res.data
        setStore({ ownerName, currency, storeName })
        props.dispatch(setLoading(false))
      })
      .catch(err => {
        props.dispatch(setLoading(false))
        setErrors(err.response.data)
      })
  }, [])

  const [errors, setErrors] = useState({})

  const handleChange = e => {
    setStore({ ...store, [e.target.name]: e.target.value })
  }

  const handleLogout = () => {
    // delete token from local storage and redirect to login
    props.dispatch(logout())
    history.push('/')
  }

  const handleDeleteStore = () => {
    props.dispatch(deleteStore())
    Modal.info({
      title: 'Success',
      content: 'Your store has been deleted successfully.',
      centered: true,
      onOk() {
        history.push('/dashboard')
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.dispatch(setLoading(true))
    setErrors({})
    props.form.validateFieldsAndScroll({ force: true }, (err, values) => {
      if (err) {
        message.error('Enter Required Fields')
      }

      axiosWithAuth()
        .put(storeUrl, values)
        .then(res => {
          props.dispatch(updateStore(res.data))
          message.success('Your store has been updated')
          history.push('/dashboard')
        })
        .catch(errors => {
          console.log(errors.response)
          message.error(Object.values(errors.response.data)[0])
          setErrors(errors.response.data)
        })
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
    </div>
  )

  const editProfile = (
    <Spin spinning={props.isLoading}>
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
              onClick={handleDeleteStore}
              id='delete-btn'
              type='link'
              htmlType='button'
            >
              Delete store
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
