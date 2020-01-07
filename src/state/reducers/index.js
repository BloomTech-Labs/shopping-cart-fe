import { combineReducers } from 'redux'
import { formReducer } from './formReducer'
import { userReducer } from './userReducer'
import { storeReducer } from './storeReducer'

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  store: storeReducer
})

export default rootReducer
