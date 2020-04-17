import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CartHeader from '../elements/cartHeader'
import SingleProductView from './buyerSingleProductView'

function Single (props) {
  const productId = props.match.params.id
  const [up, setUp] = useState(false)
  const cartContents = useSelector(state => state.cart)
  const store = useSelector(state => state.user)
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
      <CartHeader top={up} displayTotal badgeCount={cartContents.length} logoPath={store.user.imageUrl} displayBack={props.history.goBack} />
      <SingleProductView productId={productId} />
    </div>
  )
}

export default Single
