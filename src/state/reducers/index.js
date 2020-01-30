import { combineReducers } from 'redux'
import { formReducer } from './formReducer'
import { userReducer } from './userReducer'
import { storeReducer } from './storeReducer'
import { cartReducer } from './cartReducer'
import { searchReducer } from './searchReducer'
import { savedCartReducer } from './savedCartReducer'
import dashboardReducer from './dashboardReducer'

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  store: storeReducer,
  cart: cartReducer,
  search: searchReducer,
  savedCart: savedCartReducer,
  dashboard: dashboardReducer
})

export default rootReducer
