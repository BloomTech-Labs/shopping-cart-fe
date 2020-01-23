import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../../less/index.less'
import StoreMain from './store'
import CartHeader from './cartHeaderStore'

function Store (props) {
  const [up, setUp] = useState(false)
  const sellerId = props.match.params.id.split('-').pop()
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
      <CartHeader top={up} badgeCount={cartContents.length} logoPath={store.user.imageUrl} />
      <StoreMain sellerId={sellerId} cartContents={cartContents} store={store} />
    </div>
  )
}

export default Store
