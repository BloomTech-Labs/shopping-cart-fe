/* eslint-env jest */

import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import ReactDOM from 'react-dom'
import user from '@testing-library/user-event'
import { getQueriesForElement } from '@testing-library/dom'
import { render } from '@testing-library/react'
import Register from '../components/Register/Register'

describe('register form', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Register />, div)
  const { getByPlaceholderText } = getQueriesForElement(div)

  test('has an input for phone number', () => {
    const input = getByPlaceholderText(/phone number/i)
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toBeEnabled()
  })

  test('has an input for password', () => {
    const input = getByPlaceholderText(/^password$/i)
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toBeEnabled()
  })

  test('has an input for password confirmation', () => {
    const input = getByPlaceholderText(/confirm password/i)
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toBeEnabled()
  })

  test('has a register button', () => {
    const button = div.querySelector('a[role="button"]')
    expect(button).toContainHTML('<span>Register</span>')
    expect(button).toBeVisible()
  })
})

describe('render form functionality', () => {
  test('validates password mismatch', () => {
    const { getByPlaceholderText, getByText } = render(<Register />)
    const phoneNumber = getByPlaceholderText(/phone number/i)
    const password = getByPlaceholderText(/^password$/i)
    const confirmPassword = getByPlaceholderText(/confirm password/i)
    user.type(phoneNumber, '1')
    user.type(password, '123456')
    user.type(confirmPassword, '23456')
    expect(getByText(/passwords do not match!/i)).toBeVisible()
  })
  test('allows valid registration', () => {
    const { getByPlaceholderText, getByText } = render(<Register />)
    const phoneNumber = getByPlaceholderText(/phone number/i)
    const password = getByPlaceholderText(/^password$/i)
    const confirmPassword = getByPlaceholderText(/confirm password/i)
    const registerButton = getByText(/^Register$/)
    user.type(phoneNumber, '123456789')
    user.type(password, '123456')
    user.type(confirmPassword, '123456')
    user.click(registerButton)
    expect(alert)
  })
})
