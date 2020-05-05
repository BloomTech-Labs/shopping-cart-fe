import React from 'react';
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
  const { getFieldDecorator } = props.form;
  console.log('this is getFieldDecorator', getFieldDecorator);
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
    <div>
      <h1>This is the welcome Screen Form</h1>
      return (
      <Form {...formItemLayout}>
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
                message: 'Must enter a store name!',
              },
              {
                required: true,
                message: 'Enter your name',
              },
            ],
          })(<Input placeholder='Enter Business Name' />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [
              {
                message: 'Must enter a store name!',
              },
              {
                required: true,
                message: 'Enter your name',
              },
            ],
          })(<Input placeholder='Enter Owner Name' />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WelcomeScreenForm = Form.create({ name: 'register' })(WelcomeScreen);

export default WelcomeScreenForm;
