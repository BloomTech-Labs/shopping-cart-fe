import { combineReducers } from 'redux';
import { formReducer } from './formReducer';
import { userReducer } from './userReducer';
import { storeReducer } from './storeReducer';
import { cartReducer } from './cartReducer';
import { searchReducer } from './searchReducer';
import { savedCartReducer } from './savedCartReducer';
import dashboardReducer from './dashboardReducer';
import { orderReducer } from './orderReducer';
import { productReducer } from './productReducer';
import { getOrdersReducer } from './getOrdersReducer';
import onboardReducer from './onboardReducer';
import logoReducer from './logoReducer';
import colorReducer from './colorReducer';

const rootReducer = combineReducers({
	form: formReducer,
	user: userReducer,
	store: storeReducer,
	cart: cartReducer,
	search: searchReducer,
	savedCart: savedCartReducer,
	dashboard: dashboardReducer,
	order: orderReducer,
	product: productReducer,
	orders: getOrdersReducer,
	onboard: onboardReducer,
	logo: logoReducer,
	color: colorReducer
});

export default rootReducer;
