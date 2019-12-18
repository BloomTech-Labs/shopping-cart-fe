/* eslint-env jest */

import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import ReactDOM from 'react-dom'
import Register from '../components/Register/Register'

describe('register form', () => {
  test('has an input for phone number', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Register />, div)
    const input = div.querySelector('input')
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('placeholder', 'Phone number')
    expect(input).toBeEnabled()
  })

  test('has an input for password', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Register />, div)
    const input = div.querySelector('div:nth-child(3) input')
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toHaveAttribute('placeholder', 'Password')
    expect(input).toBeEnabled()
  })

  test('has an input for password confirmation', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Register />, div)
    const input = div.querySelector('div:nth-child(5) input')
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toHaveAttribute('placeholder', 'Confirm password')
    expect(input).toBeEnabled()
  })

  test('has a register button', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Register />, div)
    const button = div.querySelector('a[role="button"]')
    expect(button).toContainHTML('<span>Register</span>')
    expect(button).toBeVisible()
  })
})
