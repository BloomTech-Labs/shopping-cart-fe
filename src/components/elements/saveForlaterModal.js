import React from 'react'
import { Modal, Form, Input } from 'antd'

const AddEmail = (props) => {
  return (
    <Modal
      visible={props.visible}
      title='Save cart'
      okText='Save'
      onCancel={props.onCancel}
      onOk={props.onCreate}
    >
      <Form layout='vertical'>
        <Form.Item style={{display: 'flex', flexDirection: 'column'}} label='Enter your email address to get your cart link'>
          {props.form.getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please tell us your email address' }]
          })(<Input type='email' />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

const SaveForLater = Form.create({ name: 'save_for_later' })(AddEmail)

export default SaveForLater
