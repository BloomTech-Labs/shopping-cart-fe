import * as types from '../actionTypes'

const initialCart = []

const remItem = (state, action) => {
  const open = state.filter(function (obj) {
    return obj.productId !== action.payload._id
  })
  return open
}

const fxnAdd = (state, action) => {
  const itemObj = state.find(({ productId }) => productId === action.payload)
  const open = state.map(item => {
    if (item.productId === itemObj.productId) {
      const bol = {
        ...item,
        quantity: item.quantity + 1
      }
      return bol
    } else {
      return {
        ...item
      }
    }
  })
  return open
}

const sub = (num) => {
  if (num === 0) {
    return 0
  } else {
    return num - 1
  }
}

const fxnSub = (state, action) => {
  const itemObj = state.find(({ productId }) => productId === action.payload)
  const close = state.map(item => {
    if (item.productId === itemObj.productId) {
      return {
        ...item,
        quantity: sub(item.quantity)
      }
    } else {
      return {
        ...item
      }
    }
  })
  return close
}

export function cartReducer (state = initialCart, action) {
  switch (action.type) {
    case types.ADD_TO_CART:
      return [...state,
        {
          productId: action.payload._id,
          quantity: 1,
          price: action.payload.price,
          name: action.payload.name
        }]
    case types.REMOVE_ITEM_FROM_CART:
      return remItem(state, action)
    case types.INCREMENT:
      return fxnAdd(state, action)
    case types.DECREMENT:
      return fxnSub(state, action)
    case types.ADD_TO_CART_SINGLE_PRODUCT:
      if (state.length === 0) {
        return [...state, action.payload]
      } else {
        // filter out array excluding existing item
        const filteredState = state.filter(
          item => item.productId !== action.payload.productId
        )
        // find product by id
        const product = state.filter(
          item => item.productId === action.payload.productId
        )[0]
        product.quantity = product.quantity + action.payload.quantity

        return [...filteredState, product]
      }

    default:
      return state
  }
}
