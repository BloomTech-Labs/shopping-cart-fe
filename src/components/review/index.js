import React from 'react'
import { useSelector } from 'react-redux'
import '../../less/index.less'
import ReviewMain from './review'
import CartHeader from '../elements/cartHeader'

function Review (props) {
  const cartContents = useSelector(state => state.cart)
  return (
    <div>
      <CartHeader displayBack displayTotal badgeCount={cartContents.length} />
      <ReviewMain />
    </div>
  )
}

export default Review
