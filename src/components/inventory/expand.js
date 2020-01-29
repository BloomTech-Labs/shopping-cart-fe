import React from 'react'
import { Card, Carousel, Modal, message, Button } from 'antd'
import AxiosAuth from '../Auth/axiosWithAuth'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as creators from '../../state/actionCreators'
import history from '../../history'

const { confirm } = Modal
const { Meta } = Card

const Expanded = ({ inventory, currency }) => {
  const dispatch = useDispatch()
  function showDeleteConfirm (id) {
    confirm({
      title: 'Are you sure you want to delete this item?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () {
        AxiosAuth()
          .delete(
            `https://shopping-cart-eu3.herokuapp.com/api/store/products/${id}`
          )
          .then(res => {
            dispatch(creators.getCurrentUser())
            message.success('Item Deleted')
            history.go(0)
          })
          .catch(error => {
            message.error(Object.values(error.response.data)[0])
          })
      },
      onCancel () {}
    })
  }

  return (
    <Carousel>
      {inventory.map(item => (
        <Card
          key={item.name}
          hoverable
          style={{ width: 240, height: '45%' }}
          cover={
            item.images[0] ? <img alt='item' src={item.images[0]} /> : undefined
          }
        >
          <Meta
            title={
              <div className='list title'>
                <div>
                  <h3 style={{ color: 'black' }}>{item.name}</h3>
                  <p style={{ fontWeight: 'normal' }}>{item.description}</p>
                </div>
                <NavLink to={`/updateitem/${item._id}`}>
                  <div>
                    <Button>Edit</Button>
                  </div>
                </NavLink>
              </div>
            }
            description={
              <div className='list'>
            <div>{currency}{item.price}</div>
                <div id='delete' onClick={e => showDeleteConfirm(item._id)}>
                  <Button>Delete </Button>
                </div>
              </div>
            }
          />
        </Card>
      ))}
    </Carousel>
  )
}

export default Expanded
