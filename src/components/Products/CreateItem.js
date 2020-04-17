import React, { useState, useEffect } from 'react'
import { Form, Input, Icon, Button, message, Upload, Spin } from 'antd'
import axios from 'axios'
import AxiosAuth from '../Auth/axiosWithAuth'
import history from '../../history'
import { connect, useSelector } from 'react-redux'
import {
  setLoading,
  setErrors,
  clearErrors,
  getCurrentUser
} from '../../state/actionCreators'
import useCurrency from '../hooks/useCurrency'

const productURL = 'https://shopping-cart-eu3.herokuapp.com/api/store/products'

function CreateItem ({ dispatch, form, isLoading }) {
  const [fileList, setFileList] = useState([])
  const [cloudList, setCloudList] = useState([])
  const { TextArea } = Input
  const handleChange = info => {
    let fileList = [...info.fileList]

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-4)

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url
      }
      return file
    })

    setFileList(fileList)
  }

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  const currencyDescription = useSelector(state => state.user.user.currency)

  const sign = useCurrency(currencyDescription)

  const dummyRequest = ({ file, onSuccess }) => {
    const image = new FormData()
    image.append('upload_preset', 'pure-retail')
    image.append('file', file)
    const config = {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    }
    axios
      .post('https://api.cloudinary.com/v1_1/pureretail/upload', image, config)
      .then(res => {
        const secureUrl = res.data.secure_url
        const newList = [...cloudList, secureUrl]
        setCloudList(newList)
      })
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  useEffect(() => {
    dispatch(setLoading(false))
  }, [dispatch])

  const handleSubmit = e => {
    e.preventDefault()
    if (!cloudList.length) {
      return message.error('Upload an image')
    }
    form.validateFieldsAndScroll((err, values) => {
      if (isNaN(values.stock && +values.stock)) {
        return message.error('Stock should be a number')
      }
      if (isNaN(+values.price)) {
        return message.error('Enter a valid price')
      }

      const payload = {
        name: values.name.trim(),
        description: values.description.trim(),
        price: values.price,
        stock: values.stock || 0,
        images: cloudList
      }
      if (!err) {
        dispatch(setLoading(true))
        AxiosAuth()
          .post(productURL, payload)
          .then(res => {
            message.success('Item Added')
            dispatch(setLoading(false))
            dispatch(clearErrors())
            history.push('/inventory')
          })
          .catch(error => {
            dispatch(setLoading(false))
            dispatch(setErrors(error.response.data))
            message.error(Object.values(error.response.data)[0])
          })
      } else {
        message.error('Enter Required Fields')
      }
    })
  }

  const toStore = e => {
    e.preventDefault()
    history.push('/inventory')
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

  const createItemComponent = (
    <Spin spinning={isLoading}>
      <div className='cover' id='createUpdate'>
        <div id='header'>
          <h2 id='get-started'>
            Upload new
            <br />
            store item
          </h2>
        </div>
        <div id='uploadHead' style={{ height: '30%', width: '100%' }}>
          <Upload
            style={{ height: '20%', width: '20%' }}
            listType='picture-card'
            fileList={fileList}
            customRequest={dummyRequest}
            onChange={handleChange}
          >
            <Icon style={{ width: '20px' }} type='upload' />
          </Upload>
        </div>
        <Form className='inputForm' {...formItemLayout} onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [
                {
                  message: 'Name'
                },
                {
                  required: true,
                  message: 'Enter a Name'
                }
              ]
            })(<Input placeholder='Name' />)}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('price', {
              rules: [
                {
                  message: 'Enter a price'
                },
                {
                  required: true,
                  message: 'Enter a price'
                }
              ]
            })(<Input placeholder='Price' addonBefore={sign} />)}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('stock', {
              rules: [
                {
                  message: 'Enter stock'
                }
              ]
            })(<Input placeholder='Stock' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('description', {
              rules: [
                {
                  message: 'Enter a description'
                },
                {
                  required: true,
                  message: 'Enter a description'
                }
              ]
            })(<TextArea placeholder='Description' allowClear />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
              Done
            </Button>
          </Form.Item>
          <div>
            <p onClick={toStore}>Cancel</p>
          </div>
        </Form>
      </div>
    </Spin>
  )

  return createItemComponent
}

const CreateItemForm = Form.create({ name: 'createItem' })(CreateItem)

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  errors: state.user.errors
})

export default connect(mapStateToProps, null)(CreateItemForm)
