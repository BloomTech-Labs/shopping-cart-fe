import React from 'react'
import '../../less/index.less'
import StoreMain from './store'

function Store (props) {
  const sellerId = props.match.params.id
  return (
    <div>
      <StoreMain sellerId={sellerId} />
    </div>
  )
}

export default Store
