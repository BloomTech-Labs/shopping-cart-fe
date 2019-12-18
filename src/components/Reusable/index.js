import React from 'react'
import { Button, Flex, InputItem } from 'antd-mobile'

export const ConfirmButton = props => {
  return (
    <Flex justify='center'>
      <Button style={{ backgroundColor: '#131115' }} type='primary' size='medium' inline onClick={props.handleSubmit}>
        {props.text}
      </Button>
    </Flex>
  )
}

export const InputFieldWithIcon = props => {
  const {
    check, showToast, message, required,
    name, placeholder, iconurl
  } = props
  const { getFieldProps, getFieldError } = check
  console.log(props, !!getFieldError)
  return (
    <InputItem
      {...getFieldProps({ name }, {
        rules: [
          {
            required: { required },
            message: { message }
          }
        ]
      })}
      clear
      error={!!getFieldError({ name })}
      onErrorClick={() => {
        showToast(getFieldError({ name }).join('、'))
      }}
      type={name}
      placeholder={placeholder}
    >
      <div style={{ backgroundImage: { iconurl }, backgroundSize: 'cover', height: '1.2rem', width: '1.2rem' }} />
    </InputItem>
  )
}
