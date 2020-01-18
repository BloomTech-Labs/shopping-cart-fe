import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, List } from 'antd'
import '../../less/index.less'

const ReviewMain = (props) => {
  const cartContents = useSelector(state => state.cart)
  console.log(cartContents)
  return (
    <div className='cover review'>
      <div className='store-top review-top'>
        <div className='review-text'>
          <Icon type='shopping-cart' style={{ fontSize: '3rem' }} />
          <div id='rev'>
            <h4>Review Your Order</h4>
            <p id='grey'>This is your chance to check your order before going to
              payments. Make it count.
            </p>
          </div>
          <div>
            <p>
              Got a question about your order?
              You can ask the seller on Whatsapp by clicking here.
            </p>
          </div>
        </div>
        <div className='content'>
        <List
            itemLayout="horizontal"
            dataSource={cartContents}
            renderItem={item => (
              <List.Item>
                <div className='controls'>
                  <div className='clicks'>+</div>
                  <div className='clicks count'>1</div>
                  <div className='clicks'>-</div>
                </div>
                <List.Item.Meta
                  title={item.name}
                  description={item.price}
                />
                <div className='cancel'>x</div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default ReviewMain
