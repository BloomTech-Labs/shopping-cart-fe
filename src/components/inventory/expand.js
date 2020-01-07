import React from 'react'
import { Card, Carousel } from 'antd'

const { Meta } = Card

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
                  <div id='delete'>DELETE</div>
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
