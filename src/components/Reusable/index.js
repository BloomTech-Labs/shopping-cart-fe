import React from 'react'
import { Button, Flex } from 'antd-mobile'

export const ConfirmButton = props => {
  return (
    <Flex justify='center'>
      <Button style={{ backgroundColor: '#131115' }} type='primary' size='medium' inline onClick={props.handleSubmit}>
        {props.text}
      </Button>
    </Flex>
  )
}
