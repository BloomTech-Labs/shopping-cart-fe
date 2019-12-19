import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { List, Picker, InputItem, WhiteSpace, Flex } from 'antd-mobile'
import { createForm } from 'rc-form'
import logo from '../../images/PureRetail_Logo.png'
import '../Reusable/index.css'
import * as creators from '../../state/actionCreators'
import { ConfirmButton } from '../Reusable'

const money = [{ label: 'Euro', value: 'Euro' },
  { label: 'Dollar', value: 'Dollar' },
  { label: 'Pounds', value: 'Pounds' },
  { label: 'Yen', value: 'Yen' }]

const FirstView = props => {
  const dispatch = useDispatch()
  const handleSubmit = e => {
    // e.preventDefault()
    props.form.validateFields({ force: true }, (err, values) => {
      const payload = {
        name: values.name,
        currency: values.currency[0]
      }
      if (!err) {
        console.log(payload)
        dispatch(creators.updateForm(payload))
      } else {
        window.alert('Validation failed')
      }
    })
  }
  const { getFieldProps } = props.form
  return (
    <form>
      <div className='flex-container'>
        <div id='logo'>
          <img src={logo} alt='PureRetail Logo' />
        </div>
        <div className='form'>
          <List
            renderHeader={() => (
              <div style={{ marginBottom: '2em' }}>
                Let's get started
              </div>
            )}
          >
            <Flex direction='column'>
              <InputItem
                {...getFieldProps('name', {
                  rules: [
                    {
                      required: true,
                      message: 'My name is'
                    }
                  ]
                })}
                type='text'
                placeholder='My name is...'
              />
              <WhiteSpace />
              <Picker data={money} cols={1} values={1} triggerType='onClick' okText='OK' extra='.' dismissText='Dismiss' {...getFieldProps('currency')} className='forss'>
                <List.Item arrow='vertical'>Currency:</List.Item>
              </Picker>
              <WhiteSpace />
            </Flex>
          </List>
        </div>
        <NavLink to='/addlogo'>
          <ConfirmButton text='Next' handleSubmit={handleSubmit} />
        </NavLink>
        <WhiteSpace />
        <div id='or-log-in'>
          or <a href='#'>login</a> instead
        </div>
      </div>
    </form>
  )
}
const FirstViewWrapper = createForm()(FirstView)
export default FirstViewWrapper
