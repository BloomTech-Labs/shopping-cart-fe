import React from 'react'
import '../../less/index.less'
import StoreMain from './store'
import Top from './top'

function Store (props) {
  const sellerId = props.match.params.id.split('-').pop()
  return (
    <div>
      <Top />
      <StoreMain sellerId={sellerId} />
    </div>
  )
}

export default Store
