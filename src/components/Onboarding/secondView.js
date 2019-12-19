import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { List, InputItem, WhiteSpace, Flex, Toast, ImagePicker } from 'antd-mobile'
import { createForm } from 'rc-form'
import '../Reusable/index.css'
import * as creators from '../../state/actionCreators'
import { ConfirmButton } from '../Reusable'
import { types } from '@babel/core'

const SecondView = props => {
  const [files, setFiles] = useState([])
  const [multiple, setMultiple] = useState(false)
  const onChange = (files, type, index) => {
    console.log(files, type, index)
    setFiles(files)
  }
  const dispatch = useDispatch()
  function showToast (error) {
    Toast.info(error, 1)
  }
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        console.log(values)
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
          <ImagePicker
            files={files}
            onChange={onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 1}
            multiple={multiple}
          />
        </div>
        <div className='form'>
          <List
            renderHeader={() => (
              <div style={{ marginBottom: '2em' }}>
                Give your store
                <br />
                 a name
              </div>
            )}
          >
            <Flex direction='column'>
              <InputItem
                {...getFieldProps('store', {
                  rules: [
                    {
                      required: true,
                      message: 'Your store name'
                    }
                  ]
                })}
                type='text'
                placeholder='My store name is...'
              />
              <WhiteSpace />
            </Flex>
          </List>
        </div>
        <ConfirmButton text='Done' handleSubmit={handleSubmit} />
        <WhiteSpace />
        <div id='or-log-in'>
          or <a href='#'>login</a> instead
        </div>
      </div>
    </form>
  )
}
const SecondViewWrapper = createForm()(SecondView)
export default SecondViewWrapper
