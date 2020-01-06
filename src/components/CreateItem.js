import React, { useState } from 'react';
import {
  Form,
  Input,
  Icon,
  Button,
  message,
  Upload
} from 'antd';
import '../less/index.less';
import axios from 'axios';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const productURL = 'https://shopping-cart-eu3-staging.herokuapp.com/api/store/products'

function CreateItem(props) {

  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        setImageUrl(imageUrl),
        setLoading(false)
      );
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
        console.log(secureUrl)
        setImageUrl(secureUrl)
        console.log(imageUrl)
      })
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      debugger
      const payload = {
        name: values.name,
        description: values.description,
        price: values.price,
        image_url: imageUrl
      }
      if (!err) {
        axios.post(productURL, payload)
          .then(res => {
            message.success('item added')
            localStorage.setItem('token', res.data.token)
            props.history.push('/dashboard')
          })
          .catch(error => {
            message.error(error.message)
          })
      } else {
        message.error('Validation failed')
      }
    })
  }

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  const { getFieldDecorator } = props.form

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <div className="cover">
      <div id="header">
        <h2 id='get-started'>Upload new
              <br />
          store item
          </h2>
      </div>
      <div>
        <Upload
          name="avatar"
          customRequest={dummyRequest}
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <div id='upload-text'>
          <p>Tap to upload
              <br />
            photos
          </p>
        </div>
      </div>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        {/* <div id="header">
          <h2 id='get-started'>Give your store
              <br />
            a name
          </h2>
        </div> */}
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [
              {
                message: 'Name',
              },
              {
                required: true,
                message: 'Enter a Name',
              },
            ],
          })(<Input
            placeholder="Name"
          />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('description', {
            rules: [
              {
                message: 'Enter a description',
              },
              {
                required: true,
                message: 'Enter a description',
              },
            ],
          })(<Input
            placeholder="Description"
          />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('price', {
            rules: [
              {
                message: 'Enter a price',
              },
              {
                required: true,
                message: 'Enter a price',
              },
            ],
          })(<Input
            placeholder="Price"
          />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Done
          </Button>
        </Form.Item>
        <div>
          <p><a>cancel</a></p>
        </div>
      </Form>
    </div>
  )
}

const CreateItemForm = Form.create({ name: 'createItem' })(CreateItem)

export default CreateItemForm

