import React from 'react'
import '../../less/index.less'
import StoreMain from './store'

function Store (props) {
  console.log(props.match.params.id)
  const sellerId = props.match.params.id
  console.log(sellerId)
  return (
    <div>
      <StoreMain sellerId={sellerId} />
    </div>
  )
}

export default Store
