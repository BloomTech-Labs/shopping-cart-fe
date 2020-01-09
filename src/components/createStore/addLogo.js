import React, { useState } from 'react'
import axios from 'axios'
import {
  Form,
  Input,
  Icon,
  Button,
  message,
  Upload
} from 'antd'
import { useSelector } from 'react-redux'
import '../../less/index.less'
import AxiosAuth from '../Auth/axiosWithAuth'

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload (file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
const createStoreUrl = 'https://shopping-cart-eu3-staging.herokuapp.com/api/store'
const AddLogo = (props) => {
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const formState = useSelector(state => state.form)

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        setImageUrl(imageUrl),
      setLoading(false)
      )
    }
  }

  const dummyRequest = ({ file, onSuccess }) => {
    const image = new FormData()
    image.append('upload_preset', 'pure-retail')
    image.append('file', file)
    const config = {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    }
    axios.post(
      'https://api.cloudinary.com/v1_1/pureretail/upload',
      image, config
    )
      .then(res => {
        const secureUrl = res.data.secure_url
        setImageUrl(secureUrl)
      })
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      const payload = {
        ownerName: formState.name,
        currency: formState.currency,
        imageUrl: imageUrl,
        storeName: values.store
      }
      if (!err) {
        console.log(payload)
        AxiosAuth().post(createStoreUrl, payload)
          .then(res => {
            message.success('store created')
            console.log(res.data)
          })
          .catch(error => {
            message.error(Object.values(error.response.data)[0])
          })
      } else {
        message.error('Enter Required Fields')
      }
    })
  }

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className='ant-upload-text'>Upload</div>
    </div>
  )

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
    <div className='cover'>
      <div id='header'>
        <h2 id='get-started'>Upload store
          <br />
            logo
        </h2>
      </div>
      <div>
        <Upload
          name='avatar'
          customRequest={dummyRequest}
          listType='picture-card'
          className='avatar-uploader'
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <div id='upload-text'>
          <p>Click to upload
            <br />
                store logo (optional)
          </p>
        </div>
      </div>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <div id='header'>
          <h2 id='get-started'>Give your store
            <br />
                a name
          </h2>
        </div>
        <Form.Item>
          {getFieldDecorator('store', {
            rules: [
              {
                message: 'Enter your store name'
              },
              {
                required: true,
                message: 'Enter your store name'
              }
            ]
          })(
            <Input
              placeholder="My store's name is..."
            />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Done
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const AddLogoForm = Form.create({ name: 'register' })(AddLogo)

export default AddLogoForm
