import React from "react";
import { Switch } from "react-router-dom";
import "./App.css";
import WrappedRegistrationForm from "./components/register";
import LoginForm from "./components/login";
import ResetPasswordForm from "./components/resetPassword";
import SetNewPasswordForm from "./components/setNewPassword";
import CreateStoreForm from "./components/createStore/firstView";
import AddLogoForm from "./components/createStore/addLogo";
import CreateItem from "./components/CreateItem";
import UpdateItem from "./components/updateItem";
import PrivateRoute from "./components/Auth/PrivateRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import Main from "./components/inventory";
import UpdateProfile from "./components/EditProfile";
import Home from "./components/DashboardHome";
import Store from "./components/store";
import Stripe from "./components/Stripe";
import OrderSuccessPage from "./components/Stripe/OrderSuccessPage";
// For testing only. Remove before deploying to Prod.
import CartHeader from "./components/elements/cartHeader";
import Logo from "./components/elements/logo";

function App() {
  return (
    <Switch>
      <PublicRoute path="/register" component={WrappedRegistrationForm} />
      <PublicRoute exact path="/" component={LoginForm} />
      <PrivateRoute path="/inventory" component={Main} />
      <PublicRoute path="/resetpassword" component={ResetPasswordForm} />
      <PublicRoute path="/setnewpassword" component={SetNewPasswordForm} />
      <PublicRoute path="/store/:id" component={Store} />
      <PublicRoute path="/payment" component={Stripe} />
      <PrivateRoute path="/createstore" component={CreateStoreForm} />
      <PrivateRoute path="/addlogo" component={AddLogoForm} />
      <PrivateRoute path="/profile" component={UpdateProfile} />
      <PrivateRoute path="/createitem" component={CreateItem} />
      <PrivateRoute path="/dashboard" component={Home} />
      <PrivateRoute path="/updateitem/:id" component={UpdateItem} />
      <PublicRoute path="/success" component={OrderSuccessPage} />
      {/* For testing only. Remove before deploying to Prod. */}
      <PublicRoute exact path="/elements/Logo" component={Logo} />
      <PublicRoute exact path="/elements/cartheader" component={CartHeader} />
    </Switch>
  );
}

export default App;
