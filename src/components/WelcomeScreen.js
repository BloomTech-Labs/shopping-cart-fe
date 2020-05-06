import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  message,
  FormItem,
  Icon,
  Checkbox,
} from 'antd';
const { Option } = Select;

const WelcomeScreen = (props) => {
  const [form, setForm] = useState({
    businessName: '',
    ownerName: '',
    testing: ''
  });

  const { getFieldDecorator } = props.form;
  const { setFieldsValue} = props.form;

  const onChange = (e) => {
    // setForm({ ...form, [e.target.name]: e.target.value });
    // console.log(form);
    setFieldsValue({
    
    })
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll({ force: true }, (err, values) => {
      // we will need to change this logic
      const payload = {
        name: values.name,
        currency: values.currency,
      };
      if (!err) {
        console.log(err);
      } else {
        message.error('Enter Required Fields');
      }
    });
  };

  return (
    <div>
      <h1>This is the welcome Screen Form</h1>
      <Form onSubmit={onSubmit}>
        {/* Business Name - String */}
        <Form.Item
          label='Business Name'
          name='businessName'
          rules={[
            {
              required: true,
              message: 'Business name here!',
            },
          ]}>
          <Input
            name='businessName'
            placeholder='enter business name'
            value={form.businessName}
            onChange={onChange}
          />
        </Form.Item>
        {/* Owner Name - String */}
        <Form.Item
          label='Owner Name'
          name='ownerName'
          rules={[
            {
              required: true,
              message: 'Owner name here!',
            },
          ]}>
          <Input
            name='ownerName'
            placeholder='enter owner name'
            value={form.ownerName}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item label='some label' name='some name'>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Enter your name',
              },
            ],
          })(<Input value={form.testing} placeholder='My name is...' />)}
        </Form.Item>

        {/* Address */}

        {/* (Secondary Address) Building / Unit / Suite - String */}
        {/* City - String */}
        {/* State - String */}
        {/* Zip Code - Number */}
        {/* Business Hours - String/Time */}
        {/* Curbside business Hours - String/Time */}

        <Button type='primary' htmlType='submit'>
          Add Branding
        </Button>
      </Form>
    </div>
  );
};

const WelcomeScreenForm = Form.create({ name: 'register' })(WelcomeScreen);

export default WelcomeScreenForm;
