import { useState, useEffect } from 'react'

const useCurrency = currencyDescription => {

  const [sign, setSign] = useState('')
  const fixCurrency = (currencyDescription) => {
    if (currencyDescription === 'POU') {
      setSign('£')
    } else if (currencyDescription === 'DOL') {
      setSign('$')
    } else if (currencyDescription === 'EUR') {
      setSign('€')
    } else if (currencyDescription === 'YEN') {
      setSign('¥')
    } else {
      return undefined
    }
  }
  
  useEffect(() => {
    fixCurrency(currencyDescription)
  }, [currencyDescription])

  return sign

}

export default useCurrency