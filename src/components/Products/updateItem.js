import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Form, Input, Icon, Button, message, Upload, Spin } from 'antd'
import axios from 'axios'
import AxiosAuth from '../Auth/axiosWithAuth'
import history from '../../history'
import { setLoading, setErrors, clearErrors } from '../../state/actionCreators'
import * as creators from '../../state/actionCreators'
import useCurrency from '../hooks/useCurrency'

function UpdateItem (props) {
  const [item, setItem] = useState([])
  const [fileList, setFileList] = useState([])
  const [cloudList, setCloudList] = useState([])
  const { TextArea } = Input
  const itemId = props.match.params.id
  const productURL = `https://shopping-cart-eu3.herokuapp.com/api/store/products/${itemId}`

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(creators.getCurrentUser())
  }, [dispatch])

  const currencyDescription = useSelector(state => state.user.user.currency)

  const sign = useCurrency(currencyDescription)

  useEffect(() => {
    AxiosAuth()
      .get(
        `https://shopping-cart-eu3.herokuapp.com/api/store/products/${itemId}`
      )
      .then(res => {
        const newFileList = res.data.images.map((url, idx) => ({
          uid: -idx,
          name: `photo ${idx}.jpg`,
          url
        }))
        setFileList(newFileList)
        setItem(res.data)
        props.dispatch(setLoading(false))
      })
  }, [itemId, props])

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
    // const newFile= fileList
    setFileList(fileList)
  }

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

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      const images = [
        ...cloudList,
        ...fileList.filter(image => image.url).map(image => image.url)
      ]
      if (!images.length) {
        return message.error('Upload an image')
      }
      const payload = {
        name: values.name,
        description: values.description,
        price: values.price,
        stock: values.stock || 0,
        images
      }
      if (!err) {
        props.dispatch(setLoading(true))
        AxiosAuth()
          .put(productURL, payload)
          .then(res => {
            message.success('item updated')
            props.dispatch(setLoading(false))
            props.dispatch(clearErrors())
            history.push('/inventory')
          })
          .catch(error => {
            props.dispatch(setLoading(false))
            props.dispatch(setErrors(error.response.data))
            message.error(Object.values(error.response.data)[0])
          })
      } else {
        message.error('Validation failed')
      }
    })
  }

  const toStore = e => {
    e.preventDefault()
    history.push('/inventory')
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
    <Spin spinning={props.isLoading}>
      <div className='cover' id='createUpdate'>
        <div id='header'>
          <h2 id='get-started'>Update {item.name}</h2>
        </div>
        <div id='uploadHead' style={{ height: '30%', width: '100%' }}>
          <Upload
            // style={{ height: '20%', width: '20%' }}
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
              initialValue: item.name,
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
              initialValue: item.price
            })(<Input placeholder='Price' addonBefore={sign} />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('stock', {
              initialValue: item.stock ? item.stock : null
            })(<Input placeholder='Stock' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('description', {
              initialValue: item.description,
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
}
const UpdateItemForm = Form.create()(UpdateItem)
const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  errors: state.user.errors
})

export default connect(mapStateToProps, null)(UpdateItemForm)
