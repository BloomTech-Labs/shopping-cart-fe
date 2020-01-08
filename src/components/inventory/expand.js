import React from 'react'
import { Card, Carousel, Modal, message } from 'antd'
import AxiosAuth from '../Auth/axiosWithAuth'
const { confirm } = Modal
const { Meta } = Card

function showDeleteConfirm() {
  confirm({
    title: 'Are you sure you want to delete this item?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

const Expanded = ({ inventory }) => {
  return (
    <Carousel>
      {
        inventory.map(item => (
          <Card
            key={item.name}
            hoverable
            style={{ width: 240, height: '45%' }}
            cover={<img alt='item' src={item.images[0]} />}
          >
            <Meta
              title={
                <div className='list title'>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div id='edit'>Edit</div>
                </div>
              }
              description={
                <div className='list'>
                  <div>{item.price}</div>
                  <div id='delete' onClick={showDeleteConfirm} >DELETE</div>
                </div>
              }
            />
          </Card>
        ))
      }
    </Carousel>
  )
}

export default Expanded
