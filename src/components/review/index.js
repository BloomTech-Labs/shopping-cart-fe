import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ReviewMain from './review'
import CartHeader from '../elements/cartHeader'

function Review (props) {
  const [up, setUp] = useState(false)
  const cartContents = useSelector(state => state.cart)
  var lastScrollTop = 0
  window.addEventListener('scroll', function () {
    var st = window.pageYOffset || document.documentElement.scrollTop
    if (st > lastScrollTop) {
      setUp(true)
    } else {
      setUp(false)
    }
    lastScrollTop = st <= 0 ? 0 : st
  }, false)
  return (
    <div>
      <CartHeader top={up} displayBack displayTotal badgeCount={cartContents.length} />
      <ReviewMain />
    </div>
  )
}

export default Review
