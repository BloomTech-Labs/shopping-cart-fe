import * as types from '../actionTypes'

const initialArr = []
const add = (num) => {
  if (num === undefined) {
    return 1
  } else {
    return num + 1
  }
}

const sub = (num) => {
  if (num === undefined) {
    return 1
  } else if (num === 0) {
    return 0
  } else {
    return num - 1
  }
}

const fxnAdd = (state, action) => {
  const itemObj = state.find(({ _id }) => _id === action.payload)
  const open = state.map(item => {
    if (item._id === itemObj._id) {
      const bol = {
        ...item,
        count: add(item.count)
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

const fxnSub = (state, action) => {
  const itemObj = state.find(({ _id }) => _id === action.payload)
  const close = state.map(item => {
    if (item._id === itemObj._id) {
      return {
        ...item,
        count: sub(item.count)
      }
    } else {
      return {
        ...item
      }
    }
  })
  return close
}

export function counterReducer (state = initialArr, action) {
  switch (action.type) {
    case types.PUSH_CART:
      return action.payload
    case types.INCREMENT:
      return fxnAdd(state, action)
    case types.DECREMENT:
      return fxnSub(state, action)
    default:
      return state
  }
}
