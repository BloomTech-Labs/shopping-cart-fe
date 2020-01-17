import React, { useEffect, useState } from 'react'
import '../../less/index.less'

const Top = () => {
  const [pos, setPos] = useState(window.pageYOffset)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const handleScroll = () => {
      const temp = window.pageYOffset
      setVisible(pos > temp)
      setPos(temp)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
  return (
    <div className={'navbarHidden ' + (!visible ? 'navbar' : ' ')} />
  )
}

export default Top
