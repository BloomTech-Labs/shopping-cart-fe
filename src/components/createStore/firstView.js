import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, Select, Button, message } from 'antd'
import '../../less/index.less'
import * as creators from '../../state/actionCreators'
import Logo from '../elements/logo'
import history from '../../history'

const { Option } = Select

const CreateStore = props => {
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFieldsAndScroll({ force: true }, (err, values) => {
      const payload = {
        name: values.name,
        currency: values.currency
      }
      if (!err) {
        dispatch(creators.updateForm(payload))
        history.push('/addlogo')
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

  return (
    <div className='cover'>
      <Logo />
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <div id='header'>
          <h2 id='get-started'>Lets get started!</h2>
          <p>
            You're in! Let's get your account started in a few clicks. First,
            tell us how you'd like to be addressed and how you'd like to be
            paid.
          </p>
        </div>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [
              {
                message: 'Enter your name'
              },
              {
                required: true,
                message: 'Enter your name'
              }
            ]
          })(<Input placeholder='My name is...' />)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('currency', {
            rules: [
              {
                required: true,
                message: 'Select preferred currency'
              }
            ]
          })(
            <Select placeholder='... and I prefer to sell in'>
              <Option value='DOL'>DOL</Option>
              <Option value='POU'>POU</Option>
              <Option value='EUR'>EUR</Option>
              <Option value='YEN'>YEN</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const CreateStoreForm = Form.create({ name: 'register' })(CreateStore)

export default CreateStoreForm
