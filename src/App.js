import React from 'react';
import { Switch } from 'react-router-dom';
import './less/index.less';
import WrappedRegistrationForm from './components/register';
import LoginForm from './components/login';
import ResetPasswordForm from './components/ResetPassword/resetPassword';
import SetNewPasswordForm from './components/ResetPassword/setNewPassword';
import updateProductView from './components/CreateProducts/updateProductView';
import PrivateRoute from './components/Auth/PrivateRoute';
import PublicRoute from './components/Auth/PublicRoute';
import Inventory from './components/inventory/inventory';
import Dashboard from './components/Dashboard/Dashboard';
import StoreView from './components/store/StoreView';
import CartView from './components/cart/CartView';
import CheckoutSuccessView from './components/cart/checkoutSuccessView';
import Single from './components/singleProduct/index'; // buyerSingleProductView
import Account from './components/SellerAccount/SellerAccount';
import WelcomeScreenForm from './components/WelcomeScreen/WelcomeScreen';
import BrandView from './components/BrandView';
import ColorPicker from './components/ColorPicker';
import CreateProductView from './components/CreateProducts/createProductView';
import Update from './components/Update';
import ProfileView from './components/Profile View/ProfileView';
import OrderDetailsView from './components/Orders/OrderDetailsView';
import StripeConfirmAccount from './components/Stripe/StripeConfirmAccount';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {
	//TODO: Create a useEffect to get the Stripe Account for store owner dynamicly
	const stripePromise = loadStripe('pk_test_VHc4fOD3byWy85jOWOYLijhH00OmL57YuX', {
		stripeAccount: 'acct_1H6LilIrVDEEa5AF'
	});

	return (
		<div>
			<Switch>
				<Elements stripe={stripePromise}>
					<PublicRoute path="/register" component={WrappedRegistrationForm} />
					<PublicRoute path="/welcome" component={WelcomeScreenForm} />
					<PublicRoute path="/brandview" component={BrandView} />
					<PublicRoute path="/colorpicker" component={ColorPicker} />
					<PublicRoute path="/update" component={Update} />
					<PublicRoute exact path="/" component={LoginForm} />
					<PrivateRoute path="/inventory" component={Inventory} />
					<PrivateRoute path="/profileview" component={ProfileView} />
					<PublicRoute path="/resetpassword" component={ResetPasswordForm} />
					<PublicRoute path="/setnewpassword" component={SetNewPasswordForm} />
					<PublicRoute path="/store/:id" component={StoreView} />
					<PublicRoute path="/cart" component={CartView} />
					<PrivateRoute path="/createitem" component={CreateProductView} />
					<PrivateRoute path="/dashboard" component={Dashboard} />
					<PrivateRoute path="/updateitem/:id" component={updateProductView} />
					<PrivateRoute path="/order/:id" component={OrderDetailsView} />
					<PublicRoute path="/product/:id" component={Single} />
					<PublicRoute path="/success/:id" component={CheckoutSuccessView} />
					<PrivateRoute path="/account" component={Account} />
					<PrivateRoute path="/api/auth/stripe/token" component={StripeConfirmAccount} />
				</Elements>
			</Switch>
		</div>
	);
}

export default App;
